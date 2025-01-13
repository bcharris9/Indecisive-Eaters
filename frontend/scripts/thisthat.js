var storedArray = JSON.parse(sessionStorage.getItem("restaurants"));

//Shuffle the array so that the pictures are not displayed in the same order in the same location
var currentIndex = storedArray.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [storedArray[currentIndex], storedArray[randomIndex]] = [
        storedArray[randomIndex], storedArray[currentIndex]];
    }

// TODO use max to implement end scenario
var max = storedArray.length;

//Set default images and index
const thisButton = document.getElementById("This");
const thatButton = document.getElementById("That");

var thisIndex = 0;
var thatIndex = 1;

var thisImageURL = document.getElementById("this-image");
var thatImageURL = document.getElementById("that-image");

var thisURL = document.getElementById("this-image-link");
var thatURL = document.getElementById("that-image-link");

var thisRestaurantName = document.getElementById("this-restaurant-name");
var thatRestaurantName = document.getElementById("that-restaurant-name");

thisImageURL.src = storedArray[thisIndex]["image_url"];
thatImageURL.src = storedArray[thatIndex]["image_url"];

thisURL.href = storedArray[thisIndex]["url"];
thatURL.href = storedArray[thatIndex]["url"];

thisRestaurantName.innerText = storedArray[thisIndex]["name"];
thatRestaurantName.innerText = storedArray[thatIndex]["name"];

//When a button is pressed the opposite picture changes
thisButton.addEventListener("click", function() {
    if (thatIndex < thisIndex) {
        thatIndex = thisIndex + 1;
    }
    else {
        thatIndex++;
    }
    thatImageURL.src = storedArray[thatIndex]["image_url"];
    thatURL.href = storedArray[thatIndex]["url"];
    thatRestaurantName.innerText = storedArray[thatIndex]["name"];

});

thatButton.addEventListener("click", function() {
    if (thisIndex < thatIndex) {
        thisIndex = thatIndex + 1;
    }
    else {
        thisIndex++;
    }
    thisImageURL.src = storedArray[thisIndex]["image_url"];
    thisURL.href = storedArray[thisIndex]["url"];
    thisRestaurantName.innerText = storedArray[thisIndex]["name"];

});
