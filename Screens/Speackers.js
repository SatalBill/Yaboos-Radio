

import React  , { Component} from 'react';
import { StyleSheet,View,Text, ScrollView , Image} from 'react-native';
import Orientation from 'react-native-orientation-locker';

 class Speackers extends Component 
{
  constructor(props) {
    super(props);
  }

  componentDidMount()
  {;
    Orientation.lockToPortrait()
  }
  render()
    {
      return (
        <ScrollView>
        <View style = {styles.container}> 
        <Image source={require('../Img/imgone.png')}  
         style={{width: 250, height : 200 , margin : 5}} >
         </Image>
         </View>
         
         <View style = {styles.container}> 
         <Image source={require('../Img/homeimg.png')}  
         style={{width: 250, height : 200 }} >
         </Image>
         </View>
         
         <View style = {styles.container}> 
         <Image source={require('../Img/beats.png')}  
         style={{width: 250, height : 200 }} >
         </Image>
         </View>

         <View style = {styles.container}> 
         <Image source={require('../Img/imgone.png')}  
         style={{width: 250, height : 200 }} >
         </Image>
         </View>

         <View style = {styles.container}> 
         <Image source={require('../Img/homeimg.png')}  
         style={{width: 250, height : 200 }} >
         </Image>
        </View>
       
       </ScrollView>
      
       
      );

    }
     
 
  }

const styles = StyleSheet.create({
  
  container: {  
    flex : 1 ,  borderRadius : 5  , backgroundColor : '#E59866' , margin : 5 ,
    shadowOffset : { width : 0 , height : 2} , shadowRadius : 20  , 
    justifyContent : 'center'  , alignItems : 'center' ,   

  },  

});

export default Speackers ;
