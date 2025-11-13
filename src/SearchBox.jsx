import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import  geolocation  from './geolocation.js'

export default function SearchBox({updateInfo}) {
    let [city , setCity] = useState("");
    let [error , setError] = useState(false);
    const handleChange = (event) => {
        setCity(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false)
        handleGetWeather(city);
        setCity("");
    }

    const GEO_CODE_API = "https://nominatim.openstreetmap.org/search";
    const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const getCordinates = async(city) => {
        if(!city) return ;
        try {
            const res = await fetch(`${GEO_CODE_API}?q=${city}&format=json`);
            const data = await res.json(); 
            let {lat, lon} = data[0];
            return {lat, lon};
        } catch (err) {
            throw err;
        }
    }



    let getWeatherInfo = async(lat, lon, city) => {
        try {
            const res = await fetch(`${WEATHER_API}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
            const jsonRespose = await res.json();
            let time = new Date();
            const result = {
                city : city || jsonRespose.name,
                temp : jsonRespose.main.temp,
                feelsLike : jsonRespose.main.feels_like,
                tempMin : jsonRespose.main.temp_min,
                tempMax : jsonRespose.main.temp_max,
                humidity : jsonRespose.main.humidity,
                visibility : jsonRespose.visibility,
                sunrise : jsonRespose.sys.sunrise,
                sunset : jsonRespose.sys.sunset,
                windSpeed : jsonRespose.wind.speed,
                weatherCondition : jsonRespose.weather[0].description,
                icon : jsonRespose.weather[0].icon,
                time : time.toLocaleString(),
            }
            console.log(jsonRespose)
            return result;
        } catch (err) {
            throw err;
        }
    }

    const handleGetWeather = async(city) => {
        if(!city) return ;
        try {
            let {lat, lon} = await getCordinates(city);
            let result = await getWeatherInfo(lat, lon, city);
            updateInfo(result);
        } catch (err) {
            setError(true);
            console.log(err);
        }
    } 

    useEffect(() => {
        (async () => {
        try {
            const { lat, lon, error } = await geolocation();
            if (!error) {
                let result = await getWeatherInfo(lat, lon);
                updateInfo(result);
            }
        } catch (error) {
            console.log("Auto location fetch failed:", error);
        }
        })();
    }, []);
    

    return(
        <div className='SearchBox'>
            <form action="" onSubmit={handleSubmit}>
                <TextField id="city" label="Country or City Name" variant="outlined" required value={city} onChange={handleChange}/>
                <br /><br /><br />
                <Button variant="contained" endIcon={<SearchIcon />} type='submit'>
                    Search
                </Button>
            </form>
            {error && <p style={{color : "red"}}>No Such Place Exist!</p>}
        </div>
    )
}