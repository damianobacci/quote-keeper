function saveQuoteToStorage() {
  const quoteData = {
    text: document.querySelector("#quoteModal textarea").value,
    author: document.getElementById("quoteAuthor").value,
    url: document.getElementById("quoteURL").value,
    tags: document
      .getElementById("quoteTags")
      .value.split(",")
      .map((tag) => tag.trim()),
  };

  // Fetch the stored quotes
  chrome.storage.local.get("quotes", function (data) {
    const quotes = data.quotes || [];
    quotes.push(quoteData);

    // Store the new list of quotes
    chrome.storage.local.set({ quotes: quotes }, function () {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log("Quote saved!");
        document.getElementById("quoteModal").remove();
      }
    });
  });
}
