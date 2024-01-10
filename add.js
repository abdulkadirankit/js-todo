const carName = document.querySelector(".car_name");
const carYear = document.querySelector(".car_year");
const carCategory = document.querySelector(".car_category");
const carSubmit = document.querySelector(".car_submit");
const carWarning = document.querySelector(".car_warning");
const carRandom = document.querySelector(".car_random");

// Create a new car
const addCar = (car) => {
  let tempLocalData = localStorage.getItem("carList");
  if (tempLocalData) {
    tempLocalData = JSON.parse(tempLocalData);
    car.id = new Date().getUTCMilliseconds();
    tempLocalData = [...tempLocalData, car];
    localStorage.setItem("carList", JSON.stringify(tempLocalData));
  } else {
    car.id = 0;
    localStorage.setItem("carList", JSON.stringify([car]));
  }
  carWarning.textContent = car.name + " saved.";
};

// Click add car and trigger an event
carSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const car = {
    name: carName.value,
    year: carYear.value,
    category: carCategory.value,
  };
  addCar(car);
  carName.value = "";
  carYear.value = null;
  carCategory.value = "auto";
});

// Random car Array
const randomCars = [
  { name: "Ford Focus", year: 2011, category: "auto" },
  { name: "Volvo XC90", year: 2012, category: "suv" },
  { name: "Audi Q5", year: 2013, category: "suv" },
  { name: "Seat Leon", year: 2014, category: "auto" },
  { name: "Hyundai Accent", year: 2015, category: "auto" },
  { name: "Honda Civic", year: 2016, category: "auto" },
  { name: "Citroen C4", year: 2011, category: "auto" },
  { name: "Citroen C2", year: 2009, category: "auto" },
  { name: "Ford CMAX", year: 2023, category: "suv" },
  { name: "Ford Fiesta", year: 2024, category: "auto" },
  { name: "Ford Ranger", year: 2021, category: "suv" },
];

// Random find a car
const getRandomCarFromArray = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const randomCar = (car) => {
  let tempLocalData = localStorage.getItem("carList");
  if (tempLocalData) {
    tempLocalData = JSON.parse(tempLocalData);
    tempLocalData = [...tempLocalData, car];
    localStorage.setItem("carList", JSON.stringify(tempLocalData));
  } else {
    localStorage.setItem("carList", JSON.stringify([car]));
  }
  carWarning.textContent = car.name + " saved.";
};

// Click add random car and trigger an event
carRandom.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedCar = getRandomCarFromArray(randomCars);
  addCar(selectedCar);
});

// Hover mouse event
carRandom.addEventListener("mouseover", (e) => {
  carWarning.textContent = "Car will be add as a randomly.";
});
carRandom.addEventListener("mouseout", (e) => {
  carWarning.textContent = "";
});
