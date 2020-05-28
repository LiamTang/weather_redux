export const getInputChange = (value) => ({
  type: "handle_input_change",
  value,
});

export const UpdateWeatherInfo = (apiData) => ({
  type: "update_weather_information",
  apiData,
});



const API_KEY = "bd4c1a8f97325ab7d72687fa20fdee7d";
export const getWeatherInfo = (city) => {
  console.log(city);
  return async (dispatch) => {
    const api = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    const response = await (await fetch(api)).json();
    const action = UpdateWeatherInfo(response);
    dispatch(action);
  };
};
