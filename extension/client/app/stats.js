let dataDiv = document.getElementById("data");

chrome.storage.local.get(null, items => {
  let table = createElement('table', 'stats-table');
  let data = calculateData(items);
  let topTen = data.topTenVideos;

  for(let i = 0; i < topTen.length; i++) {
    let row = getRow(topTen[i][0], topTen[i][1]);
    table.append(row);
  }

  dataDiv.append(table);
});

let getRow = (videoId, count) => {
  let row = createElement('tr');
  let videoDiv = createElement('td', 'stats-row');
  let countDiv = createElement('td');

  let thumbnail = getThumbnail(videoId);
  videoDiv.append(thumbnail);

  let countNumber = createElement('p', 'count');
  countNumber.textContent = count;
  countDiv.append(countNumber);

  row.append(videoDiv);
  row.append(countDiv);

  return row;
}

let calculateData = items => {
  let data = {};
  data.numberOfVideos = 0;
  data.numberOfViews = 0;
  data.topTenVideos = [];

  let videos = Object.keys(items).map( key => [key, items[key]] );

  videos.sort((first, second) => {
    return second[1] - first[1];
  });

  data.topTenVideos = videos.slice(0, 10);

  for(video in items) {
    data.numberOfVideos += 1;
    data.numberOfViews += items[video];
  }

  return data;
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

let createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);

  return element;
}
