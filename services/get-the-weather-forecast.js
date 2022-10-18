import { useCallback } from "react";


export default function GetTheWeatherForecast () {

    const request = useCallback( async (url, method = 'GET', body = null, headers = { 'Content-Type': 'text/plain'}) => {
        // setLoading(true);

        try{
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            
            // setLoading(false);
            return data;
        } catch (e) {
            // setLoading(false);
            console.log(e.message);
            throw e
        }

    }, [])

  
    const getWeather = async (lat, lon) => {
        const res = await request(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=5c811b70da212a3f66e65dcfc0a49db7`);
        console.log(JSON.parse(JSON.stringify(res)))
   
        return _transformWeather(JSON.parse(JSON.stringify(res))[0]);
    }
    
    const _transformWeather = (res) => {
        return {
            
        }
    }
    return {getWeather}

}
    
