import { edit_restaurants } from "./utils.js";

//function to retrieve user location data from browser
async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject('Geolocation is not supported by this browser.');
    }
  });
}

//function to retrieve restaurants from yelp API
async function getYelpData(params) {

  try {
    const response = await fetch("http://127.0.0.1:5001/api/data", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }); //end fetch

    return response.json();
  }
  catch (error) {
    console.log("Error!");
  }
}

document.getElementById('user-input').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  // Validate form input
  const formData = new FormData(event.target);
  const numRestaurants = parseInt(formData.get('num-restaurants'), 10);
  const numMiles = parseFloat(formData.get('num-miles'));

  if (isNaN(numRestaurants) || isNaN(numMiles) || numRestaurants <= 0 || numMiles <= 0 || 
      (!formData.has('cost-1') && !formData.has('cost-2') && !formData.has('cost-3') && !formData.has('cost-4'))) {
      alert("Please fill out all required fields with valid input.");
      return;
  }

  let location;
  try {
      location = await getLocation();
  } catch (error) {
      console.error("Failed to retrieve location:", error);
      alert("Unable to retrieve location. Please enable location services and try again.");
      return;
  }

  const prices = [];
  for (let i = 1; i <= 4; i++) {
      if (formData.has(`cost-${i}`)) {
          prices.push(formData.get(`cost-${i}`));
      }
  }

  const METERS_IN_MILE = 1609;
  let radius = numMiles * METERS_IN_MILE;
  if (radius > 40000) {
    radius = 40000;
  }
  const params = {
      term: 'restaurants',
      latitude: 32.863182, //location.latitude,
      longitude: -96.927477, //location.longitude,
      radius: radius,
      limit: numRestaurants,
      open_now: true,
      price: prices.join(','),
  };

  try {
      const new_restaurants = await getYelpData(params);
      
      //console.log(new_restaurants);
      
      if (!new_restaurants || new_restaurants.length === 0) {
          alert("No restaurants found. Please adjust your search criteria and try again.");
          return;
      }
      console.log(new_restaurants);

      // Save restaurants to sessionStorage
      sessionStorage.setItem("restaurants", JSON.stringify(new_restaurants));
      //edit_restaurants(new_restaurants);
      console.log(window.sessionStorage.getItem("restaurants"));

      // Switch pages
      window.location.href = "thisthat.html";
  } catch (error) {
      console.error("Error during form submission:", error);
  }
});
