


import React  , { Component} from 'react';
import { StyleSheet,View,BackHandler,  Text , ImageBackground  } from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Icon } from 'native-base' ; 
import Colors from '../constant/color';
import TrackPlayer from 'react-native-track-player';
import Orientation from 'react-native-orientation-locker';

 class Chat extends Component 
{
  
  constructor(props) {
    super(props);
    this.state = {
      visible : true , header : '' 
    };
    }


  static navigationOptions = {header: null }
  componentWillMount() 
  {
Orientation.lockToPortrait();   
   
const  param1 = this.props.navigation.getParam('param1');
const  param2 = this.props.navigation.getParam('param2');
 
   switch ( param1 || param2 ) {
     case 'param1' :
      this.setState({
        header : 'قريبا' ,
      
      })
       break;

       case 'param2' :
       this.setState({
        header : 'Coming Soon' , 
    
      })
         break;

     default:
       break;
   }
  }

  render()
    {
      return (
     <View style={styles.screen}>
        <Text style ={{ color : Colors.white , fontSize : 20 }}>Coming Soon</Text>
        </View>
      );

    }
     
 
  }

const styles = StyleSheet.create({
 screen :
 {
   flex : 1 , justifyContent : 'center' ,alignItems : 'center' , backgroundColor : Colors.tapcolor
 } 

});

export default Chat ;
//setTimeout(function(){this.setState({timePassed: true})}, 1000)
/*
import React, { Component , useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text, ImageBackground,
  TouchableHighlight,
  View
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Chat = () => {
  const [modalVisible, setModalVisible] = useState(true);
  

  useEffect(() => {
    setTimeout(function(){setModalVisible(!modalVisible)}, 3000);
    
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       
      >
        <View style={styles.centeredView}>
         <ImageBackground 
          imageStyle={{ borderRadius: 10 , alignItems : 'center' , justifyContent : 'center' , 
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5}}
          source={require('../constant/ads.png')} 
       style ={{ width : '80%' , height : 150 , alignItems : 'center' , marginLeft : '20%' ,
        justifyContent : 'center'  }} >
    </ImageBackground>
    <Text style={{ color : 'white' , fontFamily : 'ArbFONTS-GE-SS-Two-Light' , marginLeft : '5%' ,
     fontSize : 18 , marginTop : -23 }}>  أغنية جديدة </Text>
      

        </View>
      </Modal>

     
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: '20%'  ,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Chat;
*/