chrome.runtime.onInstalled.addListener(() => {
  console.log("Hello");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab ? "from a content script" + sender.tab.url : "from the extension"
  );
  if (request.greeting === "hello") sendResponse({ farewell: "goodbyw" });
});

chrome.contextMenus.create({
  id: "foo",
  title: "Lukito",
  contexts: ["page"],
});
