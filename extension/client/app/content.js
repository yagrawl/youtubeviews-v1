console.log("%c Content ", "color: white; background-color: #FE5F55",
            `Content.js Initiated`);

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
  viewCount.textContent = '# views';

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
