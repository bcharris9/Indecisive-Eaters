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
var image1 = document.getElementById("this-image");
var image2 = document.getElementById("that-image");
var imagelink1 = document.getElementById("this-image-link");
var imagelink2 = document.getElementById("that-image-link");


image1.src = storedArray[index1]["image_url"];
image2.src = storedArray[index2]["image_url"];

imagelink1.href = storedArray[index1]["url"];
imagelink2.href = storedArray[index2]["url"];


image1.width = 200;
image2.width = 200;


//When a button is pressed the opposite picture changes
button1.addEventListener("click", function() {
    if (index2 < index1) {
        index2 = index1 + 1;
    }
    else {
        index2++;
    }
    image2.src = storedArray[index2]["image_url"];
    imagelink2.href = storedArray[index2]["url"];
});

button2.addEventListener("click", function() {
    if (index1 < index2) {
        index1 = index2 + 1;
    }
    else {
        index1++;
    }
    image1.src = storedArray[index1]["image_url"];
    imagelink1.href = storedArray[index2]["url"];

});
