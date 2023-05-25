import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const a=search.split("=");
  return a[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  const urlAPI=await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
  //console.log(`${config.backendEndpoint}/adventures?city=${city}`);
  const dataAPI = await urlAPI.json();
  //console.log(dataAPI);
 return dataAPI;
  }catch(e){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
const carddiv=document.getElementById("category-list");
//const cardinner=document.createElement('div');
//document.getElementById("category-list")="";

console.log(carddiv);
for(let i=0;i!=adventures.length;i++)
{
  //console.log(id);
  const cardinner=`<div class="col-lg-3 col-sm-6 activity-card" >
  <a href="detail/?adventure=${adventures[i].id}" id="${adventures[i].id}"><img class="activity-card img" src="${adventures[i].image}"><img></a>
  <p class="category-banner">${adventures[i].category}<p>
  <p>${adventures[i].name} &#x20b9 ${adventures[i].costPerHead} <br> Duration ${adventures[i].duration}Hours</p>
  </div>`;

  carddiv.innerHTML=carddiv.innerHTML+cardinner;

}
//console.log(carddiv);

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const fList=[];
  for(let i=0;i!=list.length;i++)
  {
    if(list[i].duration<=high && list[i].duration>=low)
    fList.push(list[i]);
  }
  return fList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
//console.log("L",list);
// console.log("C",categoryList);
const listCat=[];
for (let i=0;i!=list.length;i++){
 
 if(categoryList.includes(list[i].category))
 listCat.push(list[i]);
}
return listCat;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log("L",list);
  if(filters.duration.length>0){
    const f=filters.duration.split("-");
  list = filterByDuration(list,f[0], f[1]);
    //console.log(list);
  }
  if(filters.category.length > 0){
  list = filterByCategory(list,filters.category);
    //console.log(list);
  }
//////////////////////////////////////////////////////////////////
  // if((filters.category.length > 0) && (filters.duration.length>0)){
  // list = filterByCategory(list,filters.category);
  // const f=filters.duration.split("-");
  //     list = filterByDuration(list,f[0], f[1]);
  // }
  // else{
  //   if(filters.category.length > 0){
  //     list = filterByCategory(list,filters.category);
  //   }
  //   else if(filters.duration.length>0){
  //   const f=filters.duration.split("-");
  //     list = filterByDuration(list,f[0], f[1]);
  //    }
  // }

   console.log(filters);
  
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
window.localStorage.setItem('filters',JSON.stringify(filters));
//localStorage.setItem('category',JSON.stringify(filters.category));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
 const savedFilter= window.localStorage.getItem('filters');
 const retFil=JSON.parse(savedFilter);
//onst c= localStorage.getItem('category');
// console.log("Durr",d);

  // Place holder for functionality to work in the Stubs
  return retFil;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
   const cat=document.getElementById("category-list");
   //const catDiv=`<div>${filters.category}</div>`;
   for(let i=0;i!=filters.category.length;i++)
   {
    const catDiv=`<div>${filters.category[i]}</div>`;
    cat.innerHTML=cat.innerHTML+catDiv;
   }
   
   const dur=document.getElementById("duration-select");
   dur.value=filters.duration;
  //  const durDiv=`<div>${filters.duration}</div>`;
  //  dur.innerHTML=dur.innerHTML+durDiv;

   //const d=filters.duration;
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
