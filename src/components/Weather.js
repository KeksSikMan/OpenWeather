import * as React from "react";
import axios from "axios";
import { Space, Input, Alert, Spin } from "antd";
import { WeatherCustomCard } from "./WeatherCustomCard";

const { Search } = Input;

const initialState = {
  isLoading: false,
  isLoaded: false,
  weather: [],
  alert: false,
  error: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "WEATHER/LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "WEATHER/LOADED":
      return {
        ...state,
        alert: false,
        error: [],
        isLoading: false,
        isLoaded: true,
        weather: action.payload,
      };
    case "WEATHER/LOADING_FAIL":
    case "WEATHER/ERROR":
      return {
        ...state,
        isLoading: false,
        alert: true,
        error: action.payload,
      };
    case "WEATHER/ALERT_CLOSE":
      return { ...state, alert: false };
    default:
      throw new Error();
  }
};

export const Weather = () => {
  //weather const
  const [state, dispatch] = React.useReducer(reducer, initialState);

  //config
  const URL_POSITION = "https://api.openweathermap.org/data/2.5/weather?"; //lat=61&lon=105
  const URL_CITY = "https://api.openweathermap.org/data/2.5/weather?q=";
  const apiKey = "&appid=4767a8f4b28c4e47ab7a7bca73daf5a9&units=metric";

  //api
  const apiWeatherPosition = (position) => {
    dispatch({ type: "WEATHER/LOADING" });
    axios
      .get(
        `${URL_POSITION}lat=${position.coords.latitude}&lon=${position.coords.longitude}${apiKey}`
      )
      .then((response) => {
        dispatch({ type: "WEATHER/LOADED", payload: response.data });
      })
      .catch(function (error) {
        // handle error
        dispatch({
          type: "WEATHER/LOADING_FAIL",
          payload: error.response.data,
        });
      });
  };
  const apiWeatherCityName = (cityName) => {
    dispatch({ type: "WEATHER/LOADING" });
    axios
      .get(`${URL_CITY}+${cityName}+${apiKey}`)
      .then((response) => {
        dispatch({ type: "WEATHER/LOADED", payload: response.data });
      })
      .catch(function (error) {
        // handle error
        dispatch({
          type: "WEATHER/LOADING_FAIL",
          payload: error.response.data,
        });
      });
  };

  //position use lat&lon
  const success = (position) => {
    apiWeatherPosition(position);
  };
  const error = (error) => {
    console.log(error);
    dispatch({ type: "WEATHER/ERROR", payload: error });
  };
  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  //input action
  const onSearchInput = (cityName) => {
    console.log(`search ${cityName}`);
    apiWeatherCityName(cityName);
  };
  const onBlur = () => {
    console.log("blur");
  };
  const onFocus = () => {
    console.log("focus");
  };

  // alert close
  const handleClose = () => {
    dispatch({ type: "WEATHER/ALERT_CLOSE" });
  };

  //effect lat=61&lon=105
  React.useEffect(() => {
    setTimeout(() => {
      getPosition();
    }, 600);
  }, []);

  return (
    <>
      <Space align="center">
        <Search
          style={{ width: 200 }}
          placeholder="input name city"
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearchInput}
        />
      </Space>
      <Space style={{ paddingBlock: "12px" }} align="center">
        {!state.alert ? null : (
          <>
            <Alert
              message={state.error.message}
              type="warning"
              showIcon
              banner
              closable
              afterClose={handleClose}
            />
          </>
        )}
      </Space>
      <Space>
        <>
          <Spin
            style={{
              paddingTop: "48px",
            }}
            size="large"
            spinning={state.isLoading}
          >
            <WeatherCustomCard
              weather={state.weather}
              isLoaded={state.isLoaded}
            />
          </Spin>
        </>
      </Space>
    </>
  );
};
