export let restaurants = [];


function save_restaurants() {
    sessionStorage.setItem("restaurant", JSON.stringify(restaurants));
}

export function load_restaurants() {
    /*restaurants = JSON.parse(sessionStorage.getItem("restaurant"));
    if (!restaurants) {
        restaurants = [];
    }*/
    restaurants = JSON.parse(sessionStorage.getItem("restaurant") || "[]");
}

export function edit_restaurants(new_restaurants) {
    restaurants = new_restaurants;
    save_restaurants();
}

export function shuffle_restaurants() {
    let currentIndex = restaurants.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [restaurants[currentIndex], restaurants[randomIndex]] = [
        restaurants[randomIndex], restaurants[currentIndex]];
    }
    save_restaurants();
}

load_restaurants();