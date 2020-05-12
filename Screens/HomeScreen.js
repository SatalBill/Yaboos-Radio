
import React   ,  { useEffect , useState , useCallback  , useNavigation }  from 'react';
import { StyleSheet,View,Text,Platform, ToastAndroid, Alert , Image , ImageBackground , ScrollView , Animated ,
    BackHandler,  RefreshControl  , I18nManager , NativeModules } from 'react-native';
import { Icon , Tab, Tabs ,TabHeading   } from 'native-base';
import  Colors  from '../constant/color';
import TrackPlayer from 'react-native-track-player';
import firebase from '../Navigation/Config';
import { SliderBox } from "react-native-image-slider-box";
import Share from 'react-native-share';
import { LoginButton ,  LoginManager } from 'react-native-fbsdk';
import Library from './Library';
import Sound from 'react-native-sound';
import Orientation from 'react-native-orientation-locker';


Sound.setCategory('Playback', true); // true = mixWithOthers

const useForceUpdate = () => useState()[1];
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const HomeScreen = ({navigation}) =>
{
 
const [refreshing, setRefreshing] = React.useState(false);
const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);
const forceUpdate = useForceUpdate();
const [dialogVisible , isdialogVisible ] =  useState(false)
const [check , ischeck ] =  useState('control-play')
var user = firebase.auth().currentUser ;    
const url = "file:///sdcard/sound.mp4";
const title = 'RadiOo Record';
const message = 'Please check.';
const  param1 = navigation.getParam('param1');
const  param2 = navigation.getParam('param2');
const [ quality_speed , is_quality_speed ] = useState(navigation.getParam('speed'));
if( quality_speed === '' || quality_speed === undefined)
{
  is_quality_speed('http://188.225.182.10:8000/64')
}
const locale = NativeModules.I18nManager.localeIdentifier ;
const [LoadingSpin , iLoadingSpin ] =  useState(new Animated.Value(0))
const [outputRange , isoutputRange ] =  useState('360deg')
const spin = LoadingSpin.interpolate({
  inputRange : [0,1] ,
  outputRange : [ '0deg' , outputRange ]
});

const images = [{uri: 'http://demo.ezicodes.com:8080/images/Img/Banner.jpg'},  
{uri: 'http://demo.ezicodes.com:8080/images/Img/Bannertwo.jpg'},
{uri: 'http://demo.ezicodes.com:8080/images/Img/Bannerone.jpg'}
];
const [menu , ismenu ] =  useState('')
const [list , islist ] =  useState('')
const [chat , ischat ] =  useState('')
const [podcast , ispodcast ] =  useState('')
const [bockmark , isbockmark ] =  useState('')
const [alertmessage , isalertmessage ] =  useState('')
const [margin_r , ismargin_r ] =  useState('1%')
const [ cd_width , iscd_width ] =  useState(300)
const [cd_height , iscd_height ] =  useState(150)
const [alerttitle , isalerttitle ] =  useState('')
const [ txt , istxt ] =  useState(' ')
const [link , islink ] =  useState('http://188.225.182.10:8000/64')
const PATH_TO_THE_FILE = 'https://188.225.182.10:444/share.cgi/CurrentSong.txt?ssid=08CPoUU&fid=08CPoUU&open=normal&ep=eWFib29zMjAyMGM=';
const [img , isimg ] =  useState({ uri : 'http://demo.ezicodes.com:8080/images/Img/play.gif'})
const logo = 'http://demo.ezicodes.com:8080/images/Img/yaboos.png'
//const  navigation  = useNavigation();

const  track = {
  id: "1111",
  url: quality_speed ,
  title: "Yaboos Radio",
  artist: "87.8 FM" ,
  artwork: logo
};

