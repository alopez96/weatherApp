import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather';
import { API_KEY } from './utils/WeatherAPIKey';


export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null,
    fetched: false,
  };

  componentDidMount() {
    console.debug('fetch weather1')
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    console.debug('fetch weather')
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial`
    )
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false,
          fetched: true
        });
      })
      .catch(er => {console.debug('error', er)})
  }

  render() {
    const {isLoading, weatherCondition, temperature} = this.state;
    return (
      <View style={styles.container}>
      {isLoading ? ( 
        <Text>Fetching weather data</Text>
      ):(
        <View>{this.state.fetched
          ?<Weather weather={weatherCondition} temperature={temperature}></Weather>
          :null}
        </View>
      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
