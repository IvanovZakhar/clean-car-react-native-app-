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

  
    const getWeather = async () => {
        const res = await request(`https://api.openweathermap.org/data/2.5/weather?lat=59.9010&lon=30.3653&appid=1086a0d515e8591184f3ebfc4b4cd1df`);
       console.log(res);
        // return _transformWeather(res.data.results[0]);
    }
    
    // const _transformWeather = () => {
    //     return {
                
    //     }
    // }
    return {getWeather}

}
    
