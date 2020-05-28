import React, { Component } from "react";
import "../../style/Search.scss";
import { connect } from "react-redux";
import { getInputChange, getWeatherInfo } from "../../store/actionCreators";

class Search extends Component {
  //default city
  componentDidMount() {
    this.props.setDefaultWeather("sydney");
  }
  render() {
    const {
      handleInputChange,
      setNewWeather,
      inputValue,
      newCity,
    } = this.props;

    return (
      <div className="search-wrap">
        <span>CITY:</span>
        <input value={inputValue} onChange={handleInputChange} />
        <button onClick={() => setNewWeather(newCity)}>Change</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newCity: state.newCity,
    inputValue: state.inputValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange(e) {
      dispatch(getInputChange(e.target.value));
    },
    setDefaultWeather(initCity) {
      dispatch(getWeatherInfo(initCity));
    },
    setNewWeather(newCity) {
      dispatch(getWeatherInfo(newCity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