const options = Platform.select({
  ios: {
    activityItemSources: [
      {
        placeholderItem: { type: 'url', content: url },
        item: {
          default: { type: 'url', content: url },
        },
        subject: {
          default: title,
        },
        linkMetadata: { originalUrl: url, url, title },
      },
      {
        placeholderItem: { type: 'text', content: message },
        item: {
          default: { type: 'text', content: message },
          message: null, // Specify no text to share via Messages app.
        },
      },
    ],
  },
  default: {
    title,
    subject: title,
    message: `${message} ${url}`,
  },
});
   console.disableYellowBox = true;
  
   const spinAnimation = () => 
   {
     LoadingSpin.setValue(0);
     Animated.sequence([
       Animated.timing(
         LoadingSpin,
         {
           toValue : 1 , 
           duration : 400 
         }
       )
     ]).start(()=> spinAnimation());
    } 


  useEffect(() => {

    Orientation.lockToPortrait();
    const s = new Sound( {uri : 'http://demo.ezicodes.com:8080/images/Img/OpeningInsertTEST.mp3' },
     (error) => { // works
      if (error) {
        console.log('error', error);
        return;
      }
  
      s.play(() => {
        s.release()
      });
    });
  spinAnimation();
  
  
  switch ( param1 || param2 ) 
    {
      
      case ( param1 ):
     
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      isalertmessage('جودة التشغيل ')
     ismenu('القائمة')
     ispodcast('البرامج')
     ischat('الرسائل')
     islist('المكتبة')
     isbockmark('قائمتى')
      
     break;
    
        case (param2):
     //    alert(item) 
    
      isalerttitle('Quality Speed') 
      ismenu('Menu') 
      ispodcast('Podcast')
      ischat('Chat')
      islist('Library')
      isbockmark('Play List')
     break;
    
      default:
        break;
    }
/*
  <Animated.Image style = {{ width : 130 , height : 130  , marginLeft :  '5%' 
  , transform : [{rotate : spin }]   }}
    source = {require('../Img/disk.png')} 
  />
  
        */
        
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
      TrackPlayer.setupPlayer().then(async () => {
        // Adds a track to the queue
        await TrackPlayer.add([track]).then(function() {
          TrackPlayer.play();
          ischeck('control-pause');
          isoutputRange('360deg')
          TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
          TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
          TrackPlayer.addEventListener('remote-stop', () => {
            if(TrackPlayer.STATE_STOPPED)
            {
           //   alert(TrackPlayer.STATE_STOPPED);
              ischeck('control-play');
              isimg({ uri : 'http://demo.ezicodes.com:8080/images/Img/play-0%20static.png'})
              iscd_height(140);
              iscd_width(140);
              ismargin_r('-5%')
              TrackPlayer.stop();

            }
             
          });
       // navigation.navigate('Yaboos')
 //<Image source={img}  style ={{ width : cd_width , height : cd_height , marginRight : margin_r}} />  
         
       
        })
      })
    }, []);


    return (
      <View style = {styles.screen}>
         
      <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/home.jpg'}} 
         style={{width: '100%', height : '100%'}}>  
      <ScrollView 
       contentContainerStyle = {styles.screen} 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
 
 <View style = {{ marginTop : '40%' , justifyContent : 'center' , alignItems : 'center'}}>
 <Image source={img}  style ={{ width : 175 , height : 150 , marginLeft : '8%'}} />  
 
 <Text style = {{ color : Colors.white  , marginTop : '3%' , fontFamily : 'ArbFONTS-GE-SS-Two-Light' , 
  marginLeft : '5%'  , fontSize : 18 ,}}>Song Name </Text>  
 
 <View style = {{flexDirection : 'column' , justifyContent : 'center' , alignItems : 'center' }}>
 
 <Image source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/Cyrcel.png'}} 
  style ={{ width : 70 , height : 70 , marginTop : '1%'}} />  
 
        <Icon name={check} type = "SimpleLineIcons" style={{color: Colors.white   
      , fontSize : 30  , marginLeft : '1%', marginTop : '-15%'}}
      onPress = {()=> 
        {
          if (check === 'control-pause')
        {
           ischeck('control-play');
           isoutputRange('0deg')
           isimg( {uri : 'http://demo.ezicodes.com:8080/images/Img/play-0%20static.png'})
           iscd_height(140);
              iscd_width(140);
              ismargin_r('-5%');
           TrackPlayer.destroy();
        }
      
            if(check === 'control-play')
            {
              isoutputRange('360deg')
            isimg({ uri : 'http://demo.ezicodes.com:8080/images/Img/play.gif'})
            iscd_height(150);
              iscd_width(300);
              ismargin_r('1%')
          TrackPlayer.setupPlayer().then(async () => {
            // Adds a track to the queue
            await TrackPlayer.add([track]).then(function() {
              TrackPlayer.play();
              ischeck('control-pause');
              TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
              TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
              TrackPlayer.addEventListener('remote-stop', () => {
                
                ischeck('control-play')
                isoutputRange('360deg')
                TrackPlayer.stop();
                
             
              } );
           //   navigation.navigate('Yaboos')
          });
        });
      }
      
        }}/> 
     </View>
                 
              </View>     
        
        <View style={{ width : '100%' , marginTop : '10%' , height : '20%' }}>
          
          <SliderBox images={images} autoplay circleLoop backgroundColor = {'white'}
       resizeMode={'cover'}
       sliderBoxHeight={'100%'}  dotColor={Colors.tapcolor}
       inactiveDotColor="white"
       dotStyle={{
         width: 10,
         height: 10,
         borderRadius: 15,
         marginHorizontal: 5,
       }}
       />

    </View>
   
                         <View style={{position:'absolute',bottom:0}}>
       <Tabs tabBarPosition = "bottom" tabContainerStyle = { { height : 50 , backfaceVisibility : 'visible'} }
                   tabBarUnderlineStyle = {{backgroundColor : Colors.tapcolor , height : 1}}>
                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : Colors.tapcolor }}> 
                      <View style={{flexDirection : 'column'}}> 
                        <Icon name="menufold" type = "AntDesign" style={{ marginLeft : 5, 
                         color: Colors.white , fontSize :  25 }} 
                         onPress={() => 
                         {
                          navigation.openDrawer(navigation.navigate('Menu',
                          {'param1': navigation.getParam( 'param1') , 
                           'param2': navigation.getParam( 'param2') })
                          )
                          
                         }}/>
                        <Text style = {{color : Colors.white ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light' }}  onPress={() => 
                         {
                          //navigation.openDrawer()
                          navigation.navigate('Menu',
                          {'param1': navigation.getParam( 'param1') , 
                           'param2': navigation.getParam( 'param2') });
                          
                         }}>{menu}</Text>
                      
                      </View>
                        </TabHeading>}>
                        <View style = {styles.view}>
                     
                        </View> 
                        </Tab>

                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : Colors.tapcolor }}> 
                      <View style={{flexDirection : 'column' ,marginTop : 5}}> 
                        <Icon name="playlist-music" type = "MaterialCommunityIcons" style={{color: Colors.white
                         , fontSize :  30 ,  marginRight : 5}} 
                         onPress={() => 
                         { 
                          navigation.navigate('Library',
                          {'param1': navigation.getParam( 'param1') , 
                           'param2': navigation.getParam( 'param2') });
                         
                         }}/>
                        <Text style = {{color : Colors.white , 
                           fontFamily : 'ArbFONTS-GE-SS-Two-Light' ,marginBottom : 10}}
                           onPress={() => 
                            { 
                             navigation.navigate('Library',
                             {'param1': navigation.getParam( 'param1') , 
                              'param2': navigation.getParam( 'param2') });
                            
                            }}>{list}</Text>
                      
                      </View>
                        </TabHeading>}>
                        <View style = {styles.view}>
                     
                        </View> 
                        </Tab>
                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : Colors.tapcolor }}> 
                      <View style={{flexDirection : 'column'}}> 
                        <Icon name="favorite" type = "MaterialIcons" style={{color: Colors.white ,
                         fontSize :  25 , marginLeft : 10}} 
                         
                          onPress={() => 
                            { 
                             navigation.navigate('Favourites',
                             {'param1': navigation.getParam( 'param1') , 
                              'param2': navigation.getParam( 'param2') });
                            
                            }}/>
                        <Text style = {{color : Colors.white ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light' }}
                        onPress={() => 
                          {
                          
                            navigation.navigate('Favourites',
                            {'param1': navigation.getParam( 'param1') , 
                             'param2': navigation.getParam( 'param2') });
                           
                          }}>
                            {bockmark}</Text>
                      
                      </View>
                        </TabHeading>}>
                        <View style = {styles.view}>
                     
                        </View> 
                        </Tab>
  
                     
                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : Colors.tapcolor }}> 
                      <View style={{flexDirection : 'column'}}> 
                        <Icon name="modern-mic" type = "Entypo" style={{color: Colors.white ,
                         fontSize :  25 , marginLeft : 10}} 
                         onPress={() => 
                         {
                          
                          navigation.navigate('Podcast',
                          {'param1': navigation.getParam( 'param1') , 
                           'param2': navigation.getParam( 'param2') });
                         
                         }}/>
                        <Text style = {{color : Colors.white ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light'}} onPress={() => 
                         {
                          
                          navigation.navigate('Podcast',
                          {'param1': navigation.getParam( 'param1') , 
                           'param2': navigation.getParam( 'param2') });
                         
                         }}
                        >{podcast}</Text>
                      
                      </View>
                        </TabHeading>}>
                        <View style = {styles.view}>
                     
                        </View> 
                        </Tab>
  
                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : Colors.tapcolor }}> 
                      <View style={{flexDirection : 'column'}}> 
                        <Icon name="chat" type = "Entypo" style={{color: Colors.white , marginLeft : 8 ,  fontSize :  25 }} 
                         onPress={() => 
                         {
                          
                          navigation.navigate('Chat',
                          {'param1': navigation.getParam( 'param1') , 
                           'param2': navigation.getParam( 'param2') });
                         
                         }}/>
                        <Text style = {{color : Colors.white ,  
                          fontFamily : 'ArbFONTS-GE-SS-Two-Light'}}
                          onPress={() => 
                            {
                            
                              navigation.navigate('Chat',
                              {'param1': navigation.getParam( 'param1') , 
                               'param2': navigation.getParam( 'param2') });
                             
                            }}
                           >{chat}</Text>
                      
                      </View>
                        </TabHeading>}>
                        <View style = {styles.view}>
                     
                        </View> 
                        </Tab>
  
                         </Tabs>
                         </View>


                          </ScrollView>
                        
                          </ImageBackground> 
                            </View>
      );
    
    }

  HomeScreen.navigationOptions = navigationData =>
  {
    return { header: null };
  }

  const styles = StyleSheet.create({
 screen :
 { flex : 1   , justifyContent : 'center' , alignItems : 'center'
 },
 
 card : 
{
borderRadius : 30 , backgroundColor : 'white'  , width : '90%' , height : '90%'  , 
justifyContent : 'center' , alignItems : 'center' , padding : 5 , borderBottomLeftRadius : 1 
},
 
 
 share :
 {
  borderRadius :20  , width : '15%' , height : '8%' 
  , textAlign : 'center'  , fontSize : 15 , marginLeft : '1%' 
 },
 
 voice :
 {
   borderRadius :20 , marginTop : '5%' , width : '15%' , height : '8%' 
   , textAlign : 'center'  , fontSize : 15 , marginLeft : '1%'
 }

});



