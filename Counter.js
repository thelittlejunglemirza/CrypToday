import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';

export default class Counter extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = ({
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0,
      days: 0
    });
  }

  componentDidMount() {
    this._subscribe();
    this.calcDate(this.props.days);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentWillReceiveProps(n)
  {
    this.calcDate(n.days)
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

  };

  calcDate(days)
  {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    let steps = this.state.pastStepCount+this.state.currentStepCount;
    let percent = (steps / this.props.step_goal)

    return (
      <View style={styles.container}>

        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Progress.Circle thickness={9} size={100} progress={percent} formatText={function(){return((percent*100).toFixed(2)+'%')}} indeterminate={false} showsText = {true}/>
        </View>
        <Text>
        </Text>
        <Text>
          <Text style={styles.step_text}>{steps}</Text>  steps taken in the last {this.props.days} day(s).
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  step_text: {
    color:'rgba(0, 122, 255, 1)',
    fontFamily:'AppleSDGothicNeo-Bold',
    fontSize:24,
    marginRight:10
  }
});
