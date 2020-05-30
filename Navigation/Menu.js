
import React , { Component} from 'react' ;
import { View , StyleSheet , Platform  , Text  , ImageBackground  ,  Linking , NativeModules} from 'react-native';
import  Colors from '../constant/color'; 
import { Icon } from 'native-base' ;
import {  getLanguages } from 'react-native-i18n';
import { withNavigation } from 'react-navigation';

const  urlsite  = 'http://yaboos.fm/';
let phoneNumber = '25723333';

class Menu extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
     arr : [] , 
     locale :'' , 
     arrow : '' , 
     record : '' ,
     issoon :' ' ,
     issoong : ' ' ,
     iscall : '' ,
     issend :'' ,
     iswebsite : '' ,
       
    }
  }

  componentWillMount ()
    {
     getLanguages().then(languages => {
     // alert(languages) // ['en-US', 'en']
      this.setState({
        locale : languages ,
        arr : languages
      })
    })
      if (this.state.locale === "ar-EG" )
      {
        this.setState({
          arrow : 'arrow-right'
        })
      }
      else 
      {
        this.setState({
          arrow : 'arrow-left'
        })
      }
      
      const  param1  = this.props.navigation.state.param1  ;
      const  param2  = this.props.navigation.state.params ;
     // alert( "hegazy : " + param2 )
    
      switch ( param1 || param2 ) {
       case param1 :
        this.setState({
     record : 'تسجيل صوتي' ,
     issoon :'قريبا بالأسواق' ,
     issoong : 'تطلب أغنية' ,
     iscall : 'إتصال' ,
     issend :'إرسال' ,
     iswebsite : 'الموقع' ,
     
        })
         break;

         case param2 :
         this.setState({
          record : 'Recording Voice',
          issoon :'Coming Soon',
          issoong : 'Request Song' ,
          iscall : 'Call' ,
          issend : 'Send' ,
          iswebsite : 'WebSite'
          
          })
           break;

       default:
         break;
     }

    }

  handleEmail = async () => {
    const to = ['info@yaboos.com']
    let url = `mailto:${to}`;
    // check if we can use this link
    const canOpen = await Linking.openURL(url);
  
    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }
  
    return Linking.openURL(url);
  }
  

  calling ()
  {
  if (Platform.OS !== 'android') {
  phoneNumber =  `telprompt:${phoneNumber}`;
  }
  else  {
  phoneNumber = `tel:${phoneNumber}`;
  }

  Linking.openURL(phoneNumber)
  .then(supported => {
  if (!supported) {
      Alert.alert('Phone number is not available');
    } else {
      return Linking.openURL(phoneNumber);
  }
  })
  .catch(err => console.log(err));
}




    render() {
  
      return (
  
        <View style={styles.sideMenuContainer}>
        <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/menu.jpg'}} 
         style={{width: '100%', height : '100%' , marginTop : -20}}>  
       
       <Text style = {{ fontSize : 18 , color : Colors.white ,  marginTop : 10, fontStyle : 'italic' , 
       marginRight : '20%' , fontFamily : 'ArbFONTS-GE-SS-Two-Light' }}>    Main Menu</Text>
 
       <View style={{ width: '90%',  marginLeft : 15  , height: 2 , backgroundColor: Colors.white , marginTop: 15}} />
       <Text style = {{ fontSize : 17 , color : Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light', margin : 10 , fontStyle : 'italic'  ,
        marginRight : '40%' }}>Yaboos Radio</Text>
      
                      <View style={{flexDirection : 'row' , margin : 5 , marginRight : 45 }}> 
                        <Icon name="music-note" type = "Fontisto" style={{color: Colors.white , fontSize :  30 }} 
                         onPress={() => {}} />
                        <Text style = {{color :  Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light' ,fontSize : 15 , marginLeft : 15 , margin : 5}}
                        onPress = {()=> {this.props.navigation.navigate('Song') }}>
                        Request Song</Text>
                      
                      </View>
                    
       <Text style = {{ fontSize : 17 , color : Colors.white , margin : 10 ,fontStyle : 'italic',  marginRight : '55%' }}>Contact</Text>
      
       <View style={{flexDirection : 'row' , margin : 5 , marginRight : '50%' }}> 
                        <Icon name="phone-call" type = "Feather" style={{color: Colors.white , fontSize :  30 }} 
                         onPress={() => {}} />
                        <Text style = {{color :  Colors.white ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light',fontSize : 15 , margin : 5 , marginLeft : 10}}
                        onPress = {this.calling}>
                          Call</Text>
                      
                      </View>
                      <View style={{flexDirection : 'row' , margin : 5 , marginRight : '45%' }}> 
                        <Icon name="email" type = "Fontisto" style={{color: Colors.white , fontSize :  30 }} 
                         onPress={() => {}} />
                        <Text style = {{color :  Colors.white ,fontFamily : 'ArbFONTS-GE-SS-Two-Light' ,  fontSize : 15 , margin : 5 , marginLeft : 10}}
                        onPress = {this.handleEmail}>
                          Send</Text>
                      
                      </View>

                      <View style={{flexDirection : 'row' , margin : 5 , marginRight : '45%' }}> 
                        <Icon name="share-outline" type = "MaterialCommunityIcons" style={{color: Colors.white , fontSize :  30 }} 
                         onPress={() => {}} />
                        <Text style = {{color :  Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light' ,  fontSize : 15 , margin : 5 , marginLeft : 10}}
                        onPress = {()=>{ this.props.navigation.navigate('Share')}}>
                        
                          Share</Text>
                      
                      </View>


                      <View style={{flexDirection : 'row' , marginTop : 10  , marginBottom : 10 
                      ,  margin : 5 , marginRight : '45%' }}> 
                        <Icon name="info" type = "Feather" style={{color: Colors.white , fontSize :  30 }} 
                         onPress={() => {}} />
                        <Text style = {{color :  Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light' , fontSize : 15 , margin : 5 , marginLeft : 10}}
                        onPress = {()=>{
                          this.props.navigation.navigate('About_us') 
                         
                        }}>
                          About</Text>
                      
                      </View>                     
                   
                      <View style={{flexDirection : 'row' , marginLeft : '84%' , marginTop : '-5%' }}> 
                        <Icon name={this.state.arrow} type = "Feather" style={{color: Colors.white , fontSize :  40 }} 
                          onPress={() => this.props.navigation.closeDrawer()} />
                      </View>
   
                      <View style={{flexDirection : 'row' , margin : 5 , marginTop : -20 ,  marginRight : '40%' }}> 
                        <Icon name="house-damage" type = "FontAwesome5" style={{color: Colors.white , fontSize :  25 }} 
                         onPress={() => {}} />
                        <Text style = {{color :  Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light', fontSize : 15 , margin : 5 , marginLeft : 10}}
                         onPress = {()=>{
            
                          Linking.canOpenURL(urlsite).then(supported => {
                            if (!supported) {
                              alert('Can\'t handle url: ' + url);
                            } else {
                              return Linking.openURL(urlsite);
                            }
                          }).catch(err => console.error('An error occurred', err));
                          this.props.navigation.navigate('HomeScreen') 
                          
                         }}>
                          Website</Text>
                      
                      </View>
                   
                      <Text style = {{ fontSize : 17 ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light',color : Colors.white , margin : 10 , 
                       marginRight : '25%' , fontStyle : 'italic'}}>Yaboos Programs</Text>
      
      <View style={{flexDirection : 'row' , margin : 5 , marginRight : '25%' }}> 
                       <Icon name="modern-mic" type = "Entypo" style={{color: Colors.white , fontSize :  30 }} 
                        onPress={() => {}} />
                       <Text style = {{color :  Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light', 
                       fontSize : 15 , margin : 5 , marginLeft : 10}} 
                       onPress = {()=>{
                        this.props.navigation.navigate('Podcast')}}
                       >
                         Prodcast</Text>
                     
                     </View>

                     <View style={{flexDirection : 'row' , margin : 5 , marginRight : '25%' }}> 
                       <Icon name="playlist-music" type = "MaterialCommunityIcons" style={{color: Colors.white , fontSize :  30 }} 
                        onPress={() => {}} />
                       <Text style = {{color :  Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light', fontSize : 15 ,
                        margin : 5 , marginLeft : 10}} onPress = {()=>{
                          this.props.navigation.navigate('Library')
                        }}>
                        Library</Text>
                     
                     </View>

                     <View style={{flexDirection : 'row' , margin : 5 , marginTop : 40 , marginRight : '45%' }}> 
                        <Icon name="closecircleo" type = "AntDesign" style={{color: Colors.white , fontSize :  25 }} 
                         onPress={() => {}} />
                        <Text style = {{color :  Colors.white ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light' ,fontSize : 15 , margin : 5 , marginLeft : 10}}
                        onPress = {()=>{ this.props.navigation.navigate('Logout')}}>
                          Logout</Text>
                      
                      </View>
                     
                      </ImageBackground>

      </View>
      
      );
    }
}

const styles = StyleSheet.create({
   
    MainContainer: {
 
        flex: 1,
      
        alignItems: 'center',
        justifyContent: 'center',
     
      },
     
      sideMenuContainer: {
     
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20
      },
     
      sideMenuProfileIcon:
      {
        resizeMode: 'center',
        width: 150, 
        height: 150, 
        borderRadius: 150/2
      },
     
      sideMenuIcon:
      {
        resizeMode: 'center',
        width: 28, 
        height: 28, 
        marginRight: 10,
        marginLeft: 20
        
      },
     
      menuText:{
     
        fontSize: 15,
        color: '#222222',
        
      }
   });
   
   
export default  withNavigation( Menu) ;

/**
 * 
       <View style={{flexDirection : 'row' , margin : 5 , marginRight : 30 }}> 
                        <Icon name="settings-voice" type = "MaterialIcons" style={{color: Colors.white , fontSize :  30 }} 
                         onPress={() => {}}/>
                        <Text onPress = {() =>  this.props.navigation.navigate('Voice')} 
                        style = {{color :  Colors.white , fontSize : 15 , margin : 5}}>
      Recording Voice</Text>
                      
                      </View>

 * 


                       <View style={{flexDirection : 'row' , margin : 5 , marginRight : '12%' }}> 
                        <Icon  name="high-quality" type = "MaterialIcons" style={{color: Colors.white , fontSize :  30 }} 
                         onPress={() => {}} />
                        <Text style = {{color :  Colors.white , fontSize : 15 , margin : 5 , marginLeft : 10}}
                        onPress = {()=>{ this.props.navigation.navigate('Speed')}}>
                        
                          Quality Prodcast</Text>
                      
                      </View>

 */