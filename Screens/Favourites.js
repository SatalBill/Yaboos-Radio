
import React  , { Component} from 'react';
import { StyleSheet,View,BackHandler,  Text , ImageBackground  } from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Icon } from 'native-base' ; 
import Colors from '../constant/color';
import TrackPlayer from 'react-native-track-player';
import Orientation from 'react-native-orientation-locker';

 class Favourites extends Component 
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

export default Favourites ;
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
*/ 