import React from 'react';
import GetLoc from './GetLoc';
import { Platform, Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Counter from './Counter';



{/* <Progress.Pie progress={0.4} size={50} />
<Progress.Circle size={30} indeterminate={true} />
<Progress.CircleSnail color={['red', 'green', 'blue']} /> */}


class Graphs extends React.Component {

  constructor(props)
  {
    super(props)
  }


  render()
  {
    let days=0
    let title='Daily'
    let step_goal = 0
    let url = null;

    if (this.props.screen === 0)
    {

      days = 1
      title = "Daily"
      step_goal = 10000
      url = 'http://10.161.110.108:5000/daily_activity'
    }
    else if (this.props.screen === 1)
    {

      days = 7
      title = "Weekly"
      step_goal = 70000
      url = 'http://10.161.110.108:5000/weekly_activity'
    }
    else if (this.props.screen === 2)
    {

      days = 30
      title = "Monthly"
      step_goal = 300000
      url = 'http://10.161.110.108:5000/monthly_activity'
    }

    url = url + '?random_number=' + new Date().getTime()

    return(
      <View style={styles.content}>
        <Text style={styles.act_log}>Activity Log</Text>

        <Image
          style={styles.images}
          source={{uri: url}}/>

        <Text style={styles.act_log}>Step Tracker</Text>
        <Text></Text>
        <Counter step_goal={step_goal} days={days}/>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection:'column',
    margin:3,
  },
  images: {
    width:null,
    height:200,
    marginTop:10
  },
  act_log: {
    marginTop:15,
    padding:10,
    color:'#003366',
    fontFamily:'AppleSDGothicNeo-Bold',
    fontSize:24
  }
})

export default Graphs
