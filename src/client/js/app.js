/* Global Variables */

// Create a new date instance dynamically with JS

// document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {

  let projectData = {
    maxTemp: "",
    minTemp: "",
    country: "",
    imgsrc: "",
  };
  //user Input uri encoded
  const placeName = document.getElementById("placeName").value;
  

  //geonames API credentials
  const username = "&maxRows=1&username=aryamurthi";
  const baseURL = "http://api.geonames.org/searchJSON?q=";

  //weatherbit API credentials
  const key = "?key=7793bf027d9f49598f122a2e083eea1a";
  const weatherbitBaseURL = "http://api.weatherbit.io/v2.0/history/daily";
  const units = "&units=I";

  //pixabay API credentials
  const pixabayKey = "17620322-dfd21a8aec1d46cd6edfb31f2";
  const pixabayBaseURL = "https://pixabay.com/api/?key=";
  const encodedQueryTerm = encodeURI(placeName);
  const query = `&q=${encodedQueryTerm}`;

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
        `&lat=${response.geonames[0].lat}` +
        `&lon=${response.geonames[0].lng}` +
        start_date +
        end_date +
        units
    ).then(async (output) => {
      try {
        await getPicture(pixabayBaseURL + pixabayKey + query).then(
          async (result) => {
            await postData("http://localhost:8080/addUserEntry", {
              maxTemp: output.data[0].max_temp,
              minTemp: output.data[0].min_temp,
              country: response.geonames[0].countryName,
              imgsrc: result.hits[0].webformatURL,
            });
            updateUI(placeName, countdown);
            updateProjectData(projectData);
          }
        );
      } catch {
        await postData("http://localhost:8080/addUserEntry", {
          maxTemp: output.data[0].max_temp,
          minTemp: output.data[0].min_temp,
          country: response.geonames[0].countryName,
          imgsr: projectData.imgsrc,
        });
      }
      updateUI(placeName, countdown);
      updateProjectData(projectData);
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
    document.getElementById("placeImage").src = allData.imgsrc;
  } catch (error) {
    console.log("error", error);
  }
};

const updateProjectData = async (projectData) => {
  const request = await fetch("http://localhost:8080/all");
  try {
    const allData = await request.json();
    projectData.maxTemp = allData.max_temp;
    projectData.minTemp = allData.min_temp;
    projectData.country = allData.country;
    projectData.imgsrc = allData.imgsrc;
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
    return output;
  } catch (error) {
    console.log("error", error);
  }
};

const getPicture = async (url) => {
  const res = await fetch(url);
  try {
    const result = await res.json();
    console.log(result);
    return result;
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
