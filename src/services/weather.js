const API_KEY = "73f0b8424e6938c17674d49df3ef029d";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})
    console.log("url :", url);
    return fetch(url).then((res) => res.json()).then(data => data);
}   


export default getWeatherData;

// Mumbai 

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


