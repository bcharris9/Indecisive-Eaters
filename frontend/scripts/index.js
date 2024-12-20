//import { restaurants, save_restaurants } from "./utils.js";
let restaurants = []

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

async function getYelpData(params) {

  try {
    const response = await fetch("http://127.0.0.1:5001/api/data", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })

    return response.json();
  }
  catch (error) {
    console.log("Error!");
  }
}

//Event listener on form submission button
document.getElementById('user-input').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  //validate form input
  const formData = new FormData(event.target);

  if (!formData.has('num-restaurants') || !formData.has('num-miles') || (
    !formData.has('cost-1') && !formData.has('cost-2') && !formData.has('cost-3') && !formData.has('cost-4')
  )) {
    console.log("Error");
  }
  else {
    const location = await getLocation();

    let prices = []
    for (let i = 1; i <= 4; i++) {
      if (formData.has(`cost-${i}`)) {
        prices.push(formData.get(`cost-${i}`))
      }
    }

    params = {
      term: 'restaurants',
      latitude: location.latitude, 
      longitude: location.longitude,
      radius: (formData.get('num-miles')*1609),
      limit: formData.get('num-restaurants'), //calc meters in mile
      open_now: true,
      price: prices
    }

    restaurants = await getYelpData(params);
    //save_restaurants(restaurants);
    
    console.log(restaurants);
    //window.location.href="thisthat.html";
  }
});