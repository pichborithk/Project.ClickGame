const table = document.querySelector('tbody');
const colorArray = ['done', 'red', 'done', 'blue', 'done', 'green'];

function getRandomNumber(array) {
  return Math.floor(Math.random() * array.length);
}

function makeRow() {
  const row = document.createElement('tr');
  let i = 10;
  while (i > 0) {
    const td = document.createElement('td');
    const whichClass = colorArray[getRandomNumber(colorArray)];
    td.classList.add(whichClass);
    row.appendChild(td);
    i--;
  }
  table.appendChild(row);
}

makeRow();

function toggleClass(grid) {
  const className = grid.className;
  switch (className) {
    case 'red':
      grid.classList.remove('red');
      grid.classList.add('blue');
      break;
    case 'blue':
      grid.classList.add('green');
      grid.classList.remove('blue');
      break;
    case 'green':
      grid.classList.remove('green');
      grid.classList.add('done');
      break;
    case 'done':
      return;
  }
}

table.addEventListener('click', function (event) {
  const parents = table.querySelectorAll('tr');
  if (event.target.tagName === 'TD') {
    toggleClass(event.target);
  }
  parents.forEach((child) => {
    const childArray = Array.from(child.children);
    // console.log(childArray);
    const needDelete = childArray.every((element) =>
      element.classList.contains('done')
    );
    if (needDelete) {
      child.remove();
      console.log('success remove');
    }
  });
});
