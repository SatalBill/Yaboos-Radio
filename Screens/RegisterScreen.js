import React , {Component}from 'react';
import { StyleSheet , View , Text , Image  , TextInput,  ImageBackground  , ScrollView ,ToastAndroid
    , TouchableOpacity,  Alert, Modal } from 'react-native';
import firebase from '../Navigation/Config';
import Colors from '../constant/color';
import Orientation from 'react-native-orientation-locker';
import DialogProgress from 'react-native-dialog-progress';


const options = {
  title:"",
  message:"Please wait .....",
  isCancelable:true
}
class RegisterScreen extends Component 
{
    
    constructor(props)
    {
        super(props);
        this.state = { username : '' , email : '' , password : '' , confirmpassword : '' , modalvisiable : true , 
        emailplaceholder : '' ,passwordplaceholder : '' ,confirmplaceholder : '' ,login_account : '' ,
        Submit :  '' ,
        user_name : '' ,
        email_valid : '' ,done : '' ,Something : '' ,
        email_require : '' ,email_correct : '', 
        user_require : '', passwordrequire :  '' ,
        char : '' , pass_match : ''



      }
        console.disableYellowBox = true;
        
    }
    static navigationOptions = {header: null}

    componentWillMount ()
    {
Orientation.lockToPortrait();
const  param1 = this.props.navigation.getParam('param1');
const  param2 = this.props.navigation.getParam('param2');
    
switch ( param1 || param2 ) {
       case param1 :
        this.setState({
          emailplaceholder : 'الايميل' ,
          passwordplaceholder : 'الرقم السرى' ,
          confirmplaceholder : 'تأكيد الرقم السرى' ,
          login_account : 'هل لديك حساب ؟' ,
          Submit :  'دخـــــول' ,
          user_name : 'الاسم',          
        email_valid : 'الايميل موجود بالفعل ' ,done : 'تم بنجاح' ,Something : 'يوجد خطأ' ,
        email_require : 'الايميل مطلوب' ,email_correct : 'الايميل خطأ', 
        user_require : 'الاسم مطلوب', passwordrequire :  'الرقم السري مطلوب' ,
        char : 'علي الاقل ستة أحرف ' , pass_match : 'الرقم السرى غير متطابق'

        })
         break;

         case param2 :
         this.setState({
          emailplaceholder : 'Email' ,
          passwordplaceholder : 'password' ,
          confirmplaceholder : 'confirm password' ,
          login_account : 'You already have an Account? ' ,
          Submit :  'Submit' ,
          user_name : 'Name',          
        email_valid : 'Em@il is already Exist.' ,done : 'Well Done ' ,Something : 'Something wrong.' ,
        email_require : 'Em@il is Required' ,email_correct : 'Em@il isnot Correct', 
        user_require : 'Username is Required', passwordrequire :  'Password is Required' ,
        char : 'At least 6 characters' , pass_match : 'Password dont match'

          })
           break;

       default:
         break;
     }
  
    
  }

    OnloginPress()
    {
      this.props.navigation.navigate('LoginScreen');
    }

