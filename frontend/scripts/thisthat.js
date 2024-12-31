//import { restaurants, edit_restaurants, save_restaurants } from "./utils.js";
var storedArray = JSON.parse(sessionStorage.getItem("restaurants"));

console.log(storedArray[0]);

let currentIndex = storedArray.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [storedArray[currentIndex], storedArray[randomIndex]] = [
        storedArray[randomIndex], storedArray[currentIndex]];
    }

console.log(storedArray[0]);





//let pos;
//
//user_input = str(input(f"{df.at[0, 'name']}      {df.at[1, 'name']}\nThis or That:   "))
// document.getElementById('this').addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent default form submission


// });

// document.getElementById('that').addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent default form submission


// });


