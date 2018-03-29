import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions} from 'expo';
import RequestHandler from './RequestHandler.js'
import DeviceInfo from 'react-native-device-info'


let interval;

export default class GetLoc extends Component {
  state = {
    location: null,
    timestamp: null,
    lat: null,
    long: null,
    alt: null,
    errorMessage: null,
    move: 0,
    mac: null
  };

  componentWillMount() {


    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidMount()
  {

    interval = setInterval(() => {
          RequestHandler.sendGeoLoc("333", this.state.lat, this.state.long, this.state.alt, this.state.timestamp)
      }, 1000);
  }

  componentWillUnmount()
  {
    clearInterval(interval);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    let time = location.timestamp
    let lat = location.coords.latitude
    let long = location.coords.longitude
    let alt = location.coords.altitude

    this.setState({ location,
      timestamp: time,
      lat: lat,
      long: long,
      alt: alt,
      move:this.state.move+1,
     });
  };

  render() {

    this._getLocationAsync()
    // return(null)
    let text = 'Waiting..';
    if (this.state.location)
    {
      return (
        <View style={styles.container}>
          <Text>Timestamp: {this.state.timestamp}</Text>
          <Text>Latitude: {this.state.lat}</Text>
          <Text>Longitude: {this.state.long}</Text>
          <Text>Altitude: {this.state.alt}</Text>
          <Text>{this.state.mac}</Text>
        </View>
      );
    }
    else
    {
      text = this.state.errorMessage;
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
