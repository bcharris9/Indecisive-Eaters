import { restaurants, save_restaurants } from "./utils.js";


function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

save_restaurants(shuffle(restaurants));
console.log(restaurants);

//let pos;
//
//user_input = str(input(f"{df.at[0, 'name']}      {df.at[1, 'name']}\nThis or That:   "))
// document.getElementById('this').addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent default form submission


// });

// document.getElementById('that').addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent default form submission


// });


