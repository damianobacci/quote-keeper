document.body.style.backgroundColor = "orange";
console.log("CONTENT");

chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
  console.log(response.farewell);
});
