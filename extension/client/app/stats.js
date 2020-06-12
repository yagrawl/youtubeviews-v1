let dataDiv = document.getElementById("data");

chrome.storage.local.get(null, items => {
  let table = createElement('table', 'stats-table');

  for (video in items) {
    let row = getRow(video, items[video]);
    table.append(row);
  }

  dataDiv.append(table);
  console.log(items);
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
