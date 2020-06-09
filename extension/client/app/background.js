chrome.runtime.onInstalled.addListener(function() {
  console.log("%c Background ", "color: white; background-color: #9CADCE",
              `Background.js Initiated`);

  chrome.storage.sync.set({ record_activity: true }, () => {
    console.log("%c Toggle ", "color: white; background-color: #2274A5",
                `Record Activity Toggle set to true`);
  });

  chrome.storage.sync.set({ hide_views: false }, () => {
    console.log("%c Toggle ", "color: white; background-color: #2274A5",
                `Hide Views Toggle set to false`);
  });
});
