var input = document.getElementById("colorInput");
var setColorButton = document.getElementById("setColorButton");
var changeColorButton = document.getElementById("changeColorButton");
var hideContentButton = document.getElementById("hideContentButton");

setColorButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({
    message: "setColorButton",
    payload: input.value,
  });
});

changeColorButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({
    message: "changeColorButton",
    payload: null,
  });
});

hideContentButton.addEventListener("click", function () {
  chrome.runtime.sendMessage({
    message: "hideContentButton",
    payload: null,
  });
});
