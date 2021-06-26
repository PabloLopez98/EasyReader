let theColor = "blue";
let enableChangeBackgroundColor = false;
let enableFocus = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "setColorButton") {
    if (request.payload !== "") theColor = request.payload;
    console.log("INSIDE FOREGROUND.JS, payload ----->  " + theColor);
  } else if (request.message === "changeBackgroundColorButton") {
    console.log("INSIDE FOREGROUND.JS, changeBackgroundColorButton");
    if (enableChangeBackgroundColor) enableChangeBackgroundColor = false;
    else enableChangeBackgroundColor = true;
  } else if (request.message === "focusTextButton") {
    console.log("INSIDE FOREGROUND.JS, focusTextButton");
    if (enableFocus) enableFocus = false;
    else enableFocus = true;
    focus();
  } else if (request.message === "highlightTextButton") {
    console.log("INSIDE FOREGROUND.JS, highlightTextButton");
    getText();
  } else if (request.message === "readTextButton") {
    console.log("INSIDE FOREGROUND.JS, readTextButton");
    readText();
  } else if (request.message === "displayNotes") {
    let parentDiv = document.createElement("div");
    parentDiv.id = "parentDivNotes";
    var ul = document.createElement("ul");
    parentDiv.appendChild(ul);
    console.log(request.payload);
    Object.keys(request.payload).forEach(function (key) {
      var li = document.createElement("li");
      li.style.margin = "10px";
      li.style.fontSize = "18px";
      li.id = key;
      li.addEventListener("click", function (e) {
        e.preventDefault();
        deleteNote(e.target.id);
      });
      ul.appendChild(li);
      li.innerHTML = li.innerHTML + request.payload[key];
    });
    parentDiv.style.zIndex = 10;
    parentDiv.style.position = "fixed";
    parentDiv.style.left = 0;
    parentDiv.style.top = 0;
    parentDiv.style.padding = "10px";
    parentDiv.style.height = "100%";
    parentDiv.style.background = "white";
    parentDiv.style.visibility = "visible";
    let closeButtonElement = document.createElement("div");
    closeButtonElement.innerHTML = "Close Notes";
    closeButtonElement.style.margin = "2px";
    closeButtonElement.style.textAlign = "center";
    closeButtonElement.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("closing");
      parentDiv.style.visibility = "hidden";
    });
    parentDiv.appendChild(closeButtonElement);
    document.body.append(parentDiv);
  }
});

function deleteNote(id) {
  document.getElementById(id).remove();
  chrome.runtime.sendMessage({
    message: "deleteNote",
    payload: id,
  });
}

document.addEventListener(
  "click",
  function (e) {
    e = e || window.event;
    var target = e.target;
    if (enableChangeBackgroundColor) target.style.backgroundColor = theColor;
  },
  false
);

function focus() {
  if (enableFocus) {
    document.body.style.visibility = "hidden";
    let arr = document.getElementsByTagName("P");
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.visibility = "visible";
    }
    document.getElementById("parentDivNotes").style.visibility = "hidden";
  } else {
    document.body.style.visibility = "visible";
    document.getElementById("parentDivNotes").style.visibility = "visible";
  }
}

var myTimeout;
function myTimer() {
  window.speechSynthesis.pause();
  window.speechSynthesis.resume();
  myTimeout = setTimeout(myTimer, 10000);
}

function readText() {
  try {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      myTimeout = setTimeout(myTimer, 10000);
      var textToRead = window.getSelection().toString();
      let utterThis = new SpeechSynthesisUtterance(textToRead);
      utterThis.rate = 0.9;
      utterThis.onend = function () {
        clearTimeout(myTimeout);
      };
      window.speechSynthesis.speak(utterThis);
    } else {
      alert("not supported");
    }
  } catch (e) {
    console.log(e);
  }
}

function getText() {
  if (window.getSelection) {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var newNode = document.createElement("span");
    newNode.setAttribute("style", `background-color: ${theColor};`);
    range.surroundContents(newNode);
  }
}
