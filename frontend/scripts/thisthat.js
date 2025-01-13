var restaurantArray = JSON.parse(sessionStorage.getItem("restaurants"));

//Shuffle the array so that the pictures are not displayed in the same order in the same location
var currentIndex = restaurantArray.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [restaurantArray[currentIndex], restaurantArray[randomIndex]] = [
        restaurantArray[randomIndex], restaurantArray[currentIndex]];
    }

var endCondition = restaurantArray.length;

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

thisImageURL.src = restaurantArray[thisIndex]["image_url"];
thatImageURL.src = restaurantArray[thatIndex]["image_url"];

thisURL.href = restaurantArray[thisIndex]["url"];
thatURL.href = restaurantArray[thatIndex]["url"];

thisRestaurantName.innerText = restaurantArray[thisIndex]["name"];
thatRestaurantName.innerText = restaurantArray[thatIndex]["name"];

//When a button is pressed the opposite picture changes
thisButton.addEventListener("click", function() {
    if (thatIndex < thisIndex) {
        thatIndex = thisIndex + 1;
    }
    else {
        thatIndex++;
    }

    if (thatIndex == endCondition) {
        sessionStorage.setItem("finalRestaurant", JSON.stringify(restaurantArray[thisIndex]));
        window.location.href = "display.html";

    }
    else {
        thatImageURL.src = restaurantArray[thatIndex]["image_url"];
        thatURL.href = restaurantArray[thatIndex]["url"];
        thatRestaurantName.innerText = restaurantArray[thatIndex]["name"];
    }

});

thatButton.addEventListener("click", function() {
    if (thisIndex < thatIndex) {
        thisIndex = thatIndex + 1;
    }
    else {
        thisIndex++;
    }

    if (thisIndex == endCondition) {
        sessionStorage.setItem("finalRestaurant", JSON.stringify(restaurantArray[thatIndex]));
        window.location.href = "display.html";
    }
    else {
        thisImageURL.src = restaurantArray[thisIndex]["image_url"];
        thisURL.href = restaurantArray[thisIndex]["url"];
        thisRestaurantName.innerText = restaurantArray[thisIndex]["name"];
    }
});
