

import React  , { Component} from 'react';
import { StyleSheet,View,Text, ToastAndroid} from 'react-native';
import { Icon } from 'native-base';
import Orientation from 'react-native-orientation-locker';

const SearchScreen = props =>
{
  
      return (
        <View style= {styles.screen}>
          <Text>SearchScreen</Text>
        </View>
      );

    
     
  }

  
const styles = StyleSheet.create({
 screen :
 {
   flex : 1 , justifyContent : 'center' , alignItems : "center"
 } 

});

export default  SearchScreen ;
