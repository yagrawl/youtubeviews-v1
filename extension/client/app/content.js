console.log("%c Content ", "color: white; background-color: #FE5F55",
            `Content.js Initiated`);
let views = '•';

let showViews = () => {
  let counterDiv = document.getElementById('info-text');
  let myViews = document.createElement('div');
  myViews.id = 'youtubeviews-ui';
  myViews.classList.add('views');

  let logo = document.createElement('img');
  logo.src = 'https://i.imgur.com/wV4ZJue.png';
  logo.classList.add('logo');

  let viewCount = document.createElement('span');
  viewCount.classList.add('view-count');
  viewCount.textContent = `${views} views`;

  let dot = document.createElement('span');
  dot.classList.add('dot');
  dot.textContent = '•';

  myViews.append(logo, viewCount, dot);
  counterDiv.prepend(myViews);
}

let hideViews = () => {
  let counterDiv = document.getElementById('info-text');
  let myViews = document.getElementById('youtubeviews-ui');

  counterDiv.removeChild(myViews);
}

chrome.storage.sync.get(['hide_views'], result => {
  if(!result.hide_views) {
    console.log("%c Content ", "color: white; background-color: #FE5F55",
                `Hide Views toggle set to false. Showing Views.`);
    showViews();
  } else {
    console.log("%c Content ", "color: white; background-color: #FE5F55",
                `Hide Views toggle set to true. Hiding Views.`);
  }
});

let storeData = () => {
  let videoId = location.href.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1];

  if(videoId !== null) {
    console.log('videoId: ', videoId);
    let videoIdKey = `youtubeviews:${videoId}`;

    chrome.storage.local.get([ videoIdKey ], result => {
      if(result[videoIdKey] === undefined) {
        chrome.storage.local.set({ [ videoIdKey ]: 1 });
        views = 1;
        hideViews();
        showViews();
      } else {
        views = result[videoIdKey] + 1;
        chrome.storage.local.set({ [ videoIdKey ]: views });
        hideViews();
        showViews();
      }
    });
  }
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area == "sync" && "hide_views" in changes) {
    if(changes.hide_views.newValue) {
      console.log("%c Content ", "color: white; background-color: #FE5F55",
                  `Hide Views toggle updated to true. Hiding Views.`);
      hideViews();
    } else {
      console.log("%c Content ", "color: white; background-color: #FE5F55",
                  `Hide Views toggle updated to false. Showing Views.`);
      showViews();
    }
  }
});

storeData();
