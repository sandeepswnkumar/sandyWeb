




let timeData = document.getElementById("timeData");
const dayTime = () => {
    let date = new Date();

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let monthName = months[date.getMonth()];


    const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    let dayName = "";
    if (date.getDay() === 0) {
        dayName = week[(date.getDay() + week.length) - 1];
    }
    else {
        dayName = week[date.getDay() - 1];
    }

    let dateNum = date.getDate();

    let hr = date.getHours();
    let min = date.getMinutes();
    let Period = "AM";
    if (hr > 11) {
        Period = "PM"
        if (hr > 12) {
            hr = hr - 12;
            if (hr < 10) {
                hr = '0' + hr;
            }
        }
    }
    if(hr==0){
        hr = 12;
    }
    if (min < 10) {
        min = '0' + min;
    }

    let time = `${dayName.toUpperCase()} | ${monthName.toUpperCase()} ${dateNum} | ${hr}:${min} ${Period}`;

    return time;
}



setInterval(() => {
    timeData.innerHTML = dayTime();
}, 1000);














const sBtn = document.getElementById('sBtn');
const weather = document.querySelector(".weather");

let weatherStatus = document.getElementById("weatherStatus")

const spinner = document.getElementById("spinner");



let inputData = document.getElementById('inputData');
inputData.focus();

let cityName = document.getElementById("cityName")
let countryName = document.getElementById("countryName")
let minTemp = document.getElementById("minTemp")
let maxTemp = document.getElementById("maxTemp")
let tempData = document.getElementById('temp');


let errorMsz = document.getElementById('errorMsz');

spinner.setAttribute('hidden', '');
errorMsz.style.display = "none";

if (inputData.value === "") {
    weather.style.display = "none";
    errorMsz.style.display = "none";

}




const getData = async () => {


    if (inputData.value === "") {
        alert("Enter City Name");
    }
    else {


        try {
            let inputVal = inputData.value;
            // console.log(inputData.value);
            // console.log(inputVal);
            weather.style.display = "none";
            spinner.removeAttribute('hidden');
            errorMsz.style.display = "none";
            const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=8191933a140a7324702d81894e01c4cd`
            // console.log("after link" + inputData.value);
            const apiData = await fetch(api).then(response => response.json())
                .then(data => {
                    spinner.setAttribute('hidden', '');

                    const arrData = [data];
                    // console.log(arrData)
                    // if (arrData[0].message === "city not found") {
                    //     errorMsz.style.display = "flex";
                    //     weather.style.display = "none";
                    // }

                    if (arrData[0].weather[0].main === "Clouds") {
                        weatherStatus.innerHTML = '<i class="bi bi-clouds-fill"></i>';
                    } else if (arrData[0].weather[0].main === "Rain") {
                        weatherStatus.innerHTML = '<i class="bi bi-cloud-rain-fill"></i>';
                    } else {
                        weatherStatus.innerHTML = '<i class="bi bi-sun-fill"></i>';
                    }

                    cityName.innerHTML = `${arrData[0].name}`
                    countryName.innerHTML = `${arrData[0].sys.country}`
                    minTemp.innerHTML = `${arrData[0].main.temp_min}`
                    maxTemp.innerHTML = `${arrData[0].main.temp_max}`
                    tempData.innerHTML = `${arrData[0].main.temp}`
                    weather.style.display = "flex";


                    // console.log(data)

                });

            // // console.log(apiData)
            // const jsonData = await apiData.json();
            // // console.log(jsonData)


        } catch (error) {
            weather.style.display = "none";
            errorMsz.style.display = "flex";
            // alert("Enter valid City Name");
        }

    }
    inputData.value = "";
}

sBtn.addEventListener('click', getData)

inputData.addEventListener('keypress', (event) => {
    // console.log(event.key)
    if (event.key === 'Enter') {
        event.preventDefault();
        // console.log("somem")
        getData();
        // console.log(dayTime());
    }
});

