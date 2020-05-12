import React , {Component  }from 'react';
import {   View  , BackHandler  , ToastAndroid} from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import firebase from '../Navigation/Config';
import Colors from '../constant/color';
import { LoginButton ,  LoginManager } from 'react-native-fbsdk';
import Orientation from 'react-native-orientation-locker';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

var user = firebase.auth().currentUser ;    

 class Logout extends Component

{
  constructor(props)
  {
    super(props)
    this.state = {
      visible : true , body : 'Are you sure about that ? ' , yes : '' , title : 'LogOut' , userInfo : null ,
      alertmessage :'LogOut Successfully' , faild : 'LogOut is Failed' , no : ''
    }
    
  }
  static navigationOptions = {header: null }
  componentWillMount() 
  {
   Orientation.lockToPortrait();
   
const  param1 = this.props.navigation.getParam('param1');
const  param2 = this.props.navigation.getParam('param2');
 
   // alert(item)
   switch ( param1 || param2 ) {
     case 'arabic' :
      this.setState({
        body : 'هل أنت متأكد من ذلك ؟'  , title : 'خروج' , 
        alertmessage :'تم الخروج ' , faild : 'خطأ في عملية الخروج ' ,
      })
       break;

       case 'english' :
       this.setState({
        body : 'Are you sure about that ? ' , yes : 'Yes' , title : 'LogOut' , 
        alertmessage :'LogOut Successfully' , faild : 'LogOut is Failed' , no : 'No'
      })
         break;

     default:
       break;
   }
  }

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  
  render() {

    return (
      <View>
 <ConfirmDialog dialogStyle = { { borderRadius  : 20} } titleStyle = {{ color : Colors.tapcolor }} 
  buttonsStyle =  {{ color : Colors.tapcolor }} 
     title={this.state.title} 
     message={this.state.body}
     visible={this.state.visible}
     negativeButton={{
         title: "YES",
         onPress: () => 
         firebase.auth().signOut()
.then(
 () => {
          
                ToastAndroid.showWithGravityAndOffset(
                  this.state.alertmessage,
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                  );
                  this._signOut();
                  LoginManager.logOut();
                  BackHandler.exitApp();
               
 },
 function(error) {
  ToastAndroid.showWithGravityAndOffset(
    this.state.faild,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50,
    );

 }
)
     }}
     positiveButton={{
         title: "NO",
         onPress: () => this.props.navigation.navigate('HomeScreen')
     }}
 />
    </View>
)
}



}

export default Logout ;

