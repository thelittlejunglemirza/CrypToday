import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RequestHandler from './RequestHandler.js';
import { Util } from 'expo';

class TrackLoc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: null,
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    interval = setInterval(() => {
          RequestHandler.sendGeoLoc("333", this.state.latitude, this.state.longitude, 2, this.state.timestamp).then(function(res){

          })
          .catch(function(e){Util.reload()})
      }, 1000);
  }

  componentWillUnmount()
  {
    clearInterval(interval);
  }

  getLocation = async () =>
  {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          timestamp: position.timestamp,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 },
    );
  }
  render() {

    this.getLocation()

    return (
      null
      // <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <Text>Latitude: {this.state.latitude}</Text>
      //   <Text>Longitude: {this.state.longitude}</Text>
      //   {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      // </View>
    );
  }
}

export default TrackLoc;
