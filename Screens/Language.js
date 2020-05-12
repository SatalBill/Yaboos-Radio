import React , {Component , useEffect }from 'react';
import { StyleSheet , View , Text , Image  , ImageBackground , ToastAndroid  , Alert 
    , TouchableOpacity, Modal } from 'react-native';
import Colors from '../constant/color';
import firebase from '../Navigation/Config';
import Orientation from 'react-native-orientation-locker';
import DialogProgress from 'react-native-dialog-progress';

const options = {
  title:"",
  message:"Please wait .....",
  isCancelable:true
}


 class Language extends Component 
{
    
    constructor(props)
    {
        super(props);
          this.state = {
            check : false , isloading : true
          }
           console.disableYellowBox = true; 
    }
    static navigationOptions = {header: null };
   
    componentDidMount() 
    {
      Orientation.lockToPortrait();
      var user = firebase.auth().currentUser ;  
        if(user !== null)
        {
          this.props.navigation.navigate('HomeScreen', {'param1': this.props.navigation.getParam( 'param1') , 
          'param2': this.props.navigation.getParam( 'param2')});
      
        }
        else 
      {
        null 
      }
      }
   

render() {
    return (
   
            <View style = { styles.view }> 
 <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/home.jpg'}} 
         style={{width: '100%', height : '100%'}} >     
        
        <View style = {{ flexDirection : 'column' , alignItems : 'center' , justifyContent : 'center',
          marginTop : '125%' }}>  
           
           <TouchableOpacity style = {styles.button}
        onPress = {()=>{
          DialogProgress.show(options) ;

        this. props.navigation.navigate({ routeName : 'LoginScreen' , 
        params : { 'param1' : 'param1' }});
        DialogProgress.hide() 
        }}
        >
           <Text style = {{  alignSelf : "center" , color : Colors.white , fontSize : 25 , fontFamily : 'ArbFONTS-GE-SS-Two-Light'
            }}>عربــي</Text>
            </TouchableOpacity>


            <TouchableOpacity style = {styles.button}>
           <Text style = {{  alignSelf : "center" , color : Colors.white , fontSize : 25 , fontFamily : 'ArbFONTS-GE-SS-Two-Light' }}
            onPress = {()=>{
              DialogProgress.show(options) ;

              this.props.navigation.navigate( {routeName : 'RegisterScreen', params : { La : 'english' }});
              this.props.navigation.navigate({ routeName : 'LoginScreen' , 
              params : { 'param2' : 'param2' }});
              DialogProgress.hide();
            }}>
               English </Text>
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
        button :
        {
          borderWidth : .5  , padding : 10 , borderColor : Colors.white , width : 250 , margin : 10 
          , borderRadius : 20 , marginTop : '5%' , marginLeft : '5%' , marginRight : '5%', height : '30%' 
          , textAlign : 'center' , color : '#ECF0F1' , 
        } , 
        card : 
        {
        borderRadius : 15 , backgroundColor : 'white' , margin : 25 ,  
        justifyContent : 'center' , alignItems : 'center' , padding : 10 
        },
      
    
    });
    
    export default Language ;
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