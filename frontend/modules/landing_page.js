import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  
  let cities = await fetchCities();
   
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let url = config.backendEndpoint + '/cities';
  //console.log(url);
  try{
  let cityprom = await fetch(url);
  let cities = await cityprom.json();
   //console.log("from init()");
   return cities
  } catch(e){
    return null
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const rootelem = document.getElementById('data');
const cityCard= `<div class="tile col-lg-3 col-md-4 col-sm-6">
<div class="tile-text">
 <p>${city} <br>${description}<p></div><a href="pages/adventures/?city=${id}" id="${id}"><img src="${image}" class="tile img" ></img></a>
 </div>`; 

rootelem.innerHTML = rootelem.innerHTML + cityCard;
    
}

export { init, fetchCities, addCityToDOM };
