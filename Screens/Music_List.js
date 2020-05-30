import React  , { useEffect , useState} from 'react';
import { StyleSheet,View,FlatList,  Text , ImageBackground  , ToastAndroid , TextInput , ScrollView ,
  PermissionsAndroid , Alert , TouchableOpacity  , Image} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Icon   } from 'native-base';
import  Colors  from '../constant/color';
import RNFetchBlob from 'rn-fetch-blob' ;
import TrackPlayer from 'react-native-track-player';

const data =  [
  {
    title : 'Soul Searching' , url : 'https://drive.google.com/uc?export=download&id=1VM9_umeyzJn0v1pRzR1BSm9y3IhZ3c0E' ,
     artist : 'David Chavez ' 
  },{
    title : 'Longing' , url : 'https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj' , 
    artist : 'David Chavez' 
  },{
    title : 'Lullaby ' , url : 'https://drive.google.com/uc?export=download&id=1bmvPOy2IVbkUROgm0dqiZry_miiL4OqI' , 
    artist : 'David Chavez' 
  },{
    title : 'Rhythm City' , url : 'https://drive.google.com/uc?export=download&id=1V-c_WmanMA9i5BwfkmTs-605BQDsfyzC' ,
     artist : 'David Chavez' 
  },
  {
  title : ' قمرين ولا عينين' , url : 'https://drive.google.com/uc?export=download&id=1VM9_umeyzJn0v1pRzR1BSm9y3IhZ3c0E' ,
   artist : 'عمرو دياب' 
},{
  title : 'Longing' , url : 'https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj' , 
  artist : 'David Chavez' 
},{
  title : 'Lullaby ' , url : 'https://drive.google.com/uc?export=download&id=1bmvPOy2IVbkUROgm0dqiZry_miiL4OqI' , 
  artist : 'David Chavez' 
},{
  title : 'Rhythm City' , url : 'https://drive.google.com/uc?export=download&id=1V-c_WmanMA9i5BwfkmTs-605BQDsfyzC' ,
   artist : 'David Chavez' 
}
];  


