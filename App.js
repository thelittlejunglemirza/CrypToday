import React from 'react';
import GetLoc from './GetLoc';
import Graphs from './Graphs';
import TrackLoc from './TrackLoc';
import ProductView from './ProductView';
import WeeklyToDo from './WeeklyToDo';
import MonthlyToDo from './MonthlyToDo';

import { Platform, Text, View, StyleSheet, TouchableHighlight, Image, TextInput, ScrollView } from 'react-native';

class App extends React.Component {

  constructor()
  {
    super()
    this.state = ({
      tab:0
    })
  }

  componentWillMount()
  {
  }

  onPress(clicked)
  {
    this.setState({
      tab:clicked
    })
  }

  render()
  {
    let content = <Text>Error</Text>
    let zero_style = styles.tabItem
    let one_style = styles.tabItem
    let two_style = styles.tabItem

    let zero_font = styles.tabText
    let one_font = styles.tabText
    let two_font = styles.tabText

    let title = null


    if (this.state.tab === 2)
    {
        two_style = styles.tabItem_active
        two_font = styles.tabText_active
        title = <MonthlyToDo/>
    }
    else if (this.state.tab === 1)
    {
        one_style = styles.tabItem_active
        one_font = styles.tabText_active
        title = <WeeklyToDo/>
    }
    else if (this.state.tab === 0)
    {
      zero_style = styles.tabItem_active
      zero_font = styles.tabText_active
      title = <ProductView/>
    }
    return(
      <View style={{flex: 1}}>
        <View style={styles.headBar}>
          <Text style={styles.headText}>CrypToday</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onSubmitEditing={this.onNewItem}
          placeholder='Search...'
          returnKeyType="done"
          onChangeText={this.onChangeText}
          value={this.state.item}
        />
        <ScrollView style={styles.navBar}>
          {title}
        </ScrollView>
        <View style={styles.tabs_cont}>
          <TouchableHighlight onPress={() => this.onPress(0)} style={zero_style}>
            <Text style={zero_font}>News</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress(1)} style={one_style}>
            <Text style={one_font}>Trending</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onPress(2)} style={two_style}>
            <Text style={two_font}>SafePlay</Text>
          </TouchableHighlight>
        </View>
      </View>


    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 50
  },
  headBar: {
    backgroundColor:'#3e444c',
    justifyContent:'center',
    height: 80
  },
  tabs_cont: {
    flexDirection:'row',
    width:null,
    justifyContent:'center',
    alignItems: 'stretch',
  },
  tabItem: {
    justifyContent:'center',
    borderWidth:0.5,
    borderColor: 'black',
    width:110,
    height:50,
    backgroundColor:'#3e444c',
  },
  tabItem_active: {
    justifyContent:'center',
    borderWidth:1,
    borderColor: 'black',
    borderBottomColor:'white',
    width:110,
    height:50,
    backgroundColor:'white',
  },
  navBar: {
    flex: 1,
    flexDirection:'column',
  },
  headText: {
    textAlign:'center',
    marginTop: 15,
    color:'white',
    fontSize:24,
    fontWeight:'bold',
    fontFamily:'AppleSDGothicNeo-Bold'
  },
  tabText: {
    fontWeight:'bold',
    textAlign:'center',
    color:'white'
  },
  tabText_active: {
    fontWeight:'bold',
    textAlign:'center',
    color:'#314460'
  },
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    flex: 1,
  },
  titleContainer: {
    marginTop:15,
    padding:10,
  },
  title: {
    color:'#003366',
    fontFamily:'AppleSDGothicNeo-Bold',
    fontSize:24,
  }
})

export default App
