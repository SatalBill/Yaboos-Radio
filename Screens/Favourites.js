
import React  , { useEffect , useState} from 'react';
import { StyleSheet,View,BackHandler,  Text , ImageBackground  , FlatList , TouchableOpacity } from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Icon, Title } from 'native-base' ; 
import Colors from '../constant/color';
import TrackPlayer from 'react-native-track-player';
import Orientation from 'react-native-orientation-locker';
import { ScrollView } from 'react-native-gesture-handler';

var data = [{
  title : '' , url : '' , artist : ''
}]

const Favourites = ({navigation}) =>
{
   
const [header , isheader ] =  useState('');
const [check , ischeck ] =  useState('play');
const [text , istext ] =  useState('');
const [artist , isartist ] =  useState('');
const [url , isurl ] =  useState('');
const [exampleState, setExampleState] = useState(data);

  Favourites.navigationOptions = navigationData =>
  {
    return { header: null };
  }

  useEffect(() => {
   Orientation.lockToPortrait();   
      
    const  artist = navigation.getParam('artist');
    const  url = navigation.getParam('url');
    const title = navigation.getParam('title');
    var newArray = [...data , { title : title , url : url , artist : artist }];
    setExampleState(newArray);  

    TrackPlayer.updateOptions({
      stopWithApp: false, 
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
       
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      
      ]
    });
    
  }),[];

      return (
     <View style={styles.screen}>
           <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/home.jpg'}} 
         style={{width: '100%', height : '100%'}}> 
           
      </ImageBackground>
        </View>
      );
 
}

const styles = StyleSheet.create({
 screen :
 {
   flex : 1 , justifyContent : 'center' ,alignItems : 'center' , backgroundColor : Colors.tapcolor
 } 

});

export default Favourites ;
