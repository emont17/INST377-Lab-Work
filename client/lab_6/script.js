/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
  console.log('fired injectHTML')
  const target = document.querySelector('#restaurant_list');
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str
  })   
}

/* A quick filter that will return something based on a matching input */
function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  })
  /* 
    Using the .filter array method,
    return a list that is filtered by comparing the item name in lower case
    to the query in lower case

    Ask the TAs if you need help with this
  */

}

function cutRestaurantList(list) {
  console.log('fired cut list');
  const range = [...Array(15).keys()];
  return newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length -1);
    return list[index] 
  })
}

async function mainEvent() { // the async keyword means we can make API requests
  const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  const filterButton = document.querySelector('.#filter_button');
  const loadDataButton = document.querySelector('.#data_load');
  const generateListButton = document.querySelector('.#generate');

  const loadAnimation = document.querySelector('#data_load_animation');
  loadAnimation.style.display = 'none'; 

  let currentList = [];

  loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    submitEvent.preventDefault(); // This prevents your page from going to http://localhost:3000/api even if your form still has an action set on it
    console.log('Loading data'); // this is substituting for a "breakpoint"
    loadAnimation.style.display = 'inline-block';

    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    currentList = await results.json();
    loadAnimation.style.display = 'none';
    console.table(currentList);
  });


filterButton.addEventListener('click', (event) => {
  console.log('clicked filterButton');

  const formData = new FormData(mainForm);
  const formProps = Object.fromEntries(formData);

  console.log(formProps);

  const newList = filterList(currentList, formProps.resto);
  console.log(newList);
  injectHTML(newList);
})

  generateListButton.addEventListener('click', (event) => {
    console.log('generate new list');
    const restaurantsList = cutRestaurantList(currentList);
    console.log(restaurantsList);
    injectHTML(restaurantsList);
  })
}

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests