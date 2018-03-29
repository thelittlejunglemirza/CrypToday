import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native';
import RequestHandler from './RequestHandler.js';

class ProductList extends React.Component {

  constructor(){
    super();
  }

  render(){
    return (
      <View>
        {this.props.list.map(function(listValue){
              return (
                      <View>
                        <Text style={styles.productName}>{listValue['name']}</Text>
                        <Image
                          style={{width: 150, height: 150}}
                          source={{uri: listValue['img']}}
                        />
                        <Text style={styles.price}>Price: {listValue['price']}</Text>
                      </View>
                    );
        })}
      </View>
    );
  }
}

export default class ProductView extends React.Component {
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
      res = res['searchApi']['documents']
      var arr = []
      for(let o of res){
        let obj = {
            'name': o['summary']['meta']['title'],
            'img': o['summary']['media']['primaryImage']['path'],
            'price': o['priceBlock']['itemPrice']['currentPrice']
          };
        arr.push(obj)
      }
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
        <ProductList list={this.state.obj}/>
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
  }
});
