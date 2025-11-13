import './InfoBox.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function InfoBox({info}) {
    let bgUrl = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIV4AP_up7c782PWm4PGbU--A-TwU61Ks9Q&s`
    let iconUrl =  `https://openweathermap.org/img/wn/${info.icon}@2x.png`;
    return (
        <div className="InfoBox">
            <br />
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={bgUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {info.city}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <p>Temprature : {info.temp}&deg;C</p>
                        <p><img src={iconUrl}/></p>
                        <p>Humidity : {info.humidity}%</p>
                        <p>Wind Speed : {info.windSpeed}m/s</p>
                        <p>Visibility : {info.visibility} km</p>
                         <p>The Weather is Described as {info.weatherCondition} and Feelslike : {info.feelsLike}&deg;C</p>
                        <p>Sunrise : {info.sunrise} || Sunset : {info.sunset}</p>
                        <p>Last Update : {info.time}</p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}