import './App.css';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons.js';
import Forecast from './components/Forecast.js';
import getWeatherData from './services/weather';

function App() {

  const fetchWeather = async() => {
    const data = await getWeatherData("weather", {q:"london"});
    console.log(data);
  }

  // fetchWeather();

  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400'>
    <TopButtons/>
    <Inputs/>
    
    <TimeAndLocation/>
    <TemperatureAndDetails/>
    <Forecast title="hourly Forecast"/>
    <Forecast title="daily Forecast"/>
    </div>
    
  );
}

export default App;
