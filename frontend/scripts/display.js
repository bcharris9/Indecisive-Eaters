var finalRestaurant = JSON.parse(sessionStorage.getItem("finalRestaurant"));


document.getElementById("final-restaurant-name").innerText = finalRestaurant["name"];
document.getElementById("final-image-link").href = finalRestaurant["url"];
document.getElementById("final-image").src = finalRestaurant["image_url"];

console.log(finalRestaurant);