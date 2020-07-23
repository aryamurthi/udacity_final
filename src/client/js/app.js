/* Global Variables */
let projectData = {
  maxTemp: "",
  minTemp: "",
  country: "",
};
// Create a new date instance dynamically with JS

// document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  //geonames API credentials
  const username = "&maxRows=10&username=aryamurthi";
  const placeName = document.getElementById("zip").value;
  const baseURL = "http://api.geonames.org/postalCodeSearchJSON?placename=";

  //weatherbit API credentials
  const key = "?key=7793bf027d9f49598f122a2e083eea1a";
  const weatherbitBaseURL = "http://api.weatherbit.io/v2.0/history/daily";
  const units = "&units=I";

  //date
  let departDate = new Date(document.getElementById("my_date_picker").value);
  let d = new Date();
  let newDate = new Date(
    d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()
  );
  let countdown = Math.trunc(
    (departDate.getTime() - newDate.getTime()) / (1000 * 3600 * 24)
  );

  let a = new Date(departDate);
  let nextDay = new Date(a.setDate(a.getDate() + 1));

  let date_start =
    2019 + "-" + (departDate.getMonth() + 1) + "-" + departDate.getDate();

  let date_end =
    2019 + "-" + (nextDay.getMonth() + 1) + "-" + nextDay.getDate();

  //formatted start and end date for weatherbitAPI
  let start_date = `&start_date=${date_start}`;
  let end_date = `&end_date=${date_end}`;

  //get long and lat for placeName

  getPlaceName(baseURL + placeName + username).then(async (response) => {
    await getWeather(
      weatherbitBaseURL +
        key +
        `&lat=${response.postalCodes[0].lat}` +
        `&lon=${response.postalCodes[0].lng}` +
        start_date +
        end_date +
        units
    ).then(async (output) => {
      await postData("http://localhost:8080/addUserEntry", {
        maxTemp: output.data[0].max_temp,
        minTemp: output.data[0].min_temp,
        country: response.postalCodes[0].adminName1,
      });
      updateUI(placeName, countdown);
      updateProjectData(output, response);
    });
  });
}

const updateUI = async (placeName, countdown) => {
  const request = await fetch("http://localhost:8080/all");
  try {
    const allData = await request.json();
    document.getElementById("maxTemp").innerHTML =
      "Max Temp: " + allData.maxTemp + " Fahrenheit";
    document.getElementById("minTemp").innerHTML =
      "Min Temp: " + allData.minTemp + " Fahrenheit";
    document.getElementById("content").innerHTML =
      placeName +
      ", " +
      allData.country +
      ": " +
      countdown +
      " days until departure. Typical temperatures for the same time last year: ";
  } catch (error) {
    console.log("error", error);
  }
};

const updateProjectData = async () => {
  const request = await fetch("http://localhost:8080/all");
  try {
    const allData = await request.json();
    projectData.maxTemp = allData.max_temp;
    projectData.minTemp = allData.min_temp;
    projectData.country = allData.country;
  } catch (error) {
    console.log("error", error);
  }
};

const getPlaceName = async (url) => {
  const res = await fetch(url);
  try {
    const response = await res.json();
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

const getWeather = async (url) => {
  const res = await fetch(url);
  try {
    const output = await res.json();
    console.log(output);
    return output;
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
