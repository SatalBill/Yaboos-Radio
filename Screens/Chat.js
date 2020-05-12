
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
