var input = document.getElementById("colorInput");
var setColorButton = document.getElementById("setColorButton");
var changeBackgroundColorButton = document.getElementById(
  "changeBackgroundColorButton"
);
var focusTextButton = document.getElementById("focusTextButton");
var highlightTextButton = document.getElementById("highlightTextButton");

setColorButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({
    message: "setColorButton",
    payload: input.value,
  });
});

changeBackgroundColorButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({
    message: "changeBackgroundColorButton",
    payload: null,
  });
});

focusTextButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({
    message: "focusTextButton",
    payload: null,
  });
});

highlightTextButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({
    message: "highlightTextButton",
    payload: null,
  });
});
