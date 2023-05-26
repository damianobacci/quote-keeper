chrome.runtime.onInstalled.addListener(() => {
  console.log("Everything's working");

  chrome.contextMenus.create({
    id: "save-quote",
    title: "Save quote",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  let text = info.selectionText;
  chrome.storage.local.set({ quote: text, url: tab.url }, function () {
    chrome.action.setPopup({ popup: "popup.html" });
    chrome.action.openPopup();
  });
});
