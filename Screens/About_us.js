

import React  , { Component} from 'react';
import { StyleSheet,View,Text, ImageBackground  } from 'react-native';
import Colors  from '../constant/color';
import { Icon } from 'native-base' ;
import Orientation from 'react-native-orientation-locker';

 class About_us extends Component 
{
  constructor(props) {
    super(props);
   
  }
  static navigationOptions = {header: null }

  componentDidMount()
  {
    Orientation.lockToPortrait();
  }
  render()
    {
      return (
     <View style={styles.screen}>
     <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/slide.jpg'}} 
         style={{width: '100%', height : '100%'}}> 
       <View style = {{ flexDirection : 'column' , marginLeft : 20 , marginRight : 5 ,  marginTop : '55%' ,}}> 
    
      <Text style = {{ color : Colors.white , marginTop : 15 ,fontFamily : 'ArbFONTS-GE-SS-Two-Light' ,  fontSize :16}} >
      With a Jerusalem flavor emanating from the heart of the city of Jerusalem , Yaboos is the first community radio to support the pionners and their steadfastness in the city . Our Station independent and non-politicized , and there are commercials . Our programs are social , cultural , educational , recreational , all of which are short programs . Our social and cultural news emanates from a moderate and balanced framework to motivate young people to take leadership and societal action while spreanding the concepts of freedom and living in dignity to promote the value of man and place in our beloved city.Yaboos FM is the home of all my sanctuary and its media from Jerusalem to all the world , and all the space we broadcast to the voices of its sanctified sanctuary , away from the media , and our voice from the earth to Sama .Yaboos FM from Jerusalem and all the Lovers of Jerusalem .
      
      </Text>
      <View style={{flexDirection : 'row' , margin : 5 , marginRight : '50%' , marginTop: 20 }}> 
                        <Icon name="email" type = "Fontisto" style={{color: Colors.white , fontSize :  20 }} 
                         onPress={() => {}} />
                        <Text style = {{color :  Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light',  fontSize : 15 , marginLeft : 10}}>
                          info@yaboos.com</Text>
                      
                      </View>
       
       
      <View style={{flexDirection : 'row' , margin : 5 , marginRight : '50%' }}> 
                        <Icon name="earth" type = "AntDesign" style={{color: Colors.white , fontSize :  20 }} 
                         onPress={() => {}} />
                        <Text style = {{color :  Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light' ,fontSize : 15  , marginLeft : 10}}>
                          www@yaboos.com</Text>
                      
                      </View>
       
      </View>
      
      
      
      
      </ImageBackground>
       </View>
      );

  }  
   }  
 
  

const styles = StyleSheet.create({
 screen :
 {
   flex : 1 , justifyContent : 'center' ,alignItems : 'center'
 } 

});

export default About_us ;
