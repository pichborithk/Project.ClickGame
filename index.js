const table = document.querySelector('tbody');
const colorArray = ['done', 'red', 'done', 'blue', 'done', 'green'];

function getRandomNumber(array) {
  return Math.floor(Math.random() * array.length);
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
  table.appendChild(row);
}

function toggleClass(square) {
  const className = square.className;
  if (className === 'red' || className === 'green' || className === 'blue') {
    square.className = 'done';
  }
  return;
}

function hitSquare(event) {
  const parent = event.target.parentNode;
  const arrayOfChildren = Array.from(parent.querySelectorAll('td'));
  if (event.target.tagName === 'TD') {
    toggleClass(event.target);
  }
  const deleteRow = arrayOfChildren.every((child) =>
    child.classList.contains('done')
  );
  if (deleteRow) {
    parent.remove();
    console.log('success remove 1 row');
  }
}

makeRow();

table.addEventListener('click', hitSquare);
