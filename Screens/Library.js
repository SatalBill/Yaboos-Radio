import React  , { Component} from 'react';
import { StyleSheet,View,FlatList,  Text , ImageBackground  , ActivityIndicator , TextInput , ScrollView
   , Alert , TouchableOpacity  , Image} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Icon   } from 'native-base';
import  Colors  from '../constant/color';


const colors= [
  'white'
 ];
 const icons = [
   "hand-holding-heart" , "castle" , "leanpub"
 ];
 const iconsheader = [
   "FontAwesome5" , "MaterialCommunityIcons" , "FontAwesome5"
 ];
 
  class Lirary extends Component 
 {
   constructor(props) {
     super(props);

     this.state = {
       visible : true , header : '' , isLoading: true, text: '' , search : '', 
         GridListItems: 
         [
           { key: "ث" },{ key: "ت" },{ key: "ب" },{ key: "أ" },
           { key: "د" },{ key: "خ" },{ key: "ح" },{ key: "ج" },
           { key: "س" },{ key: "ز" },{ key: "ر" },{ key: "ذ" },
           { key: "ط" },{ key: "ض" },{ key: "ص" },{ key: "ش" },
           { key: "ف" },{ key: "غ" },{ key: "ع" },{ key: "ظ" },
           { key: "م" },{ key: "ل" },{ key: "ك" },{ key: "ق" },
           ,{ key: "ي" },{ key: "و" },{ key: "ن" },
           
           
         ]
     
     }
     
    }
  componentDidMount()
  {
    Orientation.lockToPortrait();
    
  }
 
   static navigationOptions = {header: null }
   
 
   
 render()
 { 
    return (
      this.state.isloading
      ?
      <View style={{ flex : 1 , alignItems : 'center' , justifyContent : 'center' , backgroundColor : 
      Colors.tapcolor}}> 
      <ActivityIndicator size = "large" animating  color = {Colors.white}/>
      </View>
      :

<View>
       <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/li.jpg' }} 
          style={{width: '100%', height : '100%'}}>  
     
     <View style = {{ flexDirection : 'row' ,justifyContent : 'center' , marginLeft : '5%' ,
     alignItems : 'center' , marginTop : '50%'}}>
       <Text style = {{ alignSelf : "center" ,  alignItems : 'center' ,  justifyContent : 'center' ,
       fontFamily : 'ArbFONTS-GE-SS-Two-Light',color : Colors.white , fontSize : 20 }}> 
        Find Your Favourite Song... </Text>
       
       <Icon name= 'search' type ='EvilIcons'
              style={{color: Colors.white , fontSize : 45,}}
        onPress = {() => {

          this.props.navigation.navigate('All_Music');
        }}      
              
              />

     </View>
             <ScrollView style ={{   
   marginTop : '43%' , width : '90%' , padding : 10 , borderRadius : 10 ,  
   marginLeft : '5%' , marginRight : '5%' , }}>

 <View style ={{ justifyContent : 'center', alignItems : 'center'}}>

 
 <FlatList
             data={ this.state.GridListItems }
             renderItem={ ({item , index }) =>
           
             <TouchableOpacity 
             onPress = {()=>{
                 this.props.navigation.navigate('Songers');
            }}>
               <View style={{ backgroundColor: colors[index%colors.length] ,flex:1,borderRadius : 20 ,
                   justifyContent: 'center',alignItems: 'center', width : 50,
                   height : 50 ,margin: 8, }}>
              
              
                <Text style={styles.GridViewTextLayout}> {item.key} </Text>
              
               </View> 
               </TouchableOpacity>
            
               }
             numColumns={4}

/>  
 </View>
</ScrollView>

 </ImageBackground>
 
     </View>
   );
 
 }
  
 
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
 
 export default Lirary ;
 /*

import React  , { useEffect , useState } from 'react';
import { StyleSheet,View , TouchableOpacity, TextInput,   Text , ImageBackground  , Image , ToastAndroid 
  , ScrollView , FlatList , PermissionsAndroid } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Colors from '../constant/color'; 
import { Icon } from 'native-base' ;

 
  const Favourites = ({navigation}) =>
{

  const [ data  , isdata ] =  useState([{
    title : '' , url : '' , artist : ''
  }]);
  const [header , isheader ] =  useState('');
  const [check , ischeck ] =  useState('play');
  const [text , istext ] =  useState('');
  const [artist , isartist ] =  useState('');
  const [url , isurl ] =  useState('');



  Favourites.navigationOptions = navigationData =>
      {
        return { header: null };
      }


      useEffect(() => {

Orientation.lockToPortrait();   
   
const  title = navigation.getParam('title');
const  url = navigation.getParam('url');
const  artist = navigation.getParam('artist');
 
 isdata([ {
   title : title , url : url ,artist : artist
 }])
   
  }),[]; 

      return (
     <View style={styles.screen}>
  <ScrollView> 
      
      <View style ={{  height : '100%' , padding : 5 , marginRight : '1%' , marginLeft : '1%',  marginBottom : '10%'}}>
      
               <FlatList  data={data}  keyExtractor={(item, index) => index.toString()}
                          renderItem={({item , index }) =>  
                          <TouchableOpacity 
                          onPress = {()=>{
                         // alert(item.title)                        
                      
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
                       
                         <Icon name="delete" type = "AntDesign" style={{color: Colors.white , marginTop : '10%'   
                       , fontSize : 25  , marginLeft : '5%' }}
                       onPress = {( )=>{
                       
                       }}/>
                  
                          </View>
                      
                             </View>
                             <View style={{ width: '100%'  , height: .5 , 
                      backgroundColor: Colors.white , marginTop: 20}} />
                      
                             </View>
                             </TouchableOpacity> 
                          }/>
                      </View>
      
                          </ScrollView>
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

import React  , {  useEffect , useState  } from 'react';
import { StyleSheet,View , TouchableOpacity, TextInput,   Text , ImageBackground  , Image , ToastAndroid 
  , ScrollView , FlatList , PermissionsAndroid } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Colors from '../constant/color'; 
import { Icon } from 'native-base' ;
import TrackPlayer from 'react-native-track-player';
import { SliderBox } from "react-native-image-slider-box";
import RNFetchBlob from 'rn-fetch-blob' ;


const Library = ({navigation}) =>
{
  
  const images = [{uri: 'http://demo.ezicodes.com:8080/images/Img/Banner1.jpg'},  
  {uri: 'http://demo.ezicodes.com:8080/images/Img/Banner2.jpg'}, ];
  
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
      
      Library.navigationOptions = navigationData =>
      {
        return { header: null };
      }
      const api_ads = () => 
      {
       
      fetch("http://demo.ezicodes.com:8080/images/ads.json")
      .then(response => {
          if (!response.ok) {    
              throw new Error(                    
                  "HTTP status " + response.status 
              );                               
          }                  
                             
          return response.json(); 
                          
      })
      .then(dataSource => {                       
       
        isdata_response(dataSource ) ;                      
        isimages([{uri: data_response[0].Image},  
        {uri: data_response[1].Image}, 
        {uri: data_response[2].Image},]);
        
  //      alert(data_response[0].ID + data_response[0].Name);
      })
      .catch(error => {
       /* ToastAndroid.showWithGravityAndOffset(
          'something wrong !!' ,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
          );
          
      });
    }
  
  useEffect(() => {
    api_ads();
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
    
    const  param1 = navigation.getParam('param1');
    const  param2 = navigation.getParam('param2');
     
       switch ( param1 || param2 ) {
         case 'param1' :
         
            isheader('قريبا') 
          
         
           break;
    
           case 'param2' :
            isheader('Coming Soon') 
             break;
    
         default:
           break;
       }
      
//<Image source={require('../constant/wav.gif')}  style ={{ width : '100%' , marginTop : '5%' , height : 80 }} /> 
 

  }),[]; 
  
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
    //  alert(err);
    }
  };
  
      return (
     <View style={styles.screen}>
           <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/home.jpg'}} 
         style={{width: '100%', height : '100%'}}> 
   
         
      <View style={{flexDirection : 'column' , margin : 5 , marginTop : '35%' , 
      justifyContent : 'center' , alignItems : 'center'}}> 
   
   <TextInput style={ styles.input}
        placeholder= 'Artist Name..' placeholderTextColor = {Colors.white}
        keyboardType = "email-address"

        />
   
   <Icon name="search1" type = "AntDesign" style={{color: Colors.white , marginTop : '10%'   
                 , fontSize : 25  , marginLeft : '75%' ,marginTop : '-11%' , marginBottom : '2%' }} 
                  onPress = {()=>{
                  alert('Not worked yet')
                 }}/>
   
   <Text style ={{ color : Colors.white , fontSize : 18 , margin : 5 , marginTop : '5%' ,
   fontFamily : 'ArbFONTS-GE-SS-Two-Light', }}>{artist}</Text>
   <Text style ={{ color : Colors.white , fontSize : 24 , margin : 5 ,
      fontFamily : 'ArbFONTS-GE-SS-Two-Light' , }}>{text}</Text>
      </View>
                      
      <ScrollView> 
      
<View style ={{  height : '100%' , padding : 5 , marginRight : '1%' , marginLeft : '1%',  marginBottom : '10%'}}>

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
                    <View style={{ width : '100%' , marginTop : '5%' , height : '10%' , marginBottom : '5%'}}>
          
          <SliderBox images={image} autoplay circleLoop backgroundColor = {'white'}
       resizeMode={'cover'}
       sliderBoxHeight={'100%'}  dotColor={Colors.tapcolor}
       inactiveDotColor="white"
       dotStyle={{
         width: 5,
         height: 5,
         borderRadius: 10,
         marginHorizontal: 5,
       }}
       />

    </View>
    
     
        </ImageBackground> 
        </View>
      );

}    
 


const styles = StyleSheet.create({
screen :
{
flex : 1 , justifyContent : 'center' ,alignItems : 'center' , //backgroundColor : Colors.tapcolor
} ,
input: {  
  borderWidth : .5  , padding : 10 , borderColor : Colors.white 
, borderRadius : 10  , marginLeft : '2%' , marginRight : '2%' , fontFamily : 'ArbFONTS-GE-SS-Two-Light'
 , fontSize : 18 , width : '95%' , color : Colors.white
 
},
});

export default Library ;
*/