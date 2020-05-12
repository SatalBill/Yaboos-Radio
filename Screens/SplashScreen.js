

import React  , { Component} from 'react';
import { StyleSheet,View,ActivityIndicator, Image, ImageBackground, } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Colors from '../constant/color';
import Sound from 'react-native-sound';

Sound.setCategory('Playback', true); // true = mixWithOthers

 class SplashScreen extends Component 
{
  constructor(props) {
    super(props);
    this.state = {isloading : true}
    console.disableYellowBox = true;

  
  }

  componentWillMount() 
  {
    Orientation.lockToPortrait();
    /*
    const s = new Sound( t2, (error) => { // works
      if (error) {
        console.log('error', error);
        return;
      }
  
      s.play(() => {
        s.release()
      });
    });
  */
  }

  render()
  
    {
      return (
        
        <View style = {styles.container}>
         <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/login.jpg'}} 
         style={{width: '100%', height : '100%'}} 
      >
         <Image source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/logo.png'}}
         style={{width: '80%', height : '20%' , marginTop : '80%' , marginLeft :'10%'}} >     
             </Image>
  
        </ImageBackground>   
          </View>
      );

    }
     
 
  }


export default SplashScreen ;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});