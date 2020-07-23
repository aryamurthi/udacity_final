function removeTrip() {
  document.getElementById("content").innerHTML = "";
  document.getElementById("maxTemp").innerHTML = "";
  document.getElementById("minTemp").innerHTML = "";
  document.getElementById("placeImage").src = "";
}

export { removeTrip };
