import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { chainParse } from './src/utils';
import imgGender from './src/images/imgGender.png'
import imgCalendar from './src/images/imgCalendar.png'
import imgLock from './src/images/imgLock.png'
import imgMap from './src/images/imgMap.png'
import imgPhone from './src/images/imgPhone.png'

const dataChoose = [
  {
    id: 1,
    title: "Gender",
    source: imgGender,
    key:""
  },
  {
    id: 2,
    title: "Date of birth",
    source: imgCalendar
  },
  {
    id: 3,
    title: "Address",
    source: imgMap
  },
  {
    id: 4,
    title: "Phone number",
    source: imgPhone
  },
  {
    id: 5,
    title: "Lock",
    source: imgLock
  }
]
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      indexFocus: 2
    };
  }
  getImagesFromApi = () => {
    return fetch('https://randomuser.me/api/0.4/?randomapi')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        const data = chainParse(json, ["results", 0]) || ""
        this.setState({
          data
        })
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount() {
    this.getImagesFromApi()
  }
  _handleOnPressItem = (indexFocus) => {
    this.setState({
      indexFocus
    })
  }
  _renderItem = (item, index) => {
    const source = chainParse(item, ["source"]) || ""
    const { indexFocus } = this.state
    return (
      <TouchableOpacity onPress={()=>this._handleOnPressItem(index)}>
        <View style={styles.viewItem}>
          <View style={[styles.borderTopItem, { backgroundColor: index == indexFocus ? "green" : "gray" }]}></View>

          <Image source={source} style={[styles.imgItem, { tintColor: index == indexFocus ? "green" : "gray" }]}></Image>
        </View>
      </TouchableOpacity>
    )
  }
  _renderInfo=()=>{
    const {indexFocus,data}= this.state
    const title = dataChoose[indexFocus].title
    return(
      <View>
        <Text style={styles.txtTitle}>hihi</Text>
        <Text style={styles.txtDetail}>hehe</Text>
        
      </View>
    )
  }
  render() {
    const { data } = this.state
    const picture = chainParse(data, ["user", "picture"]) || ""
    console.log(picture)
    return (
      <View style={{ flex: 1, backgroundColor: 'blue' }}>
        <View style={styles.container}>
          <View style={styles.viewHeader}></View>
          {!!picture && <Image source={{ uri: picture }} style={styles.imgProfile}></Image>}
          {!picture && <View style={styles.imgProfile}></View>}
      <View style={{width:'100%', height:32}}></View>
      {/* {this._renderInfo()} */}
      <View style={{width:'100%', height:32}}></View>
      
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            {dataChoose.map(this._renderItem)}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  borderTopItem: {
    width: 20,
    height: 3
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  imgItem: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: "gray",
    marginTop: 8
  },
 
  viewHeader: {
    height: 120,
    width: '100%',
    backgroundColor: 'gray',
    opacity: 0.3
  },
  imgProfile: {
    marginTop: -80,
    height: 160,
    width: 160,
    borderRadius: 80,
    backgroundColor: 'gray'
  },
  viewItem: {
    marginLeft: 20
  },
  txtTitle:{
    fontSize:16,
    color:"gray",
    fontWeight:400
  },
  txtDetail:{
    fontSize:20,
    color:"black",
    fontWeight:"bold",
    marginTop:10
  }

})