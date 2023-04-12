import { useEffect, useState } from 'react'
import WeatherForm from './weatherForm';
import WeatherMainInfo from './weatherMainInfo';
import styles from '../cssComponents/weatherApp.module.css'
import Loading from './loading';

export default function WeatherApp() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        loadInfo('Bogotá')
    }, [])

    useEffect(() => {
        document.title = `Weather | ${weather?.location.name ?? ''}`
    }, [])



    async function loadInfo(city = 'Manizales') {
        try {
            const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`)
            const json = await request.json()
            setTimeout(() => {
                console.log(json)
                setWeather(json)
            }, 1000)
        } catch (error) {
            console.error(error)
        }
    }


    function handleChangeCity(newCity) {
        setWeather(null)
        loadInfo(newCity)
    }

    return (<div className={styles.weatherContainer}>
        <WeatherForm onChangeCity={handleChangeCity} />
        {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}

    </div>)
}