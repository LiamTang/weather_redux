const defaultState = {
  inputValue: "",
  newCity: "",
  weatherInfo: [],
};

export default (state = defaultState, action) => {
  if (action.type === "handle_input_change") {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    newState.newCity = action.value;
    return newState;
  }

  if (action.type === "update_weather_information") {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = " ";
    newState.weatherInfo = getWeather(action.apiData);
    return newState;
  }

  return state;
};

const calculateCelsius = (temp) => Math.floor(temp - 273.15);

const calNormalTime = (unixTime) => {
  let date = new Date(unixTime * 1000);
  let hours = date.getHours();
  let minutes = ("0" + date.getMinutes()).substr(-2);
  let normalTime = `${hours}:${minutes}`;
  return normalTime;
};

const getWeather = (response) => {
  const weatherInfo = [];
  const dayIndex = getDayIndex(response);

  //get further four days weather information
  for (let i = 0; i < 5; i++) {
    weatherInfo.push({
      date: response.list[dayIndex[i]].dt_txt,
      temp: calculateCelsius(response.list[dayIndex[i]].main.temp),
      city: response.city.name,
      country: response.city.country,
      humidity: response.list[dayIndex[i]].main.humidity,
      wind: response.list[dayIndex[i]].wind.speed,
      sunrise: calNormalTime(response.city.sunrise),
      sunset: calNormalTime(response.city.sunset),
      description: response.list[dayIndex[i]].weather[0].description,
      weatherRange: response.list[dayIndex[i]].weather[0].id,
    });
    console.log("temp", weatherInfo);
  }
  return weatherInfo;
};

const getDayIndex = (data) => {
  let index;
  const currentHour = new Date().getHours();
  const hours = [currentHour];

  /* compare to the current hour, determine where the index starts  */
  for (let a = 0; a < 5; a++) {
    let listHours = Number(data.list[a].dt_txt.slice(11, 13));
    hours.push(listHours);
    hours.sort((a, b) => a - b);
    // console.log(hours)
    //determine the init index, this index is the closet one compare to the current hour
    index = hours.indexOf(currentHour) - 1;
  }
  let dayIndex = [index];
  let tmp = data.list[index].dt_txt.slice(8, 10);

  //get the index of list in api
  //Make the 12am temperature as the next four days temperature
  for (let i = 0; i < 4; i++) {
    while (
      tmp === data.list[index].dt_txt.slice(8, 10) ||
      data.list[index].dt_txt.slice(11, 13) !== "12"
    ) {
      index++;
    }
    dayIndex.push(index);
    tmp = data.list[index].dt_txt.slice(8, 10);
  }
  return dayIndex;
};
