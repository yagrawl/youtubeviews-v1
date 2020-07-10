let slideIndex = 1;

export function getStats(statsDetails) {
  chrome.storage.local.get(null, items => {
    if(items.length <= 5) {
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

    let prevButton = createElement('a', 'prev');
    prevButton.innerHTML = '&#10094;';
    prevButton.onclick = function(){ plusSlides(-1) };
    let nextButton = createElement('a', 'next');
    nextButton.innerHTML = '&#10095;';
    nextButton.onclick = function(){ plusSlides(1) };

    let dots = createElement('div', 'dots');

    for(let i = 0; i < topVideos.length; i++) {
      let videoDiv = getTopVideoDiv(topVideos[i][0], topVideos[i][1]);
      let dot = getDots(i);

      carouselContainer.append(videoDiv);
      dots.append(dot);
    }

    carouselContainer.append(prevButton);
    carouselContainer.append(nextButton);

    statsDetails.append(countsDiv);
    statsDetails.append(carouselContainer);
    statsDetails.append(dots);

    showSlide(1);
  });
}

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

  for(let video in items) {
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
  countNumber.textContent = `${count} view${(count === 1) ? '': 's'}`;

  videoDiv.append(countNumber);

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

let getDots = number => {
  let dot = createElement('span', 'dot');
  dot.onclick = function(){ currentSlide(number) };

  return dot;
}

let plusSlides = n => {
  showSlide(slideIndex += n);
}

let currentSlide = n => {
  showSlide(slideIndex = n);
}

let showSlide = n => {
  let i;
  let slides = document.getElementsByClassName("carousel-content");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

let createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);

  return element;
}
