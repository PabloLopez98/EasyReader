console.log("running foreground.js");

let color = "red";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "setColorButton") {
    if (request.payload !== "") color = request.payload;
    console.log("INSIDE FOREGROUND.JS, payload ----->  " + color);
  } else if (request.message === "changeColorButton") {
    console.log("INSIDE FOREGROUND.JS, CHANGE COLOR BUTTON");
  } else if (request.message === "hideContentButton") {
    console.log("INSIDE FOREGROUND.JS, payload HIDE CONTENT BUTTON");
  }
});
