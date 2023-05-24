let storage = {};

function logSelectedText() {
  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  }
  let author = prompt("Please enter the author's name");
  let tag = prompt("Please enter a tag");

  if (author !== null) {
    storage = {
      author: author,
      text: text,
      tag: tag,
    };
  }
  console.log(storage);
}
document.querySelector("#logger").addEventListener("click", logSelectedText);
