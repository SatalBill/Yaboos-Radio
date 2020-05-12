import React , {Component , useEffect }from 'react';
import { StyleSheet , View , Text , Image  , TextInput , ToastAndroid  , Alert , BackHandler , ImageBackground
    , TouchableOpacity, Modal } from 'react-native';
import firebase from '../Navigation/Config';
import Colors from '../constant/color';
import { LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';
import Orientation from 'react-native-orientation-locker';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import DialogProgress from 'react-native-dialog-progress';


const options = {
  title:"",
  message:"Please wait .....",
  isCancelable:true
}

let ar = '';       

 class LoginScreen extends Component 
{
    
    constructor(props)
    {
      
        super(props);
        this.state = {  email : '' , password : ''  , faceid : '' ,  selected: 1  , modalVisable : false ,
        emailplaceholder : '' , lang : '' ,
        passwordplaceholder : '' ,
        Sign_In : '' ,
        Sign_UpNow :  '' , email_valid : '' ,done : '' ,Something : '' ,
        email_require : '' ,email_correct : '', 
        user_require : '', passwordrequire :  '' ,
        char : '' , pass_match : '',
        welcome : '' ,    forget : '' ,
        userInfo: null,
        gettingLoginStatus: true,
        

      };
        console.disableYellowBox = true;
    }
    
    static navigationOptions = {header: null };
    

    OnRegisterPress()
    {
        this.setState({
            modalVisable : false 
        })

        this.props.navigation.navigate('RegisterScreen', {'param1': this.props.navigation.getParam( 'param1') , 
        'param2': this.props.navigation.getParam( 'param2')});
     
    }
   
    componentWillMount() 
    {
     Orientation.lockToPortrait();
     GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      androidClientId: '938103654268-ca7k2saq3djer2lekmcir7skt1abu1ok.apps.googleusercontent.com',
      offlineAccess: false, 
      hostedDomain: '', 
      loginHint: '', 
      forceConsentPrompt: true, 
      accountName: '',
    });
    //Check if user is already signed in
    this._isSignedIn();
  
      const param1 = this.props.navigation.getParam( 'param1');
      const param2 = this.props.navigation.getParam('param2');
      
     // alert(item)
     switch ( param1 || param2 ) {
       case 'param1' :
      //  alert(itemId)
        this.setState({
        lang : 'ArbFONTS-GE_SS_TWO_MEDIUM' , gmail : 'انطلق بواسطة الجيميل' ,
        emailplaceholder : 'الايميل' ,
        passwordplaceholder : 'الرقم السري' ,
        Sign_In : ' دخــــول' ,
        Sign_UpNow : 'إنشاء حساب' ,
        email_valid : 'الايميل موجود بالفعل ' ,Something : 'يوجد خطأ' ,
        email_require : 'الايميل مطلوب' ,email_correct : 'الايميل خطأ', 
        passwordrequire :  'الرقم السري مطلوب' ,
        char : 'علي الاقل ستة أحرف ' , welcome : 'أهلا بك', forget : 'نسيان الرقم السري؟'

        })
        ar = this.state.lang ;
         break;

         case 'param2' :
      //    alert(item) 
         this.setState({
            lang : 'GOTHIC' ,
            emailplaceholder : 'Email' , gmail : 'Start with Google Gmail' ,
            passwordplaceholder : 'Password' ,
            Sign_In : 'Sign In' ,
            Sign_UpNow : 'Sign Up Now?' ,
            welcome : 'U are Welcome',
            email_valid : 'Em@il is already Exist.' ,Something : 'Something wrong.' ,
            email_require : 'Em@il is Required' ,email_correct : 'Em@il isnot Correct', 
            passwordrequire :  'Password is Required' ,
            char : 'At least 6 characters' , forget : 'Forget Password?'
              })
              ar = this.state.lang ;
        
              break;

       default:
         break;
     }
  
     
      var user = firebase.auth().currentUser ;  
        if(user !== null)
        {
          this.props.navigation.navigate('Listen', {'param1': this.props.navigation.getParam( 'param1') , 
          'param2': this.props.navigation.getParam( 'param2')});
     
        }
        else 
      {
        null 
      }
   
      }

      _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
        /*  ToastAndroid.showWithGravityAndOffset(
            this.state.gmail,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
            );
          */  this.props.navigation.navigate('Listen', {'param1': this.props.navigation.getParam( 'param1') , 
            'param2': this.props.navigation.getParam( 'param2')});
            
         // alert('User is already signed in');
          //Get the User details as user is already signed in
          this._getCurrentUserInfo();
        } else {
          //alert("Please Login");
          console.log('Please Login');
        }
        this.setState({ gettingLoginStatus: false });
      };
    
      _getCurrentUserInfo = async () => {
        try {
          const userInfo = await GoogleSignin.signInSilently();
          console.log('User Info --> ', userInfo);
          this.setState({ userInfo: userInfo });
      
          this.props.navigation.navigate('Listen', {'param1': this.props.navigation.getParam( 'param1') , 
          'param2': this.props.navigation.getParam( 'param2')});
                     } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
           // alert('User has not signed in yet');
            console.log('User has not signed in yet');
          } else {
           // alert("Something went wrong. Unable to get user's info");
            console.log("Something went wrong. Unable to get user's info");
          }
        }
      };
    
    
    
    
      _signIn = async () => {
        //Prompts a modal to let the user sign in into your application.
        try {
          await GoogleSignin.hasPlayServices({
            //Check if device has Google Play Services installed.
            //Always resolves to true on iOS.
            showPlayServicesUpdateDialog: true,
          });
          const userInfo = await GoogleSignin.signIn();
          console.log('User Info --> ', userInfo);
          this.setState({ userInfo: userInfo });
          firebase.database().ref("USERS").orderByChild("email").equalTo(this.state.email)
          .once("value",snapshot => {
            if (snapshot.exists()){
             
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
    
              firebase.auth().createUserWithEmailAndPassword(this.state.userInfo.user.email,
                this.state.userInfo.user.name)
          .then(() => {
            var user = firebase.auth().currentUser ;
    
            firebase.database().ref(`USERS/${user.uid}`).set(
              {
                  email : this.state.userInfo.user.email,
                  username : this.state.userInfo.user.name,
                  
                 
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
             
             this.props.navigation.navigate('Listen', {'param1': this.props.navigation.getParam( 'param1') , 
             'param2': this.props.navigation.getParam( 'param2')});
                      
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
              50,  );
  
            })
        
        
              }
          });
        
      
           


        } catch (error) {
          //alert('Message', error.message);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
           // alert('User Cancelled the Login Flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
           // alert('Signing In');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
           // alert('Play Services Not Available or Outdated');
          } else {
           // alert('Some Other Error Happened  '+ error.message);
          }
        }
      };

    

    OnloginPress()
    {
      
        if (this.validation_check())
        {

          DialogProgress.show(options);

                firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
                .then(()=>{
                    
                        ToastAndroid.showWithGravityAndOffset(
                        this.state.welcome,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                    this.setState({
                        email : '' , password : '' , modalVisable : false 
                    })
                    
                    this.props.navigation.navigate('Listen', {'param1': this.props.navigation.getParam( 'param1') , 
                    'param2': this.props.navigation.getParam( 'param2')});
          
                    DialogProgress.hide();
               //     console.warn('user'+this.state.email);
                    
                }).catch((e)=>{
                    ToastAndroid.showWithGravityAndOffset(
                        this.state.Something,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                        );

                });
                    
        }
    }
    validation_check =()=>
    {
        const experssion = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { email , password } = this.state ;
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

        return true ;

    }
    

    
    _responseInfoCallback = (error, result) => {
        if (error) {
          alert('Error fetching data: ' + error.toString());
        } else {
          ToastAndroid.showWithGravityAndOffset(
            result.email,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
            );
           
          //  alert('Result: ' + result.toString() );
              firebase.auth().createUserWithEmailAndPassword(result.email,result.name)
          .then(() => {
            var user = firebase.auth().currentUser ;
            firebase.database().ref(`USERS/${user.uid}`).set(
              {
                  email : result.email,
                  password : result.name, 
              }) 
            .then(()=>{
              ToastAndroid.showWithGravityAndOffset(
              this.state.welcome,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
              );
             
             // alert("User" + user.uid);
                    this.props.navigation.navigate('Listen', {'param1': this.props.navigation.getParam( 'param1') , 
                    'param2': this.props.navigation.getParam( 'param2')});
                             
              
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
              
            firebase.auth().signInWithEmailAndPassword(result.email,result.name)
                .then(()=>{
                    
                        ToastAndroid.showWithGravityAndOffset(
                        this.state.welcome,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                    this.setState({
                        email : '' , password : '' , modalVisable : false 
                    })
                   
          this.props.navigation.navigate('Listen', {'param1': this.props.navigation.getParam( 'param1') , 
          'param2': this.props.navigation.getParam( 'param2')});
     
               //     console.warn('user'+this.state.email);
                    
                }).catch((e)=>{
                    ToastAndroid.showWithGravityAndOffset(
                        this.state.Something,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                        );

                });



          })
         

        }
      }

render() {
  if (this.state.userInfo != null) {
    //Showing the User detail
    return (
      <View style = { styles.view }> 
     
     
      <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/beats.jpg'}} 
       style={{width: '100%', height : '100%'}} >     
      
      
      <View style ={{ flexDirection : 'column' , marginTop : '10%' , marginLeft : '8%' , alignItems : 'center',
       width : '85%'}}>
     <Image source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/logo.png'}} 
       style={{width: '80%', height : '30%'  , marginBottom : '25%'}} >     
           </Image>
      <TextInput style={ styles.input}
        placeholder={this.state.emailplaceholder} placeholderTextColor = {Colors.white}
        onChangeText = {(value)=> this.setState({email : value})}
        value = {this.state.email}
        keyboardType = "email-address"

        />
      
     
      <TextInput style={ styles.input}
        placeholder={this.state.passwordplaceholder} placeholderTextColor = {Colors.white}
        onChangeText = {(value)=> this.setState({password : value})}
        value = {this.state.password}  
        secureTextEntry = {true}
        />


      </View>

      

      <View style = {{ flexDirection : 'column' , alignItems : 'center' , justifyContent : 'center'}}>  
      <TouchableOpacity style = {styles.button}
         onPress = {()=>{
          this.props.navigation.navigate('Listen', {'param1': this.props.navigation.getParam( 'param1') , 
          'param2': this.props.navigation.getParam( 'param2')});
         }}>
         <Text style = {{  alignSelf : "center" , marginTop : '-10%' , marginBottom : "10%" ,  width : 230 , 
         fontFamily : 'ArbFONTS-GE-SS-Two-Light', 
              color : Colors.white , fontSize : 16 }}> {this.state.gmail} </Text>
          </TouchableOpacity>

      <TouchableOpacity style = {styles.button}
        onPress = {this.OnloginPress.bind(this)}
      >
         <Text style = {{  alignSelf : "center"  , width : 80 ,   fontFamily : 'ArbFONTS-GE-SS-Two-Light', 
              color : Colors.white , fontSize : 20  }}> {this.state.Sign_In} </Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.buttonline}>
         <Text style = {{  alignSelf : "center" , color : Colors.white , fontSize : 20   , fontFamily : 'ArbFONTS-GE-SS-Two-Light' }}
          onPress = {this.OnRegisterPress.bind(this)}
         >
           {this.state.Sign_UpNow }</Text>
          </TouchableOpacity>
         <View style = {{  marginTop : 15}}>
          <TouchableOpacity style = {{  width : '80%' }}>
         <Text style = {{  alignSelf : "center" , color : Colors.white , fontSize : 18 ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light',
          borderBottomWidth: .5, borderColor: '#ffffff' }}
          onPress = {()=>{
            this.props.navigation.navigate('Forget', {'param1': this.props.navigation.getParam( 'param1') , 
            'param2': this.props.navigation.getParam( 'param2')});
         
          }}
         >
           {this.state.forget }</Text>
          </TouchableOpacity>
          </View> 
          
             
          </View>
           </ImageBackground>
                  </View> 
   
      );
  } else {
  
    return (
   
            <View style = { styles.view }> 
     
     
        <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/beats.jpg'}}  
         style={{width: '100%', height : '100%'}} >     
        
        
        <View style ={{ flexDirection : 'column' , marginTop : '10%' , marginLeft : '8%' , alignItems : 'center',
         width : '85%'}}>
       <Image source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/logo.png'}}
         style={{width: '80%', height : '30%'  , marginBottom : '25%'}} >     
             </Image>
        <TextInput style={ styles.input}
          placeholder={this.state.emailplaceholder} placeholderTextColor = {Colors.white}
          onChangeText = {(value)=> this.setState({email : value})}
          value = {this.state.email}
          keyboardType = "email-address"

          />
        
       
        <TextInput style={ styles.input}
          placeholder={this.state.passwordplaceholder} placeholderTextColor = {Colors.white}
          onChangeText = {(value)=> this.setState({password : value})}
          value = {this.state.password}  
          secureTextEntry = {true}
          />
          <View style = {{  marginTop : '5%'}}>

            <GoogleSigninButton
                style={{ width: 220, height: 40 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this._signIn}
              />
              
          </View>
        </View>
        <View style = {{ flexDirection : 'column' , alignItems : 'center' , justifyContent : 'center'}}>  
 
        <TouchableOpacity style = {styles.button}
          onPress = {this.OnloginPress.bind(this)}
        >
           <Text style = {{  alignSelf : "center"  , width : 80 ,   fontFamily : 'ArbFONTS-GE-SS-Two-Light', 
                color : Colors.white , fontSize : 20  }}> {this.state.Sign_In} </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.buttonline}>
           <Text style = {{  alignSelf : "center" , color : Colors.white , fontSize : 20    }}
            onPress = {this.OnRegisterPress.bind(this)}
           >
             {this.state.Sign_UpNow }</Text>
            </TouchableOpacity>
           <View style = {{  marginTop : 15}}>
            <TouchableOpacity style = {{  width : '80%' }}>
           <Text style = {{  alignSelf : "center" , color : Colors.white , fontSize : 18 , 
            borderBottomWidth: .5, borderColor: '#ffffff' }}
            onPress = {()=>{
              this.props.navigation.navigate('Forget', {'param1': this.props.navigation.getParam( 'param1') , 
              'param2': this.props.navigation.getParam( 'param2')});
           
            }}
           >
             {this.state.forget }</Text>
            </TouchableOpacity>
            </View> 
            
               
            </View>
             </ImageBackground>
                    </View> 
     
            );
        }
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
          , borderRadius : 20 , marginTop : '5%' , marginLeft : '5%' , marginRight : '5%' 
          , textAlign : 'center' , fontSize : 15 , width : '80%' , color : Colors.white
           
        },
        button :
        {  justifyContent : 'center'  
          , textAlign : 'center' , color : Colors.white , fontSize : 20 , width : '50%' , fontFamily : 'ArbFONTS-GE-SS-Two-Light'
        } , 
        card : 
        {
        borderRadius : 15 , backgroundColor : 'white' , margin : 25 ,  
        justifyContent : 'center' , alignItems : 'center' , padding : 10 
        },
        buttonline :
        {
            marginTop : '5%', width : '80%' ,
             justifyContent : 'center' }, 
        txt : 
        {
            alignSelf : "center" , fontSize : 20 
            
          }
    
    });
    
    export default LoginScreen ;
    /*
     <Icon name="instagram" type = "AntDesign" 
            style={{color: '#DC7633' , margin : 10 , fontSize : 40 }}
            onPress = {()=>{}}
            
           />
            <Icon name="facebook-with-circle" type = "Entypo" style={{color: '#3578E5' ,
                 margin : 10 , fontSize : 40 }}
                onPress = {()=>{}}
                />
                    <LoginButton
        publishPermissions={["publish_actions" , 'email']}
        onLoginFinished={
          (error, result) => {
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  alert(data.accessToken.toString())
                  alert(data.userID)
                  alert(data.getUserId)
                  const id =  data.accessToken.toString() ;
                              
                  this.props.navigation.navigate('HomeScreen');
                  ToastAndroid.showWithGravityAndOffset(
                    'Refresh Home now.',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                    );
                }
              )
            }
          }
        }
        onLogoutFinished={() => alert("logout.")}/>
   keytool -exportcert -alias androiddebugkey -keystore debug.keystore | openssl sha1 -binary | openssl base64 
    //218834759190234 api key app 

         firebase.auth().onAuthStateChanged(function(user) { 
                      if (user.emailVerified) {
                        this.props.navigation.navigate('Listen', {'param1': this.props.navigation.getParam( 'param1') , 
                        'param2': this.props.navigation.getParam( 'param2')});
                          }
                      else {
                        alert('email not verified')
                      }
                   });
               

   <View style = {{ flexDirection : 'row' }}> 
                <LoginButton 
        publishPermissions={['publish_actions' , 'email']}
        permissions={["email" , "public_profile"]}
        onLoginFinished={
          (error, result) => {
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {

                
                  const infoRequest = new GraphRequest(
                    '/me?fields=name,email',
                    null,
                    
                    this._responseInfoCallback
                  );
                  // Start the graph request.
                  new GraphRequestManager().addRequest(infoRequest).start();
                }
              )
            }
          }
        }/>
            </View>



   */