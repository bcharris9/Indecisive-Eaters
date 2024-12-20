let restaurants = JSON.parse(localStorage.getItem("restaurant")) || [];

export function save_restaurants() {
    localStorage.setItem("restaurant", JSON.stringify(new_restaurants));
}

export function load_restaurants() {
    restaurants = JSON.parse(localStorage.getItem("restaurant")) || [];
}

export { restaurants };
