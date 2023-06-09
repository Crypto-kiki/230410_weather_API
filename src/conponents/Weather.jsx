import { useState, useEffect } from "react";
import {
  FaSun,
  FaCloudSun,
  FaCloud,
  FaCloudMeatball,
  FaCloudSunRain,
  FaCloudShowersHeavy,
  FaPooStorm,
  FaSnowflake,
  FaSmog,
} from "react-icons/fa";
import axios from "axios";

const weatherIcon = {
  "01": <FaSun size={96} color="white" />,
  "02": <FaCloudSun size={96} color="white" />,
  "03": <FaCloud size={96} color="white" />,
  "04": <FaCloudMeatball size={96} color="white" />,
  "09": <FaCloudSunRain size={96} color="white" />,
  10: <FaCloudShowersHeavy size={96} color="white" />,
  11: <FaPooStorm size={96} color="white" />,
  13: <FaSnowflake size={96} color="white" />,
  50: <FaSmog size={96} color="white" />,
};

function Weather() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  const [weatherInfo, setWeatherInfo] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      () => {
        alert("위치 정보에 동의 해주셔야 합니다.");
      }
    );
  };

  const getWeatherInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      );

      if (response.status !== 200) {
        alert("날씨 정보를 가져오지 못했습니다.");
        return;
      }

      console.log(response.data);
      setWeatherInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (!lat || !lon) return;

    getWeatherInfo();
  }, [lat, lon]);

  useEffect(() => console.log(lat), [lat]);
  useEffect(() => console.log(lon), [lon]);
  useEffect(() => console.log(process.env.REACT_APP_WEATHER_API), []);

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      {weatherInfo ? (
        <div className="flex flex-col justify-center items-center text-white">
          {weatherIcon[weatherInfo.weather[0].icon.substring(0, 2)]}
          <div className="mt-8 text-2xl">
            {weatherInfo.name}, {Math.round(weatherInfo.main.temp * 10) / 10}℃
          </div>
        </div>
      ) : (
        "날씨 정보를 로딩중입니다..."
      )}
    </div>
  );
}

export default Weather;
