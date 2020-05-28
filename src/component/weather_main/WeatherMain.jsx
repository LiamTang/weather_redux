import React, { Component } from "react";
import "../../style/WeatherMain.scss";
import { connect } from "react-redux";

import { Cloudy, Day, Rainy, Snowy, Thunder } from "../../weatherIcon";

class WeatherMain extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }
  render() {
    const { weatherInfo } = this.props;
    const { time } = this.state;
    return (
      <div className="weatherMain-wrap">
        <div className="weatherMain-title">
          <h2>Weather Now</h2>
        </div>
        <div className="weatherMain-info">
          {weatherInfo.slice(0, 1).map((weather) => (
            <div className="weatherMain-info-box1">
              <h3>{weather.temp}&deg;</h3>
              <h4>Today is {weather.description}</h4>
            </div>
          ))}
          <div className="weatherMain-info-box2">
            {weatherInfo.slice(0, 1).map((weather) => {
              return this.getWeatherIcon(weather.weatherRange);
            })}
          </div>
        </div>
        <div className="weatherMain-otherInfo">
          <div className="weatherMain-otherInfo-box1">
            <span>{time}</span>
          </div>
          <div className="weatherMain-otherInfo-box2">
            {weatherInfo.slice(0, 1).map((weather) => (
              <span>
                {weather.city}, {weather.country}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  getWeatherIcon = (range) => {
    switch (true) {
      case range >= 200 && range <= 232:
        return <Thunder className="icon" />;
      case range >= 300 && range <= 531:
        return <Rainy className="icon" />;
      case range >= 600 && range <= 622:
        return <Snowy className="icon" />;
      case range === 800:
        return <Day className="icon" />;
      default:
        return <Cloudy className="icon" />;
    }
  };
}

const mapStateToProps = (state) => {
  return {
    weatherInfo: state.weatherInfo,
    time: state.time,
  };
};

export default connect(mapStateToProps, null)(WeatherMain);
