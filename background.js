chrome.contextMenus.create({
  title: "My custom menu item",
  contexts: ["selection"],
  onclick: function (info, tab) {
    console.log("Selected text: " + info.selectionText);
  },
});
