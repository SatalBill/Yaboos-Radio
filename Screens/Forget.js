import React , {Component , useEffect }from 'react';
import { StyleSheet , View , Text , Image  , TextInput , ToastAndroid  , Alert , BackHandler , ImageBackground
    , TouchableOpacity, Modal } from 'react-native';
import firebase from '../Navigation/Config';
import Colors from '../constant/color';
import Orientation from 'react-native-orientation-locker';
import DialogProgress from 'react-native-dialog-progress';


const options = {
  title:"",
  message:"Please wait .....",
  isCancelable:true
}
var user = firebase.auth().currentUser ;  
    
 class Forget extends Component 
{
    
    constructor(props)
    {
      
        super(props);
        this.state = {  email : '' , btn : '' ,
        emailplaceholder : '' , alert : '' , empty : '' , error : ''

      };
        console.disableYellowBox = true;
    }
    
    static navigationOptions = {header: null };



    componentWillMount() 
    {
     Orientation.lockToPortrait();
      const param1 = this.props.navigation.getParam( 'param1');
      const param2 = this.props.navigation.getParam('param2');
     
     // alert(item)
     switch ( param1 || param2 ) {
       case 'param1' :
      //  alert(itemId)
        this.setState({
          emailplaceholder : 'الايميل' , btn : 'إرســــال' , alert : 'يرجى مراجعة الحساب' ,
          empty : 'الايميل مطلوب' , error : 'يوجد خطأ!'
        })
         break;

         case 'param2' :
      //    alert(item) 
         this.setState({
            emailplaceholder : 'Email' , btn : 'Confirm' , alert : 'Please Check your Email..' ,
            empty : 'Email required' , error : 'Something wrong !'
              })
           break;

       default:
         break;
     }
      }

      
    forgotPassword = () => {
      if( this.state.email === '')
      {
        ToastAndroid.showWithGravityAndOffset(
          this.state.empty,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
          );
      }
      else
      {
       DialogProgress.show(options); 
      firebase.auth().sendPasswordResetEmail(this.state.email)
        .then(()=> {
          ToastAndroid.showWithGravityAndOffset(
            this.state.alert,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
            );
            
            this.props.navigation.navigate('LoginScreen');
            DialogProgress.hide();
        }).catch(function (e) {
          ToastAndroid.showWithGravityAndOffset(
            this.state.error,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
            );
        })
      }
      }

render() {
    return (
   
            <View style = { styles.view }> 
     
     
        <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/beats.jpg'}} 
         style={{width: '100%', height : '100%'}} >     
      <View style ={{ flexDirection : 'column' , marginTop : '10%' , alignItems : 'center' }}>

      <Image source={ {uri : 'http://demo.ezicodes.com:8080/images/Img/logo.png'}} 
         style={{width: '70%', height : '30%'  , marginBottom : '30%'}} >     
             </Image>
              <TextInput style={ styles.input}
                placeholder={this.state.emailplaceholder} placeholderTextColor = {Colors.white}
                onChangeText = {(value)=> this.setState({email : value})}
                value = {this.state.email}
                keyboardType = "email-address"

                />

              <TouchableOpacity style = {styles.button}>
           <Text style = {{  alignSelf : "center" , color : Colors.white , fontSize : 18 ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light' }}
            onPress = {this.forgotPassword}>
             {this.state.btn} </Text>
           
            </TouchableOpacity>
     </View>
             </ImageBackground>
                    </View> 
     
            );
        }
        }


const styles = StyleSheet.create(
    {
        view :
        {
            backgroundColor : 'white' , flex :  1 , 

        },
        input: {  
            borderWidth : .5  , padding : 10 , borderColor : Colors.white 
          , borderRadius : 20  , marginLeft : '20%' , marginRight : '20%' 
          , textAlign : 'center' , fontSize : 15 , width : '70%' , color : Colors.white
           
        },
        button :
        {    padding : 10 , borderColor : Colors.white 
          , marginTop : '10%' , marginLeft : '5%' , marginRight : '5%' 
          , textAlign : 'center' , color : '#ECF0F1' , fontSize : 15 , width : '40%'
         } , 
        txt : 
        {
            alignSelf : "center" , fontSize : 18 
            
          }
    
    });
    
    export default Forget ;
 