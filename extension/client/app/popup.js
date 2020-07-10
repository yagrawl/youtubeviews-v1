let recordActivityToggle = document.getElementById("recordActivityToggle");
let hideViewsToggle = document.getElementById("hideViewsToggle");

let statsDetails = document.getElementById("statsDetails");
let statsButton = document.getElementById("statsButton");
let privacyButton = document.getElementById("privacyButton");
let helpButton = document.getElementById("helpButton");
let slideIndex = 1;

chrome.storage.sync.get(['record_activity'], result => {
  recordActivityToggle.checked = result.record_activity;
  console.log("%c Toggle ",
          "color: white; background-color: #2274A5",
          `recordActivityToggle: set to ${recordActivityToggle.checked}`);
});

chrome.storage.sync.get(['hide_views'], result => {
  hideViewsToggle.checked = result.hide_views;
  console.log("%c Toggle ",
          "color: white; background-color: #2274A5",
          `hideViewsToggle: set to ${recordActivityToggle.checked}`);
});

recordActivityToggle.addEventListener("change", function() {
  chrome.storage.sync.set({ record_activity: this.checked }, () => {
    console.log("%c Toggle ", "color: white; background-color: #2274A5",
                `Record Activity Toggle updated`);
  });
});

hideViewsToggle.addEventListener("change", function() {
  chrome.storage.sync.set({ hide_views: this.checked }, () => {
    console.log("%c Toggle ", "color: white; background-color: #2274A5",
                `Hide Views Toggle updated`);
  });

  chrome.storage.local.get(null, items => {
    console.log(items);
  });
});

chrome.storage.local.get(null, items => {
  if(items.length === 0) {
    let message = createElement('p', 'no-stats-message');
    message.textContent = 'Stats will be loaded as you watch videos on YouTube';

    statsDetails.append(message);
    return;
  }

  let data = calculateData(items);
  let countsDiv = createElement('div', 'stats-counts-div');
  let numberOfVideos = createElement('p', 'no-stats-message');
  let numberOfViews = createElement('p', 'no-stats-message');

  numberOfVideos.textContent = `Videos ${data.numberOfVideos}`;
  numberOfViews.textContent = `Views ${data.numberOfViews}`;

  countsDiv.append(numberOfVideos);
  countsDiv.append(numberOfViews);

  let topVideos = data.topVideos;
  let carouselContainer = createElement('div', 'carousel-container');

  let prevButton = createElement('button');
  prevButton.textContent = 'prev';
  prevButton.onclick = function(){ plusSlides(-1) };
  let nextButton = createElement('button');
  nextButton.textContent = 'next';
  nextButton.onclick = function(){ plusSlides(1) };

  for(let i = 0; i < topVideos.length; i++) {
    let videoDiv = getTopVideoDiv(topVideos[i][0], topVideos[i][1]);
    carouselContainer.append(videoDiv);
  }

  carouselContainer.append(prevButton);
  carouselContainer.append(nextButton);

  statsDetails.append(countsDiv);
  statsDetails.append(carouselContainer);

  showSlide(1);
});

let calculateData = items => {
  let data = {};
  data.numberOfVideos = 0;
  data.numberOfViews = 0;
  data.topVideos = [];

  let videos = Object.keys(items).map( key => [key, items[key]] );

  videos.sort((first, second) => {
    return second[1] - first[1];
  });

  data.topVideos = videos.slice(0, 5);

  for(video in items) {
    data.numberOfVideos += 1;
    data.numberOfViews += items[video];
  }

  return data;
}

let getTopVideoDiv = (videoId, count) => {
  let videoDiv = createElement('div', 'carousel-content', 'fade');

  let thumbnail = getThumbnail(videoId);
  videoDiv.append(thumbnail);

  let countNumber = createElement('p', 'count');
  countNumber.textContent = count;

  return videoDiv;
}

let getThumbnail = videoId => {
  let link = createElement('a');
  link.href = `https://www.youtube.com/watch?v=${videoId}`;
  link.target = "_blank";

  let thumbnail = createElement('img', 'thumbnail');
  thumbnail.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  link.append(thumbnail);
  return link;
}

let plusSlides = n => {
  showSlide(slideIndex += n);
}

let showSlide = n => {
  let i;
  let slides = document.getElementsByClassName("carousel-content");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

let createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);

  return element;
}
