import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
const adventureID= new URLSearchParams(search);
const adventureIDRet=adventureID.get('adventure');

  // Place holder for functionality to work in the Stubs
  return adventureIDRet;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
try{
 const url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
 const advDetails= await fetch(url);
 const advDetailsRet = await advDetails.json();
  // Place holder for functionality to work in the Stubs
  //console.log(advDetailsRet);
  return advDetailsRet;
}catch{
  return null;
}
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const advName=document.getElementById('adventure-name');
  advName.textContent=adventure.name;
  const advSub=document.getElementById('adventure-subtitle');
  advSub.textContent=adventure.subtitle;
  const advPhoto=document.getElementById('photo-gallery');
  //console.log(adventure.images.length);
  for(let i=0;i!=adventure.images.length;i++){
   const pic=`<div class="activity-card-image"><img src="${adventure.images[i]}"></div>`;
    advPhoto.innerHTML=advPhoto.innerHTML+pic;
  }  
  const advContent=document.getElementById('adventure-content');
  advContent.textContent=adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
//console.log(images);
  const advPhoto=document.getElementById('photo-gallery');

  advPhoto.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div id="photo-galery" class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  const bpgPhoto=document.getElementById('photo-galery');
  const pic=`<div class="carousel-item active"><img class="d-block h-100 w-100" src="${images[0]}"></div>`;
    bpgPhoto.innerHTML=bpgPhoto.innerHTML+pic;
  for(let i=1;i!=images.length;i++){
    const pic=`<div class="carousel-item"><img class="d-block h-100 w-100" src="${images[i]}"></div>`;
    bpgPhoto.innerHTML=bpgPhoto.innerHTML+pic;
   }  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available)
  {    
  document.getElementById("reservation-panel-sold-out").style.display = "none";
  document.getElementById("reservation-panel-available").style.display = "block";
  const costPerHead=document.getElementById("reservation-person-cost");
  costPerHead.textContent=adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  
  const totalCost=document.getElementById("reservation-cost");
  let finalCost=persons * adventure.costPerHead;
  totalCost.textContent=finalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form=document.getElementById("myForm");
  form.addEventListener("submit" , async (event)=>{
    event.preventDefault();
    let url= config.backendEndpoint + "/reservations/new";
    let formElements = form.elements;
    let bodyString = JSON.stringify({
      name: formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id,
    });
    try{
      let res = await fetch(url, {
        method: 'POST',
        body: bodyString,
        headers: {
         'Content-Type': 'application/json',
        },
      });
      if(res.ok){
        alert("Success!");
        window.location.reload();
      }else{
        let data = await res.json();
        alert(`Failed - ${data.message}`);
      }
    }catch (err){
      console.log(err);
      alert("Failed - fetch call resulted in error");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if (adventure.reserved){
  document.getElementById("reserved-banner").style.display ="block";
}else{  
  document.getElementById("reserved-banner").style.display ="none";
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
