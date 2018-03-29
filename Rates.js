import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  FlatList
} from 'react-native';
import RequestHandler from './RequestHandler.js';

// class Coin extends React.Component {
//   render(){
//     return (
//       <View
//     )
//   }
// }

class RateList extends React.Component {

  constructor(){
    super();
  }

  // renderSeparator() {
  // return <View style={styles.separator} />
  // }

  renderItem(data) {
    let { item, index } = data;
    //<Image source={{uri: item.picture}} style={styles.itemImage}/>
    return (
      <View style={styles.itemBlock}>
        <View style={styles.itemMeta}>
          <Text style={styles.itemLastMessage}>#{item.rank}</Text>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemLastMessage}>{item.cap}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
      </View>
    )
  }

  render(){
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        data={this.props.list}
        renderItem={this.renderItem.bind(this)}
      />
    );
  }
}

export default class Rates extends React.Component {
  state = {
    items: [],
    item: ''
  }

  constructor() {
    super();
    this.state = ({
      arr: [1,2,3,4,5],
      obj: []
    })
  }

  componentDidMount(){
    RequestHandler.getProduct().then(function(res){
      res = JSON.parse(res);
      var arr = []
      for(let o of res){
        let obj = {
            'name': o['name'],
            'rank': o['rank'],
            'price': o['price_usd'],
            'cap': o['market_cap_usd']
          };
        arr.push(obj)
      }
      console.log(arr)
      this.setState({
        obj: arr,
      })
      //console.log(this.state.obj);
      console.log(Array.isArray(this.state.obj))
      console.log('=============== here ============')
      console.log(this.state.obj)
    }.bind(this)).catch(function(e){
      console.log('error message')
      console.log(e);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <RateList list={this.state.obj}/>
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
  itemBlock: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemMeta: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 25,
  },
  itemLastMessage: {
    fontSize: 14,
    color: "#111",
  },
  itemPrice: {
    fontSize: 14,
    color: "red",
  },
  productName: {
    fontFamily:'AppleSDGothicNeo-Bold',
    fontSize:22,
  },
  price: {
    fontFamily:'AppleSDGothicNeo-Bold',
    fontSize:20,
    color: 'red'
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
  },
  separator: {
  height: 0.5,
  width: "80%",
  alignSelf: 'center',
  backgroundColor: "#555"
  }
});
