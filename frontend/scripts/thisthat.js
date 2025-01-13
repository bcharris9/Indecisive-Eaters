//import { restaurants, edit_restaurants, save_restaurants } from "./utils.js";
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
const button1 = document.getElementById("This");
const button2 = document.getElementById("That");

var index1 = 0
var index2 = 1

var thisImage = document.getElementById("this-image");
var thatImage = document.getElementById("that-image");

var thisImageLink = document.getElementById("this-image-link");
var thatImageLink = document.getElementById("that-image-link");

var thisRestaurantName = document.getElementById("this-restaurant-name");
var thatRestaurantName = document.getElementById("that-restaurant-name");

thisImage.src = storedArray[index1]["image_url"];
thatImage.src = storedArray[index2]["image_url"];

thisImageLink.href = storedArray[index1]["url"];
thatImageLink.href = storedArray[index2]["url"];

thisRestaurantName.innerText = storedArray[index1]["name"];
thatRestaurantName.innerText = storedArray[index2]["name"];

thisImage.width = 200;
thatImage.width = 200;


//When a button is pressed the opposite picture changes
button1.addEventListener("click", function() {
    if (index2 < index1) {
        index2 = index1 + 1;
    }
    else {
        index2++;
    }
    thatImage.src = storedArray[index2]["image_url"];
    thatImageLink.href = storedArray[index2]["url"];
    thatRestaurantName.innerText = storedArray[index2]["name"];

});

button2.addEventListener("click", function() {
    if (index1 < index2) {
        index1 = index2 + 1;
    }
    else {
        index1++;
    }
    thisImage.src = storedArray[index1]["image_url"];
    thisImageLink.href = storedArray[index1]["url"];
    thisRestaurantName.innerText = storedArray[index1]["name"];

});
