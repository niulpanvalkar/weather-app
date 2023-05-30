import React from 'react';
import { formatToLocalTime } from '../services/weather';

function TimeAndLocation({weather: {formattedCurrentWeather:{name, country, timezone, dt}}}) {

  const localTime = formatToLocalTime(dt, timezone)

  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
                {`${localTime}`}
            </p>
        </div>
        <div className='flex items-center justify-center my-3'> 
          <p className='text-white text-3xl font-medium'>
            {`${name},${country}`}
          </p>
        </div>
    </div>
  )
}

export default TimeAndLocation;