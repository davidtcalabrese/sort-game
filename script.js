// unordered list of cities
const draggable_list = document.getElementById('draggable-list');
// check button
const check = document.getElementById('check');

const newYork = {"name": "New York", "population": "8,623,000"};
const losAngeles = {"name": "Los Angeles", "population": "3,976,000"};
const chicago = {"name": "Chicago", "population": "2,726,000"};
const houston = {"name": "Houston", "population": "2,296,000"};
const phoenix = {"name": "Phoenix", "population": "1,566,000"};
const philadelphia = {"name": "Philadelphia", "population": "1,586,000"};
const sanAntonio = {"name": "San Antonio", "population": "1,466,000"};
const sanDiego = {"name": "San Diego", "population": "1,416,000"};
const dallas = {"name": "Dallas", "population": "1,325,000"};
const sanJose = {"name": "San Jose", "population": "1,036,000"};

const largestCities = [
  newYork,
  losAngeles,
  chicago,
  houston,
  phoenix,
  philadelphia,
  sanAntonio,
  sanDiego,
  dallas,
  sanJose,
];

// const largestCities = [
//   'New York',
//   'Los Angeles',
//   'Chicago',
//   'Houston',
//   'Phoenix',
//   'Philadelphia',
//   'San Antonio',
//   'San Diego',
//   'Dallas',
//   'San Jose',
// ];

// store list items
const listItems = [];

let dragStartIndex;

createList();

// insert list items into DOM
function createList() {
  [...largestCities]
    .map(city => ({ value: city, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(city => city.value)
    .forEach((city, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="city-name">${city.name}</p>
                <span class="hidden population">(${city.population})</span>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const cityName = listItem.querySelector('.draggable').innerText.trim();
    const population = listItem.querySelector('.population');
    
    if (cityName !== largestCities[index].name) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
      population.classList.remove('hidden');
      listItem.classList.add('show');
    }
  })
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);