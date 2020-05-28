import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./style/App.scss";
import Search from "./component/search_bar/Search";
import WeatherDetail from "./component/weather_detail/WeatherDetail";
import WeatherMain from "./component/weather_main/WeatherMain";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <div className="card-wrap">
          <div className="card">
            <div className="card-left">
              <WeatherMain />
            </div>
            <div className="card-right">
              <Search />
              <WeatherDetail />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
