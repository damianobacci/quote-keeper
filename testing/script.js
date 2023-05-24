function logSelectedText() {
  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  }
  console.log(text);
}

document.querySelector("#logger").addEventListener("click", logSelectedText);
