const listMain = document.querySelector("#main-list");
const listWarning = document.querySelector("list-warning");

// Add car section
const createCarSection = (car) => {
  const sectionElement = document.createElement("section");
  sectionElement.setAttribute("class", "sec-col");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  div2.setAttribute("class", "card-details");
  const span1 = document.createElement("span");
  const bold1 = document.createElement("b");
  bold1.appendChild(document.createTextNode(car.name));
  span1.appendChild(bold1);

  const span2 = document.createElement("span");
  span2.setAttribute("class", "model-span");
  const bold2 = document.createElement("b");
  bold2.appendChild(document.createTextNode(car.year));
  span2.appendChild(bold2);
  div2.appendChild(span1);
  div2.appendChild(span2);
  div1.appendChild(div2);
  const pElement = document.createElement("p");
  pElement.setAttribute("class", "card-p");
  pElement.appendChild(document.createTextNode(car.category));
  sectionElement.appendChild(div1);
  sectionElement.appendChild(pElement);
  listMain.appendChild(sectionElement);
};

// List all cars
const tempLocalData = localStorage.getItem("carList");
console.log(tempLocalData);

if (tempLocalData) {
  const cars = JSON.parse(tempLocalData);
  for (let index = 0; index < cars.length; index++) {
    createCarSection(cars[index]);
  }
  listWarning.textContent = "";
} else {
  listWarning.textContent = "Please add a new car!";
}
debugger;

// Attach the functionality to delete car to the delete button
// const deleteCar = (deleteButton) => {
//     const chosenCar = deleteButton.closest("li");
//     carList.removeChild(chosenCar);
//   };
