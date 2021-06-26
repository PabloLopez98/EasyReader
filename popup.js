var input = document.getElementById("colorInput");
var setColorButton = document.getElementById("setColorButton");
var changeBackgroundColorButton = document.getElementById(
  "changeBackgroundColorButton"
);
var focusTextButton = document.getElementById("focusTextButton");
var highlightTextButton = document.getElementById("highlightTextButton");
var readTextButton = document.getElementById("readTextButton");
var addNoteButton = document.getElementById("addNoteButton");
var viewNotesButton = document.getElementById("viewNotesButton");
var shareNotesButton = document.getElementById("shareNotesButton");

var cb = document.getElementById("cb");
var ft = document.getElementById("ft");

let buttonLogicData = {};

document.addEventListener("DOMContentLoaded", function (e) {
  chrome.storage.local.get("buttonLogic", function (data) {
    buttonLogicData = data.buttonLogic;
    cb.innerHTML = data.buttonLogic.changeBackgroundColorButton.toString();
    ft.innerHTML = data.buttonLogic.focusTextButton.toString();
  });
});

setColorButton.addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
    const tabId = tabArray[0].id;
    chrome.tabs.sendMessage(tabId, {
      message: "setColorButton",
      payload: input.value,
    });
  });
});

changeBackgroundColorButton.addEventListener("click", function () {
  buttonLogicData.changeBackgroundColorButton =
    !buttonLogicData.changeBackgroundColorButton;
  cb.innerHTML = buttonLogicData.changeBackgroundColorButton;
  chrome.storage.local.set({ buttonLogic: buttonLogicData });
  //
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
    const tabId = tabArray[0].id;
    chrome.tabs.sendMessage(tabId, {
      message: "changeBackgroundColorButton",
      payload: null,
    });
  });
});

focusTextButton.addEventListener("click", function () {
  buttonLogicData.focusTextButton = !buttonLogicData.focusTextButton;
  ft.innerHTML = buttonLogicData.focusTextButton;
  chrome.storage.local.set({ buttonLogic: buttonLogicData });
  //
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
    const tabId = tabArray[0].id;
    chrome.tabs.sendMessage(tabId, {
      message: "focusTextButton",
      payload: null,
    });
  });
});

highlightTextButton.addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
    const tabId = tabArray[0].id;
    chrome.tabs.sendMessage(tabId, {
      message: "highlightTextButton",
      payload: null,
    });
  });
});

readTextButton.addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
    const tabId = tabArray[0].id;
    chrome.tabs.sendMessage(tabId, {
      message: "readTextButton",
      payload: null,
    });
  });
});

addNoteButton.addEventListener("click", function () {
  let inputElement = document.getElementById("input");
  if (inputElement.value === "") {
    alert("Empty Note");
  } else {
    chrome.runtime.sendMessage({
      message: "addNoteButton",
      payload: inputElement.value,
    });
    inputElement.value = "";
  }
});

viewNotesButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({
    message: "viewNotesButton",
    payload: null,
  });
});

shareNotesButton.addEventListener("click", function () {
  let inputEmailElement = document.getElementById("emailInput");
  if (inputEmailElement.value === "") {
    alert("Empty Email");
  } else {
    chrome.runtime.sendMessage({
      message: "shareNotesButton",
      payload: inputEmailElement.value,
    });
    inputEmailElement.value = "";
  }
});
