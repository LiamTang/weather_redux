import React, { Component } from "react";
import "../../style/WeatherDetail.scss";
import { connect } from "react-redux";

class WeatherDetail extends Component {
  render() {
    const { weatherInfo } = this.props;
    return (
      <div className="weatherDetail-wrap">
        <div className="weatherDetail-current">
          <h3>Weather Details</h3>
          {weatherInfo.slice(0, 1).map((weather) => (
            <>
              <p>
                <span className="greyColor">Humidity:</span>
                <span>{weather.humidity} %</span>
              </p>
              <p>
                <span className="greyColor">Wind:</span>
                <span>{weather.wind} K/M</span>
              </p>
              <p>
                <span className="greyColor">Sunrise:</span>
                <span>{weather.sunrise}</span>
              </p>
              <p>
                <span className="greyColor">Sunset:</span>
                <span>{weather.sunset}</span>
              </p>
            </>
          ))}
        </div>
        <div className="weatherDetail-future">
          <h3>Next Days</h3>
          {weatherInfo.slice(1, 5).map((weather) => (
            <p>
              <span className="greyColor">{weather.date.slice(5, 10)}</span>
              <span>{weather.temp}&deg;</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weatherInfo: state.weatherInfo,
  };
};

export default connect(mapStateToProps, null)(WeatherDetail);
