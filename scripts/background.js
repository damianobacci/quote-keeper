// Context Menu
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "save-quote",
    title: "Save quote",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "save-quote" && tab.id) {
    const selectedText = info.selectionText;
    console.log(selectedText);

    // Inject the content.js file
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["content.js"],
      },
      () => {
        // After injection, call the showQuoteModal function within the content.js
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: showQuoteModal,
          args: [selectedText],
        });
      }
    );
  }
});

function showQuoteModal(quoteText) {
  const currentURL = window.location.href;
  const modalHTML = `
    <div id="quoteModal" style="position:fixed;top:35%;left:35%;width:40%;height:30%;z-index:9999;background:white;">
      <h2>Save Quote</h2>
      <textarea disabled style="width:90%;height:30%;">${quoteText}</textarea><br>
      Author: <input type="text" id="quoteAuthor"><br>
      URL: <input type="text" id="quoteURL" value="${currentURL}" disabled><br>
      Tags: <input type="text" id="quoteTags" placeholder="tag1, tag2,..."><br>
      <button onclick="saveQuoteToStorage()">Save</button>
      <button onclick="document.getElementById('quoteModal').remove()">Cancel</button>
    </div>
  `;

  const modalWrapper = document.createElement("div");
  modalWrapper.innerHTML = modalHTML;
  document.body.appendChild(modalWrapper);
}
