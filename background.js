chrome.runtime.onInstalled.addListener(() => {
  console.log("Everything's working");

  chrome.contextMenus.create({
    id: "save-quote",
    title: "Save quote",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  let storage = {};
  let text = info.selectionText;
  storage = {
    quote: text,
  };
  console.log(storage.quote);
  console.log(tab.url);
});
