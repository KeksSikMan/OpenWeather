import * as React from "react";
import { Typography, Space, Card } from "antd";

const { Title } = Typography;

export const WeatherCustomCard = (props) => {
  //const
  const weather = props.weather;
  const isLoaded = props.isLoaded;
  const pressure = (hpa = 1) => {
    return Math.round(hpa / 1.333);
  };

  return !isLoaded ? null : (
    <>
      <div>
        <Card
          title={props.cityName}
          bordered={false}
          style={{
            padding: "48px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            borderRadius: "8px",
            minWidth: "228px",
            margin: "18px 4px",
          }}
        >
          <Space direction="vertical" align="center">
            <Title level={2}>{weather.name}</Title>
            <img
              src={
                "http://openweathermap.org/img/w/" +
                weather.weather[0].icon +
                ".png"
              }
              alt={weather.weather.description}
            />

            <Title level={5}> {weather.main.temp} C°</Title>
            {/* <Title level={5}>{weatherData.main.temp_max} C°</Title>
            <Title level={5}>{weatherData.main.temp_min} C°</Title> */}
            <Title level={5}>{weather.wind.speed} m/s</Title>
            <Title level={5}>{weather.main.humidity} %</Title>
            <Title level={5}>
              {weather.main.pressure} hpa ({pressure(weather.main.pressure)}
              mmHg)
            </Title>
          </Space>
        </Card>
      </div>
    </>
  );
};
