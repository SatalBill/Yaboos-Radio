

import React  , { Component} from 'react';
import { StyleSheet,View,BackHandler,  Linking  , ImageBackground} from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Icon } from 'native-base' ; 
import Colors from '../constant/color';
import Orientation from 'react-native-orientation-locker';

const  urlface = 'http://www.facebook.com/yaboos.fm/';
const  urltwiter = 'http://twitter.com/YaboosFm?s=07';
const  urlinsta = 'http://instagram.com/yaboosfm?igshid=1rtsbuorgmlgt';
const  urlyutuop = 'http://www.youtube.com/channel/UChmCHbWk_-REQhkVODtmdsQ';
const  urlsite  = 'http://info@yaboos.com';

 class Share extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      visible : true , ok : ''
    };
     }
     static navigationOptions = {header: null }
 

componentDidMount()
{
  Orientation.lockToPortrait();
}  
  render()
    {
      return (
    
     <View style={styles.container}>
 <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/page.jpg'}} 
         style={{width: '100%', height : '100%'}} >     
 
<View style = {{ flexDirection : 'row' , marginTop : '100%' , marginLeft : '5%'}}>


    <Icon name="facebook-square" type = "FontAwesome" style={{color: Colors.white , fontSize :  60 , margin : 10 }} 
           onPress = {()=>{
            
            Linking.canOpenURL(urlface).then(supported => {
              if (!supported) {
                alert('Can\'t handle url: ' + url);
              } else {
                return Linking.openURL(urlface);
              }
            }).catch(err => console.error('An error occurred', err));
            this.props.navigation.navigate('HomeScreen') 
            this.setState({ visible : false })
           }}/>


           <Icon name="youtube-with-circle" type = "Entypo" style={{color: Colors.white , fontSize :  60  , margin : 10}} 
                 onPress = {()=>{
            
                  Linking.canOpenURL(urlyutuop).then(supported => {
                    if (!supported) {
                      alert('Can\'t handle url: ' + url);
                    } else {
                      return Linking.openURL(urlyutuop);
                    }
                  }).catch(err => console.error('An error occurred', err));
                  this.props.navigation.navigate('HomeScreen') 
            this.setState({ visible : false })
                 }}/>
          


          <Icon name="twitter" type = "Entypo" style={{color: Colors.white , fontSize :  60   ,margin : 10 }} 
              onPress = {()=>{
            
                Linking.canOpenURL(urltwiter).then(supported => {
                  if (!supported) {
                    alert('Can\'t handle url: ' + url);
                  } else {
                    return Linking.openURL(urltwiter);
                  }
                }).catch(err => console.error('An error occurred', err));
                this.props.navigation.navigate('HomeScreen') 
            this.setState({ visible : false })
               }}/>



            <Icon name="social-instagram" type = "SimpleLineIcons" style={{color: Colors.white , fontSize :  55  , margin : 10}} 
       onPress = {()=>{
            
        Linking.canOpenURL(urlinsta).then(supported => {
          if (!supported) {
            alert('Can\'t handle url: ' + url);
          } else {
            return Linking.openURL(urlinsta);
          }
        }).catch(err => console.error('An error occurred', err));
        this.props.navigation.navigate('HomeScreen') 
            this.setState({ visible : false })
       }}/>
</View>
 </ImageBackground>
        </View>
      );

    }
     
 
  }

const styles = StyleSheet.create({
 screen :
 {
   flex : 1 , justifyContent : 'center' , alignItems : 'center'
 } 

});

export default Share ;

/**
 *     <Icon name="earth" type = "AntDesign" style={{color: 'black' , fontSize :  40 ,margin : 10 }} 
                  onPress = {()=>{
            
                    Linking.canOpenURL(urlsite).then(supported => {
                      if (!supported) {
                        alert('Can\'t handle url: ' + url);
                      } else {
                        return Linking.openURL(urlsite);
                      }
                    }).catch(err => console.error('An error occurred', err));
                   }}/>
             
            
 *   <Icon name="whatsapp" type = "FontAwesome" style={{color: '#128C7E' , fontSize :  40 ,margin : 10 }} 
                />
 */