    OnNewRegisterPress()
    {
      
        if (this.validation_check())
        {DialogProgress.show(options);
          firebase.database().ref("USERS").orderByChild("email").equalTo(this.state.email)
          .once("value",snapshot => {
            
            if (snapshot.exists()){
              DialogProgress.hide();

                ToastAndroid.showWithGravityAndOffset(
                this.state.email_valid,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
               
            }

            else 
            {

              firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
          .then(() => {
            var user = firebase.auth().currentUser ;

            firebase.database().ref(`USERS/${user.uid}`).set(
              {
                  email : this.state.email,
                  username : this.state.username,
                  password : this.state.password,
                 
              }) 
            .then(()=>{
              ToastAndroid.showWithGravityAndOffset(
              this.state.done,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
              );
             // alert("User" + user.uid);
              this.props.navigation.navigate('LoginScreen', {'param1': this.props.navigation.getParam( 'param1') , 
              'param2': this.props.navigation.getParam( 'param2')});
              DialogProgress.hide();
           //   firebase.auth().currentUser.sendEmailVerification();
            //  user.reload();
             // user.getIdToken(true);
      }).catch((e)=>{

        ToastAndroid.showWithGravityAndOffset(
          this.state.Something,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
          );
      
      });
      

    }).catch((e) => 
          {
            ToastAndroid.showWithGravityAndOffset(
              this.state.email_valid,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
              );
  
          })
      
      
            }
        });
      }
    }
        
    validation_check =()=>
    {
        const experssion = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { username , email  , password  , confirmpassword   } = this.state ;
        
         if(email == "")
        {   ToastAndroid.showWithGravityAndOffset(
            this.state.email_require,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
            );

            return false ;
        }
        
        else if (experssion.test(String(email).toLocaleLowerCase()) === false)
        {
            ToastAndroid.showWithGravityAndOffset(
                this.state.email_correct,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
            return false;
        }
        

        else if (username == "")
        {
            
            ToastAndroid.showWithGravityAndOffset(
                this.state.user_require,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
                return false ;

        }
        else if (password == "")
        {
            
            ToastAndroid.showWithGravityAndOffset(
                this.state.passwordrequire,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
                return false ;

        }
        else if (password.length < 6 )
        {
            ToastAndroid.showWithGravityAndOffset(
                this.state.char,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
    
        return false ;

        }

        else if (password !== confirmpassword )
        {
            ToastAndroid.showWithGravityAndOffset(
                this.state.pass_match,
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
       
       <View style = {styles.view} >
      
      <ImageBackground source={{ uri :'http://demo.ezicodes.com:8080/images/Img/beats.jpg'}} 
         style={{width: '100%', height : '100%'}} >     
                       
  <View style ={{ flexDirection : 'column' , marginTop : '60%'  , marginLeft : '7%' , alignItems : 'center'
   , justifyContent : 'center' , width : '85%'}}>

  <Image source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/logo.png'}} 
         style={{width: '80%', height : '40%' , marginTop : '-75%' , marginBottom : '30%'}} >     
             </Image>
        <TextInput style={ styles.input}
          placeholder={this.state.emailplaceholder} placeholderTextColor = {Colors.white}
          onChangeText = {(value)=> this.setState({email : value})}
          value = {this.state.email}
          keyboardType = "email-address"

          />

        <TextInput style={ styles.input}
          placeholder={this.state.user_name} placeholderTextColor = {Colors.white}
          onChangeText = {(value)=> this.setState({username : value})}
          value = {this.state.username}
          />
                        
       
        <TextInput style={ styles.input}
          placeholder={this.state.passwordplaceholder} placeholderTextColor = {Colors.white}
          secureTextEntry = {true}
          onChangeText = {(value)=> this.setState({password : value})}
          value = {this.state.password}
          />

        <TextInput style={ styles.input}
          placeholder={this.state.confirmplaceholder} placeholderTextColor = {Colors.white}
          secureTextEntry = {true}
          onChangeText = {(value)=> this.setState({confirmpassword : value})}
          value = {this.state.confirmpassword}
          
          />
         </View>  
        <View style = {{ flexDirection : 'column'  , alignItems : 'center' ,
           justifyContent : 'center' }}>

        <TouchableOpacity style = {styles.buttonline}
          onPress = {this.OnNewRegisterPress.bind(this)}
        
        >
           <Text style = {{ alignSelf : "center" , color : Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light' ,
            fontSize : 22 }}> {this.state.Submit}  </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{ borderBottomWidth: .5, marginTop : '5%', width : '70%' ,
             justifyContent : 'center' , borderColor: '#ffffff'}}>
           <Text style = {{  alignSelf : "center" , color : Colors.white , fontSize : 16 , fontFamily : 'ArbFONTS-GE-SS-Two-Light'}}
            onPress = {this.OnloginPress.bind(this)}
           >
               {this.state.login_account} </Text>
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
            backgroundColor : 'white' , flex :  1 

        },
        input : 
        {
            borderWidth : .5  , padding : 10 , borderColor : Colors.white  
          , borderRadius : 20 , marginTop : '3%' , marginLeft : '5%' , marginRight : '5%' 
          , textAlign : 'center'  , fontSize : 15 , width : '80%' , color : Colors.white
          
        },
        card : 
        {
          borderRadius : 15 , backgroundColor : 'white' , margin : 25 ,  
          justifyContent : 'center' , alignItems : 'center' , padding : 10 
        },

      
        button :
        {
          borderWidth : .5  , padding : 10 , borderColor : Colors.white 
          , borderRadius : 20 , marginTop : '5%' , marginLeft : '5%' , marginRight : '5%' 
          , textAlign : 'center' , color : '#ECF0F1' , fontSize : 15 , width : '40%'
        } , 

        buttonline :
        {
            marginTop : '5%',  justifyContent : 'center'  }, 
        txt : 
        {
            alignSelf : "center" , fontSize : 18  
            
          }
    
    });
  
    export default RegisterScreen ;