let counterDiv = document.getElementById('info-text');
let myViews = document.createElement('div');
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
