/* Global Variables */

// Create a new date instance dynamically with JS

// document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const username = "&maxRows=10&username=aryamurthi";
  const placeName = document.getElementById("zip").value;
  const baseURL = "http://api.geonames.org/postalCodeSearchJSON?placename=";

  let departDate = new Date(document.getElementById("my_date_picker").value);
  let d = new Date();
  let newDate = new Date(
    d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()
  );
  let countdown =
    (departDate.getTime() - newDate.getTime()) / (1000 * 3600 * 24);

  getWeather(baseURL + placeName + username).then(function (data) {
    postData("http://localhost:8080/addUserEntry", {
      longitude: data.postalCodes[0].lng,
      latitude: data.postalCodes[0].lat,
      country: data.postalCodes[0].adminName1,
      countdown: countdown
    }).then(async () => {
      updateUI(placeName, countdown);
    });
  });
}

const updateUI = async (placeName, countdown) => {
  const request = await fetch("http://localhost:8080/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML =
      "Longitude: " + allData[allData.length - 1].longitude;
    document.getElementById("temp").innerHTML =
      "Latitude: " + allData[allData.length - 1].latitude;
    document.getElementById("content").innerHTML =
      placeName +
      ", " +
      allData[allData.length - 1].country +
      ": " +
      countdown +
      " days until depart";
  } catch (error) {
    console.log("error", error);
  }
};

const getWeather = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//Boilerplate POST documentation
const postData = async (url = " ", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

export { performAction };
