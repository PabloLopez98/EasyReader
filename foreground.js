let theColor = "red";
let enableChangeBackgroundColor = false;
let enableHighlightText = false;
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
    if (enableHighlightText) enableHighlightText = false;
    else enableHighlightText = true;
  }
});

document.addEventListener(
  "click",
  function (e) {
    e = e || window.event;
    var target = e.target;
    console.log(target);
    if (enableChangeBackgroundColor) target.style.backgroundColor = theColor;
  },
  false
);

function focus() {
  if (enableFocus) {
    document.body.style.visibility = "hidden";
    //target.style.visibility = "visible";
    let arr = document.getElementsByTagName("P");
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.visibility = "visible";
    }
  } else {
    document.body.style.visibility = "visible";
  }
}