const Music_List = ({navigation}) =>
{
     
const [data_response , isdata_response ] =  useState('')
const [image , isimages ] =  useState([{uri: ''},  
{uri: ''}, 
{uri: ''},])


const [ arr  , isarr ] =  useState([]);
const [header , isheader ] =  useState('');
const [check , ischeck ] =  useState('play');
const [text , istext ] =  useState('');
const [artist , isartist ] =  useState('');
const [url , isurl ] =  useState('');
      
Music_List.navigationOptions = navigationData =>
      {
        return { header: null };
      }
   
  useEffect(() => {
    Orientation.lockToPortrait();
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
    
  }, []);
  
  
  const requestToPermissions = async () => {
    try {
     
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Yaboos Music',
          message:
            'App needs access to your Files... ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      
        ToastAndroid.showWithGravityAndOffset(
          'Start Download...' ,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
          );
      
        RNFetchBlob.config({
          fileCache: true,
          appendExt: 'mp3',
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: 'Yaboos' + " " + text   ,
            path: RNFetchBlob.fs.dirs.DownloadDir + `${text}`, // Android platform
            description: 'Downloading the file',
          },
        })
          .fetch('GET', 'http://demo.ezicodes.com:8080/images/Img/OpeningInsertTEST.mp3')
          .then(res => {
           // alert('res', res);
           // alert('The file is save to ', res.path());
          });
    
      }
    } catch (err) {
      alert(err);
    }
  };
  
  
   return (
  <View>
       <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/music.jpg'}} 
          style={{width: '100%', height : '100%'}}>  

     <View style= {{ flexDirection : 'row' , marginTop : '-2%' , justifyContent : 'center' ,
      alignItems : 'center'}}>
   <Icon name='play' type = "Fontisto" style={{color: '#0b5959' 
    ,justifyContent : 'center' ,alignItems : 'center' 
   , fontSize : 25  , marginTop : '17%', marginLeft : '10%'}}/>
     
     <Text style ={{ color : Colors.white , fontSize : 24  , alignSelf : 'center' , 
     marginLeft : '30%' ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light' }}> Artist Name</Text>
 
      </View>

      <View style = {{ justifyContent : 'center' , alignItems : 'center' , marginTop : '40%'}}>
        
   <Text style ={{ color : Colors.white , fontSize : 24 , margin : 5 ,
      fontFamily : 'ArbFONTS-GE-SS-Two-Light' , }}>{text}</Text>  
      <Text style ={{ color : Colors.white , fontSize : 18 , marginTop : '1%' ,
   fontFamily : 'ArbFONTS-GE-SS-Two-Light', }}>{artist}</Text>     

</View>


      <ScrollView style ={{  height : '100%' , padding : 5 , marginRight : '1%'  ,
 marginLeft : '1%',  marginBottom : '10%' }}>
  
      
<View>

         <FlatList  data={data}  keyExtractor={(item, index) => index.toString()}
                    renderItem={({item , index }) =>  
                    <TouchableOpacity 
                    onPress = {()=>{
                   // alert(item.title)                        
                   
                   ischeck('pausecircle');
                   istext(item.title);
                   isartist(item.artist);
                   isurl(item.url);
                   if (check === 'pausecircle')
                    {
                      ischeck('play')
                    
                       TrackPlayer.destroy();
                    }
             
                    if(check === 'play')
                    {
                          
                    TrackPlayer.setupPlayer().then(async () => {
                      // Adds a track to the queue
                      await TrackPlayer.add([{id: "1111",
                      url: item.url,
                      title: item.title,
                      artist: item.artist ,
                      artwork: 'http://demo.ezicodes.com:8080/images/Img/yaboos.png'}]).then(function() {
                        TrackPlayer.play();
                        TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
                        TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
                        TrackPlayer.addEventListener('remote-stop', () => {
                          if(TrackPlayer.STATE_STOPPED)
                          {
                            TrackPlayer.stop();
                            ischeck('play');
                            
                            istext('');
                            isartist('');
                          }
                           
                        }); 
                          });
                          });
                        }
                   
                  }}
                    >             
              <View>
                           
                    <View style ={{ margin : 5 , height : 60 , flexDirection : 'row'}}>
                          
                   <Icon name="dot-single" type = "Entypo" style={{color: Colors.white , marginTop : '7%'   
                 , fontSize : 30  , }}/>
                   
                   <View style={{ flexDirection : 'row'}}>
                    <Text style={{ color : Colors.white  ,fontFamily : 'ArbFONTS-GE-SS-Two-Light',
                     marginLeft : '5%', marginTop : '10%', width : 100 , height : 50 }}>
                       {item.title}</Text>  
                    
                    <Text style={{ color : Colors.white  ,fontFamily : 'ArbFONTS-GE-SS-Two-Light',
                     marginLeft : '5%', marginTop : '10%' , width : 100 , height : 50 ,  
                     }}>{item.artist}</Text>  
                 
                   <Icon name="hearto" type = "AntDesign" style={{color: Colors.white , marginTop : '10%'   
                 , fontSize : 25  , marginLeft : '5%' }}
                 onPress = {( )=>{
                   isarr(item.title)
                   navigation.navigate('Favourites', {'title': item.title , 'url' : item.url ,
                   'artist' : item.artist, 
                  });
                 }}/>
                
                <Icon name="download" type = "AntDesign" style={{color: Colors.white , marginTop : '10%'   
                 , fontSize : 25 ,marginLeft : '3%' }}
                  onPress = {requestToPermissions}/>
                   
                   
                    </View>
                
                 
                   
                       </View>
                       <View style={{ width: '100%'  , height: .5 , 
                backgroundColor: Colors.white , marginTop: 20}} />
                
                       </View>
                       </TouchableOpacity> 
                    }/>
                </View>

                    </ScrollView>
  
  
 </ImageBackground>
 
     </View>
   );

   } 

   const styles = StyleSheet.create({
 screen :
 {
 flex : 1 , justifyContent : 'center' ,alignItems : 'center'
 } ,
textStyle: {
  padding: 10 
},
textInputStyle: {
  height: 40, marginLeft : '15%' ,
  borderRadius : 20 ,
  borderWidth: .4,
  color : Colors.white,
  paddingLeft: 10,
  borderColor: Colors.white,
},
 headerText: {
   fontSize: 20,
   textAlign: "center",
   margin: 10,
 },
 GridViewTextLayout: {
  fontSize: 20,
  fontFamily : 'ArbFONTS-GE-SS-Two-Light',
  justifyContent: 'center',
  color: Colors.tapcolor,
  padding: 10,
 }
 });
 
 export default Music_List ;

