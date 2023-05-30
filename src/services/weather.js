import { DateTime } from "luxon";
import { API_KEY, API_KEY } from "../../config";

const apiKey = API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:apiKey})
    console.log("url :", url);
    return fetch(url).then((res) => res.json()).then(data => data);
}   

const formatCurrentWeather = (data) => {
  console.log(" formatCurrentWeather data : ", data);
  const {
    coord: {lat, lon},
    main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
    name,
    dt,
    timezone,
    weather,
    wind: {speed},
    sys: {country, sunrise, sunset}
  } = data;

  const {main: details, icon} = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    name,
    dt,
    timezone,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
}


const formatForecastWeather = (data) => {

  console.log("data : ", data);

  let {city: {name, timezone, sunrise, sunset},list} = data;

  let hourly = list.slice(0,5).map(d => {
    return {
      // time: DateTime.fromSeconds(d.dt).toFormat("hh:mm a"),
      time: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      timezone: timezone,
      temp: d.main.temp,
      temp_min: d.main.temp_min,
      temp_max:d.main.temp_max,
      icon: d.weather[0].icon
    }
  })

  return {name, timezone, sunrise, sunset, hourly};

  // daily = daily.slice(1,6).map(d => {
  //   return {
  //     title: formatToLocalTime(d.dt, timezone, 'ccc'),
  //     temp: d.temp.day,
  //     icon: d.weather[0].icon
  //   }
  // })
  // return {timezone, daily, hourly};
}

const formatZone = (zone) => {
  zone = zone.toString();

  let sign = zone[0] === "-" ? "-" : "+";

  let d = sign === "-" ? zone.slice(1) : zone;

  let hours = d/3600;

  return `UTC${sign}${hours}`;

}

const formatToLocalTime = (secs, zone, format="cccc dd, LLL, yyyy' | Local time: 'hh:mm a'") => {
  
  zone = formatZone(zone);

  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
}

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const {lat, lon} = formattedCurrentWeather;

  console.log("formattedCurrentWeather : ", formattedCurrentWeather)

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    exclude: "current, minutely, alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return {formattedCurrentWeather, formattedForecastWeather};
}

const iconUrlFromCode = (code) => {
  return `http://openweathermap.org/img/wn/${code}@2x.png`;
}

export default getFormattedWeatherData;

export {iconUrlFromCode, formatToLocalTime};

// Mumbai 
// weather api
/**{
    "coord": {
      "lon": 72.8479,
      "lat": 19.0144
    },
    "weather": [
      {
        "id": 721,
        "main": "Haze",
        "description": "haze",
        "icon": "50d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 303.14,
      "feels_like": 309.16,
      "temp_min": 303.09,
      "temp_max": 303.14,
      "pressure": 1010,
      "humidity": 74
    },
    "visibility": 3500,
    "wind": {
      "speed": 2.57,
      "deg": 300
    },
    "clouds": {
      "all": 20
    },
    "dt": 1684635928,
    "sys": {
      "type": 1,
      "id": 9052,
      "country": "IN",
      "sunrise": 1684629155,
      "sunset": 1684676282
    },
    "timezone": 19800,
    "id": 1275339,
    "name": "Mumbai",
    "cod": 200
  }

  Boston
// weather api 
  {
  "coord": {
    "lon": -71.0598,
    "lat": 42.3584
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 291.57,
    "feels_like": 291.84,
    "temp_min": 289.23,
    "temp_max": 293.21,
    "pressure": 1012,
    "humidity": 91
  },
  "visibility": 3219,
  "wind": {
    "speed": 6.17,
    "deg": 180
  },
  "rain": {
    "1h": 1.3
  },
  "clouds": {
    "all": 100
  },
  "dt": 1684635935,
  "sys": {
    "type": 2,
    "id": 2013408,
    "country": "US",
    "sunrise": 1684574308,
    "sunset": 1684627399
  },
  "timezone": -14400,
  "id": 4930956,
  "name": "Boston",
  "cod": 200
} 
{
  "coord": {
    "lon": -0.1257,
    "lat": 51.5085
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 281.89,
    "feels_like": 281.32,
    "temp_min": 280.5,
    "temp_max": 283.02,
    "pressure": 1022,
    "humidity": 83
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.54,
    "deg": 360
  },
  "clouds": {
    "all": 0
  },
  "dt": 1684636122,
  "sys": {
    "type": 2,
    "id": 2075535,
    "country": "GB",
    "sunrise": 1684641661,
    "sunset": 1684698805
  },
  "timezone": 3600,
  "id": 2643743,
  "name": "London",
  "cod": 200
}


*/


