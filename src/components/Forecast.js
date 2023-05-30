import React from 'react'
import { iconUrlFromCode } from '../services/weather';

function Forecast({title, items}) {

  console.log("Forecast items component : ", items);

  const forecastItems = items.hourly.map(item => {
    return <div className='flex flex-col items-center justify-center'>
                <p className='font-light text-sm'>{`${item.time}`}</p>
                <img 
                src={iconUrlFromCode(item.icon)} 
                className='w-12 my-1'
                alt=""
                />
                <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
    </div>
  })

  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>{title}</p>

    </div>
        <hr className='my-2'></hr>
        <div className='flex flex-row items-center justify-between text-white'>
            {forecastItems}
        </div>
    </div>
    
    
  )
}

export default Forecast