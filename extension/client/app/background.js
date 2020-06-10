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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(tab.status === "complete" && changeInfo.status === "complete") {
    let videoId = tab.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1];

    if(videoId !== null) {
      console.log("%c videoId ", "color: white; background-color: #D7AF70",
                videoId);

      chrome.storage.local.get([ videoId ], result => {
        if(Object.keys(result).length === 0 && result.constructor === Object) {
          chrome.storage.local.set({ [ videoId ]: 1 });
          console.log("%c Views ", "color: white; background-color: #F56960", 1);
        } else {
          let views = result[videoId] + 1;
          chrome.storage.local.set({ [ videoId ]: views });
          console.log("%c Views ", "color: white; background-color: #F56960", views);
        }
      });
    }
  }
});