export default  HomeScreen ;
/*    



    
                  <Tabs tabBarPosition = "bottom" tabContainerStyle = { { height : 60} }
                   tabBarUnderlineStyle = {{backgroundColor : Colors.tapcolor , height : 1}}>
                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : 'white' }}> 
                      <View style={{flexDirection : 'column'}}> 
                        <Icon name="menufold" type = "AntDesign" style={{color: Colors.tapcolor , fontSize :  35 }} 
                         onPress={() => 
                         {
                          navigation.openDrawer()
                          navigation.navigate('Menu',
                          {'param1': navigation.getParam( 'param1') , 
                           'param2': navigation.getParam( 'param2') });
                          
                         }}/>
                        <Text style = {{color : 'black'}}>{menu}</Text>
                      
                      </View>
                        </TabHeading>}>
                        <View style = {styles.view}>
                     
                        </View> 
                        </Tab>

                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : 'white' }}> 
                      <View style={{flexDirection : 'column'}}> 
                        <Icon name="playlist-music" type = "MaterialCommunityIcons" style={{color: Colors.tapcolor
                         , fontSize :  40 }} 
                         onPress={() => 
                         { navigation.navigate('Library')
                         }}/>
                        <Text style = {{color : 'black' , marginBottom : 10}}>{list}</Text>
                      
                      </View>
                        </TabHeading>}>
                        <View style = {styles.view}>
                     
                        </View> 
                        </Tab>
  
                     
                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : 'white' }}> 
                      <View style={{flexDirection : 'column'}}> 
                        <Icon name="modern-mic" type = "Entypo" style={{color: Colors.tapcolor , fontSize :  35 }} 
                         onPress={() => 
                         {
                          navigation.navigate('Podcast')
                         }}/>
                        <Text style = {{color : 'black'}}>{podcast}</Text>
                      
                      </View>
                        </TabHeading>}>
                        <View style = {styles.view}>
                     
                        </View> 
                        </Tab>
  
                        <Tab 
                        heading={ <TabHeading style = {{backgroundColor : 'white' }}> 
                      <View style={{flexDirection : 'column'}}> 
                        <Icon name="chat" type = "Entypo" style={{color: Colors.tapcolor , fontSize :  35 }} 
                         onPress={() => 
                         {
                          navigation.navigate('Chat')
                         }}/>
                        <Text style = {{color : 'black'}}>{chat}</Text>
                      
                      </View>
                        </TabHeading>}>
                        <View style = {styles.view}>
                     
                        </View> 
                        </Tab>
  
                         </Tabs>










    <Icon name="stop-circle-outline" type = "MaterialCommunityIcons" style={{color: 'orange' , marginTop : 45 , fontSize : 35 }}
     onPress = {()=> 
      {
        TrackPlayer.setupPlayer().then(async () => {

          // Adds a track to the queue
          await TrackPlayer.add([track]).then(function() {

            TrackPlayer.stop();
            ischeck('play-circle');
        });

      });
      }}/>
    return {
      headerTitle : 'Home' ,  headerStyle: {
        backgroundColor: 'black', color : 'red'
      },
      headerLeft : <Icon name="menufold" type = "AntDesign" style={{color: 'orange' , margin : 10 }}  
       onPress = {() => 
        {
          navigationData.navigation.openDrawer();
         }}/>,
      headerRight : <View style = {{flexDirection : "row"}}>
        
       
    <Icon name="login" type = "Entypo" style={{color: 'orange' , margin : 5 , 
    fontSize : 30}} 
    onPress = {OnlogOutPress}
      />
   
      </View>
      
      
    };
  }




    <View style = {{ flexDirection : 'column' , marginTop : '20%' , marginLeft : '25%'}}> 
    <Icon name="sharealt" type = "AntDesign" style={{color: '#ECF0F1' , margin : 10 , fontSize : 30 }}
    onPress = {()=>{
      if (user == undefined)
      {   props.navigation.navigate('RegisterScreen')
        
      }
      else if( user.uid)
      { 
        {forceUpdate}
        Share.open(options);
      }
      
    }}
    />
   

    <Icon name="record-voice-over" type = "MaterialIcons" style={{color: '#ECF0F1' , margin : 10 , fontSize : 30 }}
    onPress = {()=>{
      if (user == undefined)
      {
           //  Alert.alert('User')
           props.navigation.navigate('RegisterScreen') 
      }
      else 
      {
        {forceUpdate}
           props.navigation.navigate('VoiceRecorder')
      }
    
    }}  />
    </View>
    
  
        

  */

