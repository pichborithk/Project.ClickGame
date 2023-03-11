const assistSkills = [
  {
    id: 0,
    name: 'BOMB',
    cost: 5,
    srcImg: './pictures/bomb.png',
    ability: function () {
      if (score < this.cost) {
        playAudio(bumpSound);
        return;
      }
      score -= this.cost;
      let count = 0;
      const row = table.querySelector('tr');
      const arrayOfSquare = row.childNodes;
      arrayOfSquare.forEach((square) => {
        if (square.className !== 'done') {
          count++;
        }
      });
      score += count;
      updateScore();
      playAudio(scoreSound);
      row.remove();
    },
  },
  { id: 1, name: 'STOP-TIME', cost: 7, srcImg: './pictures/clock.png' },
  { id: 2, name: 'COWBOY', cost: 5, srcImg: './pictures/cowboy.png' },
];

const table = document.querySelector('tbody');
const buttons = document.querySelectorAll('button');
const scoreSound = document.querySelector('#score-sound');
const bumpSound = document.querySelector('#bump-sound');
const colorArray = ['done', 'red', 'done', 'blue', 'done', 'green'];
const shop = document.querySelector('.shop');
let score = 0;

function renderShop() {
  for (let skill of assistSkills) {
    const div = document.createElement('div');
    div.className = 'grid-item';
    div.innerHTML = `<h3>${skill.name}</h3>
    <img src=${skill.srcImg} alt=${skill.name} />
    <h3>Cost: ${skill.cost}P</h3>`;
    div.addEventListener('click', skill.ability);
    shop.appendChild(div);
  }
}

renderShop();

function getRandomNumber(array) {
  return Math.floor(Math.random() * array.length);
}

function playAudio(sound) {
  sound.currentTime = 0;
  sound.volume = 0.2;
  sound.play();
}

function updateScore() {
  score = score < 0 ? 0 : score;
  const scoreBoard = document.querySelector('#score');
  scoreBoard.innerText = score;
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
  const currentRow = table.querySelector('tr');
  if (square.tagName === 'TD') {
    if (square.className === 'done' || square.parentNode !== currentRow) {
      playAudio(bumpSound);
      score--;
      updateScore();
      return;
    }
    toggleClass(square);
    playAudio(scoreSound);
    score++;
    updateScore();
    removeRow(square);
  }
}

function clickButton() {
  const color = this.dataset.color;
  const currentRow = table.querySelector('tr');
  const square = currentRow.querySelector(`.${color}`);
  if (square) {
    square.className = 'done';
    playAudio(scoreSound);
    score++;
    updateScore();
    removeRow(square);
  } else {
    playAudio(bumpSound);
    score--;
    updateScore();
  }
}

// setInterval(makeRow, 3000);
makeRow();
makeRow();
makeRow();

table.addEventListener('click', clickSquare);

buttons.forEach((btn) => btn.addEventListener('click', clickButton));
