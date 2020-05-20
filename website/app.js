/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=5d440dcd25ae78fd3e21200458636bba";
const countryCode = ",us";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getWeather(baseURL + zip + countryCode + apiKey).then(function (data) {
    postData("/addUserEntry", {
      feelings: feelings,
      temp: data.main.temp,
      date: newDate,
    }).then(updateUI());
  });
}

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData[allData.length-1].date;
    document.getElementById("temp").innerHTML = ((allData[allData.length-1].temp -273.15) * (9/5) +32).toFixed(2) + ' Degrees Fahrenheit';
    document.getElementById("content").innerHTML = allData[allData.length-1].feelings;
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