/**
 * 
 * {
    "id": "1111",
    "url": "https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj",
    "title": "Longing",
    "artist": "David Chavez",
    "artwork": "https://picsum.photos/200"
  },
  {
    "id": "2222",
    "url": "https://drive.google.com/uc?export=download&id=1VM9_umeyzJn0v1pRzR1BSm9y3IhZ3c0E",
    "title": "Soul Searching (Demo)",
    "artist": "David Chavez",
    "artwork": "https://picsum.photos/200"
  },
  {
    "id": "3333",
    "url": "https://drive.google.com/uc?export=download&id=1bmvPOy2IVbkUROgm0dqiZry_miiL4OqI",
    "title": "Lullaby (Demo)",
    "artist": "David Chavez",
    "artwork": "https://picsum.photos/200"
  },
  {
    "id": "4444",
    "url": "https://drive.google.com/uc?export=download&id=1V-c_WmanMA9i5BwfkmTs-605BQDsfyzC",
    "title": "Rhythm City (Demo)",
    "artist": "David Chavez",
    "artwork": "https://picsum.photos/200"
  }


TrackPlayer.add([track, track2]).then(function() {
    // The tracks were added
});

//   <Text style={{color : 'orange' , marginTop :'15%' , marginRight : 5}}>Out</Text>



 <Tab 
                        heading={ <TabHeading style = {{backgroundColor : 'white' }}> 
                      <View style={{flexDirection : 'column'}}> 
                      
                        <Icon name="livestream" type = "Fontisto" style={{color: Colors.tapcolor , fontSize :  30 }}
                        onPress = {()=> {Alert.alert(
                          'Alert Title',
                          'My Alert Msg',
                            [
                              {text: 'Ask me later', onPress : () => console.log('Ask me later pressed')},
                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ]
                        )}}/>
                        <Text style = {{color : 'black'}}>Live</Text>
                      
                      </View>
                        </TabHeading>}>
                        <View style = {styles.view}>
                       
       
                        </View> 
                        </Tab>

 */