import React  , { Component} from 'react';
import { StyleSheet,View,Text, TouchableOpacity , TextInput , ImageBackground , ToastAndroid } from 'react-native';
import Colors from '../constant/color';
import firebase from '../Navigation/Config';
import Orientation from 'react-native-orientation-locker';
import DialogProgress from 'react-native-dialog-progress';


const options = {
  title:"",
  message:"Please wait .....",
  isCancelable:true
}

class Song extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      visible : true , writesong : ''
    };
  }
  static navigationOptions = {header: null }
  
componentDidMount()
{
  Orientation.lockToPortrait();
}


validation_check =()=>
{
    const { writesong } = this.state ;
    if(writesong == "")
    {   ToastAndroid.showWithGravityAndOffset(
        'Song is Empty',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
        );

        return false ;
    }
    return true ;
  }
  render()
    {
      return (
     <View style={styles.container}>
 
     <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/Request.jpg'}} 
         style={{width: '100%', height : '100%'}} >     
 
 
 <TextInput style={ styles.input}
          placeholder="write Song here..." placeholderTextColor = {Colors.white}
          onChangeText = {(value)=> this.setState({writesong : value})}
          value = {this.state.writesong}

          />
 
 <TouchableOpacity style = {styles.button}>
           <Text style = {{  alignSelf : "center" , color : Colors.white , padding : 5 , fontSize : 20 , 
           fontFamily : 'ArbFONTS-GE-SS-Two-Light' }}
       
       onPress={() => {

        if (this.validation_check())
        { 
          DialogProgress.show(options)
        var user = firebase.auth().currentUser ;

        firebase.database().ref(`USER-Song/${user.uid}`).set(
          {
              email : user.email,
              writesong : this.state.writesong,
             
          }) 
        .then(()=>{
          this.props.navigation.navigate('HomeScreen') 
          this.setState({ visible : false })
          ToastAndroid.showWithGravityAndOffset(
          'Thanks.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
          );
         // alert("User" + user.uid);
          DialogProgress.hide();  
          
  }).catch((e)=>{

    ToastAndroid.showWithGravityAndOffset(
      'Something wrong.',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
      );
  
  });
}
       
      }}

       >
               Send </Text>
            </TouchableOpacity>


     </ImageBackground>
    
 
        </View>
      );

    }
     
 
  }

const styles = StyleSheet.create({
 screen :
 {
   flex : 1
 } ,

 input: {  
  borderWidth : .5  , padding : 10 , borderColor : Colors.white   , height : '8%'
  , borderRadius : 20 , marginTop : '120%' , marginLeft : '15%' , marginRight : '15%' 
  , textAlign : 'center' , fontSize : 15 , width : '70%' , color : Colors.white
   
},
button :
        {
          borderWidth : .5   , borderColor : Colors.white , width : 100 , margin : 10 
          , borderRadius : 20 , marginTop : '5%' , marginLeft : '35%' , marginRight : '5%' , height : 40 
          , textAlign : 'center' , color : '#ECF0F1' , 
        } , 
});

export default Song ;
