document
  .getElementById("quote-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let author = document.getElementById("author").value;
    let tag = document.getElementById("tags").value;

    chrome.storage.local.get(["quote", "url"], function (data) {
      let storage = {
        quote: data.quote,
        author: author,
        tag: tag,
        url: data.url,
      };

      chrome.storage.local.set(storage, function () {
        window.close();
      });
    });
  });
