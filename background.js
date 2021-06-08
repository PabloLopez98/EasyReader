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

/* chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
    const tabId = tabArray[0].id;
    chrome.tabs.sendMessage(tabId, {
      message: request.message,
      payload: request.payload,
    });
  });
}); */

/* chrome.tabs.query(
  { currentWindow: true, active: true },
  function (tabArray) {
    const tabId = tabArray[0].id;
    
  }
); */

/* chrome.scripting
.executeScript({
  target: { tabId: tabId },
  files: ["./foreground.js"],
})
.then(() => {
  console.log("foreground.js injected successfully");
})
.catch((err) => console.log(err)); */
