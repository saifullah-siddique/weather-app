import { useState } from 'react';
import InfoBox from './InfoBox';
import SearchBox from './SearchBox';



export default function WeatherApp() {
    let [weatherInfo , setWeatherInfo] = useState({
        city: "New Delhi",
        temp: 24.36,
        feelsLike : 23.19,
        tempMin : 24.36,
        tempMax : 24.36,
        humidity : 13,
        visibility : 10000,
        sunrise : 1762909884,
        sunset : 1762948754,
        windSpeed : 2.11,
        weatherCondition : "clear sky",
        icon : "10d",
        time : "12/11/2025, 20:52:58"
    });

    let updateInfo = (result) => {
        setWeatherInfo(result);
    }


    return(
        <div>
            <h3></h3>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}