const listMain = document.querySelector("#main-list");
const listWarning = document.querySelector(".list-warning");
const checkBoxElements = document.querySelectorAll(".checkbox");
const totalBox = document.querySelector(".total");
const filteredBox = document.querySelector(".filtered");
const searchBox = document.querySelector(".search-element");
const clearButton = document.querySelector(".clear");

let cars = [];
let filteredCars = [];

let tempData = localStorage.getItem("carList");
if (tempData) {
  cars = JSON.parse(tempData);
  filteredCars = cars;
}

let allCategories = ["auto", "suv"];
// Add car section
const createCarSection = (car) => {
  /* Sample of Car Card */
  // <section class="sec-col">
  //   <div>
  //     <div class="card-details">
  //       <span>
  //         <b>Ford Ranger</b>
  //       </span>
  //       <span class="year-span">
  //         <b>2021</b>
  //       </span>
  //     </div>
  //   </div>
  //   <p class="card-p">suv</p>
  //   <button class="removeButton" id="2">
  //     X
  //   </button>
  // </section>

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
  span2.setAttribute("class", "year-span");
  const bold2 = document.createElement("b");
  bold2.appendChild(document.createTextNode(car.year));
  span2.appendChild(bold2);
  div2.appendChild(span1);
  div2.appendChild(span2);
  div1.appendChild(div2);
  const pElement = document.createElement("p");
  const buttonElement = document.createElement("button");
  if (car.category === "suv") {
    buttonElement.setAttribute("class", "removeButton suv");
  } else {
    buttonElement.setAttribute("class", "removeButton");
  }
  buttonElement.setAttribute("id", car.id);
  buttonElement.appendChild(document.createTextNode("X"));
  buttonElement.addEventListener("click", (e) => removeButton(e));
  pElement.setAttribute("class", "card-p");
  pElement.appendChild(document.createTextNode(car.category));
  sectionElement.appendChild(div1);
  sectionElement.appendChild(pElement);
  sectionElement.appendChild(buttonElement);
  listMain.appendChild(sectionElement);
};

// Check that the clicked element has the class "removeButton" or not
function removeButton(e) {
  if (e.target.classList.contains("removeButton")) {
    // Delete Html element
    const closestElement = e.target.closest(".sec-col");
    if (closestElement) {
      closestElement.remove();
      cars = cars.filter((item) => item.id !== Number(e.target.id));
      localStorage.setItem("carList", JSON.stringify(cars));
      totalBox.innerHTML = "Total : " + "<b>" + cars.length + "</b>";
      filteredCars = cars.filter((car) => allCategories.includes(car.category));
      filteredBox.innerHTML =
        "Showed : " + "<b>" + filteredCars.length + "</b>";
    }
    if (cars.length === 0) {
      totalBox.innerHTML = "";
      filteredBox.innerHTML = "";
      listWarning.textContent = "Please add a new car!";
    }
  }
}

// List all cars
if (cars.length) {
  for (let index = 0; index < cars.length; index++) {
    createCarSection(cars[index]);
  }
  listWarning.textContent = "";

  // Add filtered/total count with label
  totalBox.innerHTML =
    "Total &nbsp;&nbsp;&nbsp;&nbsp; : " + "<b>" + cars.length + "</b>";
  filteredBox.innerHTML = "Showed : " + "<b>" + cars.length + "</b>";
} else {
  listWarning.textContent = "Please add a new car!";
}

// Filter checked category
[...checkBoxElements].forEach((item) => {
  item.addEventListener("change", (e) => {
    // Clear Html
    listMain.innerHTML = "";

    // if checked add category to allCategories array
    if (e.target.checked) {
      if (!allCategories.includes(e.target.name)) {
        allCategories = [...allCategories, e.target.name];
      }
    } else {
      // if not checked, delete category from allCategories array
      allCategories = allCategories.filter(
        (category) => category !== e.target.name
      );
    }

    // Filter car data as a allCategories array
    filteredCars = cars.filter((car) => allCategories.includes(car.category));

    // Send data to html
    filteredCars.map((fCar) => createCarSection(fCar));

    filteredBox.innerHTML = "Showed : " + "<b>" + filteredCars.length + "</b>";
    searchBox.value = "";
  });
});

// Filter by search
searchBox.addEventListener("input", (e) => {
  filteredCars = cars.filter((car) => allCategories.includes(car.category));
  filteredCars = filteredCars.filter((car) =>
    car.name.toLowerCase().includes(e.target.value.toLowerCase())
  );

  listMain.innerHTML = "";
  filteredCars.map((fCar) => createCarSection(fCar));

  // Add filtered count with label
  filteredBox.innerHTML = "Showed : " + "<b>" + filteredCars.length + "</b>";
});

// Clear all data
clearButton.addEventListener("click", () => {
  localStorage.removeItem("carList");
  cars = [];
  filteredCars = [];
  listMain.innerHTML = "";
  totalBox.innerHTML = "";
  filteredBox.innerHTML = "";
  listWarning.textContent = "Please add a new car!";
});
