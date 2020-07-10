let RECORD_ACTIVITY = true;
let YOUTUBE_VIDEO_ID_LENGTH = 11;

chrome.runtime.onInstalled.addListener(function() {
  console.log(`${time()} %c Background `, "color: white; background-color: #9CADCE", `Background.js Initiated`);

  chrome.storage.sync.set({ record_activity: true }, () => {
    RECORD_ACTIVITY = true;
    console.log(`${time()} %c Toggle `, "color: white; background-color: #2274A5", `Record Activity Toggle set to true`);
  });

  chrome.storage.sync.set({ hide_views: false }, () => {
    console.log(`${time()} %c Toggle `, "color: white; background-color: #2274A5", `Hide Views Toggle set to false`);
  });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area == "sync" && "record_activity" in changes) {
    if(changes.record_activity.newValue) {
      console.log(`${time()} %c Content `, "color: white; background-color: #FE5F55", `Record Activity toggle updated to true. Recording Activity.`);
      RECORD_ACTIVITY = true;
    } else {
      console.log(`${time()} %c Content `, "color: white; background-color: #FE5F55", `Record Activity toggle updated to false. Not Recording Activity.`);
      RECORD_ACTIVITY = false;
    }
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(RECORD_ACTIVITY) {
    if(tab.status === "complete" && changeInfo.status === "complete") {
      let url = tab.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

      if(url !== null) {
        let videoId = url[1];
        if(videoId.length === YOUTUBE_VIDEO_ID_LENGTH) {
          console.log(`${time()} %c videoId `, "color: white; background-color: #D7AF70", `${videoId}`);

          chrome.storage.local.get([ videoId ], result => {
            if(Object.keys(result).length === 0 && result.constructor === Object) {
              chrome.storage.local.set({ [ videoId ]: 1 });
              chrome.tabs.sendMessage(tab.id, { view: { id: videoId, count: 1 }});

              console.log(`${time()} %c Views `, "color: white; background-color: #F56960", `${1}`);
            } else {
              let views = result[videoId] + 1;
              chrome.storage.local.set({ [ videoId ]: views });
              chrome.tabs.sendMessage(tab.id, { view: { id: videoId, count: views }});

              console.log(`${time()} %c Views `, "color: white; background-color: #F56960", `${views}`);
            }
          });
        }
      }
    }
  }
});

let time = () => {
  let d = new Date();
  let hours, meridiem;

  if(d.getHours() <= 12) {
    hours = d.getHours();
    meridiem = 'AM';
  } else {
    hours = d.getHours() - 12;
    meridiem = 'PM';
  }

  return `${hours}:${d.getMinutes()}:${d.getSeconds()} ${meridiem}`;
}
