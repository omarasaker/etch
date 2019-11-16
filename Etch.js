const grid = document.getElementById('grid');
const black = document.getElementById('black');
const shader = document.getElementById('shade');
const random = document.getElementById('random');
const change = document.getElementById('change');
const reset = document.getElementById('reset');
let color = '#000';
let gridSize = 16;

// Initialize the grid when DOM is loaded with standard 16x16 size
window.addEventListener('DOMContentLoaded', (event) => {
  setGrid(gridSize);
});


// event listener for black button click
black.addEventListener('click', (event) => {
  color = "#000";
});

// event listener for shade button click
shader.addEventListener('click', (event) => {
  color = "#ccc";
});

// event listener for random button click
random.addEventListener('click', (event) => {
  color = "random";
});

// change grid event listener
change.addEventListener('click', (event) => {
  // ask user for size
  givenSize = prompt('How many columns should the grid have? Default is 16.');
  // check if the given size is an integer
  if(Number.isInteger(parseInt(givenSize))){
    // checks out, pass the size and create a new grid based on it
    gridSize = givenSize;
    while(grid.firstChild){
      grid.removeChild(grid.firstChild);
    }
    setGrid(gridSize);
  }
  else{
    // let the user know his input was not accepted
    alert('Your input "' + givenSize +'" was not accepted.');
  }
  
});

// event listener to reset the grid
reset.addEventListener('click', (event) => {
  while(grid.firstChild){
    grid.removeChild(grid.firstChild);
  }
  setGrid(gridSize);
});

function setGrid(size){
  // create grid based on given size -- rows must be equal to columns
  for (let rows = 0; rows < size; rows++) {
    for (let columns = 0; columns < size; columns++) {
      // create single div with item class and append to main grid
      let item = document.createElement('div');
      item.classList.add('item');
      grid.appendChild(item);
    }
  }
  // set the grid template columns style
  grid.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";

  // create array from all divs with class of item
  let items = Array.from(document.querySelectorAll('.item'));
  // foreach item we add the event listener mouseenter and change the bg color
  items.forEach(item => {
    item.addEventListener('mouseenter', (event) => {
      // check if color is set to random
      if(color === "random"){
        // we're using rgb for the background style and will randomize the 3 values using math.floor & math.random
        item.style.background = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      }
      else{
        item.style.background = color;
      }
    });
  });
}