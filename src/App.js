import './App.css';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons.js';
import Forecast from './components/Forecast.js';
import getFormattedWeatherData from './services/weather';
import { useEffect, useState } from 'react';

function App() {

  const [query, setQuery] = useState({q:"Boston"});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect( () => {
    const fetchWeather = async() => {
      await getFormattedWeatherData({ ...query, units }).then((data) =>
        setWeather(data)
      );
    }
  
    fetchWeather();
  },[query, units]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700';
    const threshold= units === 'metric' ? 20: 60;

    console.log("weather.temp : ", weather.temp)
    if(weather.formattedCurrentWeather.temp <= threshold) {
      return 'from-cyan-700 to-blue-700'
    } else {
      return 'from-yellow-700 to-orange-700'
    }
  }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
    <TopButtons setQuery={setQuery}/>
    <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
    
    {weather && (
      <div>
        <TimeAndLocation weather={weather}/>
        <TemperatureAndDetails weather={weather}/>
        <Forecast title="hourly forecast" items={weather.formattedForecastWeather}/>
        {/* <Forecast title="daily forecast" items={weather.formattedForecastWeather}/> */}
      </div>
    )}
    </div>
    
  );
}

export default App;
