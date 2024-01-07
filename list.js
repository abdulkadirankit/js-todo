// Attach the functionality to delete car to the delete button
const deleteCar = (deleteButton) => {
    const chosenCar = deleteButton.closest("li");
    carList.removeChild(chosenCar);
  };