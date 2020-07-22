/* Global Variables */

// Create a new date instance dynamically with JS

// document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
  const apiKey = "&appid=5d440dcd25ae78fd3e21200458636bba&units=imperial";
  const countryCode = ",us";
  let d = new Date();
  let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getWeather(baseURL + zip + countryCode + apiKey).then(function (data) {
    postData("http://localhost:8080/addUserEntry", {
      feelings: feelings,
      temp: data.main.temp,
      date: newDate,
    }).then(async () => {
      updateUI();
    });
  });
}

const updateUI = async () => {
  const request = await fetch("http://localhost:8080/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML =
      allData[allData.length - 1].date;
    document.getElementById("temp").innerHTML =
      allData[allData.length - 1].temp;
    document.getElementById("content").innerHTML =
      allData[allData.length - 1].feelings;
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
