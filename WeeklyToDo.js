import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';


export default class WeeklyToDo extends React.Component {
  state = {
    items: [],
    item: ''
  }
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

  constructor() {
    super();
    AsyncStorage.getItem('WeeklyItems')
      .then(itemsJSON => {
        if(itemsJSON) {
          this.setState({
            items: JSON.parse(itemsJSON)
          })
        }
      })
  }

  onChangeText = text => {
    this.setState({
      item: text
    })
  }
  onNewItem = e => {
    const arr = [this.state.item, ...this.state.items];
    this.setState({
      items: arr,
      item: ''
    })
    this.save(arr);
  }

  save = (arr) => {
    AsyncStorage.setItem('WeeklyItems', JSON.stringify(arr))
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText} >{rowData}</Text>
        <TouchableOpacity style={styles.doneButton}
          onPress={()=> {
            this.state.items.splice(rowID, 1)
            this.setState({
              items: [...this.state.items]
            })
            this.save(this.state.items);
          }}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}  >
          <Text style={styles.title}>This Week's Goals</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onSubmitEditing={this.onNewItem}
          placeholder='Add New Goal'
          returnKeyType="done"
          onChangeText={this.onChangeText}
          value={this.state.item}
          />

        <ListView
          dataSource={this.ds.cloneWithRows(this.state.items)}
          renderRow={this.renderRow}
          enableEmptySections
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    marginTop:15,
    padding:10,
  },
  title: {
    color:'#003366',
    fontFamily:'AppleSDGothicNeo-Bold',
    fontSize:24
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
  doneButton: {
    padding: 10,
    backgroundColor: '#eaeaea'
  }
});
