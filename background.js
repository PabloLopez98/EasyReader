chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    /^http/.test(tab.url) &&
    !tab.url.indexOf("google") !== -1
  ) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./foreground.js"],
      })
      .then(() => {
        console.log("Injected foreground.js to tab id: " + tabId);
      });
  }
});

var buttonLogicData = {
  changeBackgroundColorButton: false,
  focusTextButton: false,
};

chrome.storage.local.set({ buttonLogic: buttonLogicData });

var db = null;

try {
  self.importScripts("firebase/app.js", "firebase/realtimedatabase.js");
  firebaseConfig = {
    apiKey: "AIzaSyBRtskJFLp0HSN-dwqR9gv8PiZm-1Ln2QA",
    authDomain: "myextension-8f590.firebaseapp.com",
    projectId: "myextension-8f590",
    storageBucket: "myextension-8f590.appspot.com",
    messagingSenderId: "443730221157",
    appId: "1:443730221157:web:3effdf2284dcb8236b0e8c",
  };
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();
} catch (error) {
  console.log(error);
}
var arr;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "addNoteButton") {
    var websiteTitle;
    var googleEmail;
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tabs) {
        websiteTitle = tabs[0].title.split(" ").join("");
      }
    );
    chrome.identity.getProfileUserInfo((userInfo) => {
      googleEmail = userInfo.email.toString().slice(0, -10);
      db.ref("emails")
        .child(googleEmail)
        .child(websiteTitle)
        .push()
        .set(request.payload);
    });
  } else if (request.message === "viewNotesButton") {
    var currentTitle;
    var currentEmail;
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tabs) {
        currentTitle = tabs[0].title.split(" ").join("");
      }
    );
    chrome.identity.getProfileUserInfo((userInfo) => {
      currentEmail = userInfo.email.toString().slice(0, -10);
      db.ref("emails")
        .child(currentEmail)
        .child(currentTitle)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            arr = snapshot.val();
            sendMessageToForeground(arr);
          }
        });
    });
  } else if (request.message === "shareNotesButton") {
    var otherTitle;
    var otherEmail;
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tabs) {
        otherTitle = tabs[0].title.split(" ").join("");
        otherEmail = request.payload.toString().slice(0, -10);
        arr.forEach(function (note) {
          db.ref("emails").child(otherEmail).child(otherTitle).push().set(note);
        });
      }
    );
  } else if (request.message === "deleteNote") {
    var titleAgain;
    var emailAgain;
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tabs) {
        titleAgain = tabs[0].title.split(" ").join("");
      }
    );
    chrome.identity.getProfileUserInfo((userInfo) => {
      emailAgain = userInfo.email.toString().slice(0, -10);
      db.ref("emails")
        .child(emailAgain)
        .child(titleAgain)
        .child(request.payload)
        .remove();
    });
  }
});

function sendMessageToForeground(arr) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
    const tabId = tabArray[0].id;
    chrome.tabs.sendMessage(tabId, {
      message: "displayNotes",
      payload: arr,
    });
  });
}
