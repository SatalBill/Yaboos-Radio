

import React  , { Component} from 'react';
import { StyleSheet,View,Text, } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import Orientation from 'react-native-orientation-locker';

 class Contact_us extends Component 
{
  constructor(props) {
    super(props);
  }

  componentDidMount()
  {
    Orientation.lockToPortrait();
  }
  render()
    {
      return (
        <View>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      </View>
      );

    }
     
 
  }

const styles = StyleSheet.create({
 screen :
 {
   flex : 1
 } 

});

export default Contact_us ;
