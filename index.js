const table = document.querySelector('tbody');
const buttons = document.querySelectorAll('button');
const scoreSound = document.querySelector('#score-sound');
const bumpSound = document.querySelector('#bump-sound');
const colorArray = ['done', 'red', 'done', 'blue', 'done', 'green'];

function getRandomNumber(array) {
  return Math.floor(Math.random() * array.length);
}

function playAudio(sound) {
  sound.currentTime = 0;
  sound.volume = 0.2;
  sound.play();
}

function makeRow() {
  const row = document.createElement('tr');
  let i = 10;
  while (i > 0) {
    const square = document.createElement('td');
    const whichClass = colorArray[getRandomNumber(colorArray)];
    square.classList.add(whichClass);
    row.appendChild(square);
    i--;
  }
  const arrayOfChildren = Array.from(row.querySelectorAll('td'));
  const deleteRow = arrayOfChildren.every((child) =>
    child.classList.contains('done')
  );
  if (deleteRow) {
    makeRow();
  } else {
    table.appendChild(row);
  }
}

function toggleClass(square) {
  const className = square.className;
  if (className === 'red' || className === 'green' || className === 'blue') {
    square.className = 'done';
  }
  return;
}

function removeRow(square) {
  const row = square.parentNode;
  const arrayOfChildren = Array.from(row.querySelectorAll('td'));
  const deleteRow = arrayOfChildren.every((child) =>
    child.classList.contains('done')
  );
  if (deleteRow) {
    row.remove();
    console.log('success remove 1 row');
  }
}

function clickSquare(event) {
  const square = event.target;
  if (square.tagName === 'TD') {
    if (square.className === 'done') {
      playAudio(bumpSound);
      return;
    }
    toggleClass(square);
    playAudio(scoreSound);
    removeRow(square);
  }
}

function clickButton() {
  const color = this.dataset.color;
  console.log(color);
  const square = table.querySelector(`.${color}`);
  if (square) {
    square.className = 'done';
    playAudio(scoreSound);
    removeRow(square);
  } else {
    playAudio(bumpSound);
  }
}

// setInterval(makeRow, 3000);
makeRow();

table.addEventListener('click', clickSquare);

buttons.forEach((btn) => btn.addEventListener('click', clickButton));
