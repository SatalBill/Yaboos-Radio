import React  from 'react' ;
import { createAppContainer } from 'react-navigation' ;
import { createBottomTabNavigator } from 'react-navigation-tabs' ;
import { createDrawerNavigator } from 'react-navigation-drawer' ;
import { createStackNavigator  } from 'react-navigation-stack';
import HomeScreen from '../Screens/HomeScreen' ;
import About_us from '../Screens/About_us' ;
import RegisterScreen from '../Screens/RegisterScreen' ;
import LoginScreen from '../Screens/LoginScreen' ;
import Listen from '../Screens/Listen' ;
import Forget from '../Screens/Forget' ;
import Share from '../Screens/Share' ;
import Music_List from '../Screens/Music_List' ;
import Logout from '../Screens/Logout' ;
import All_Music from '../Screens/All_Music' ;
import Song from '../Screens/Song' ;
import Songers from '../Screens/Songers' ;
import Favourites from '../Screens/Favourites' ;
import Language from '../Screens/Language' ;
import Library from '../Screens/Library' ;
import Chat from '../Screens/Chat' ;
import Podcast from '../Screens/Podcast' ;
import PodcastScreen from '../Screens/PodcastScreen' ;
import { View , Image , Text , Dimensions } from 'react-native';
import Menu from './Menu';
import ArcMenu from './ArcMenu';


const Navigator = createStackNavigator({
    
    Language : 
    {
        screen : Language ,
    },
    
    LoginScreen : 
    {
        screen : LoginScreen
    },
    HomeScreen : {
        screen :  HomeScreen ,
     },
     All_Music :
     {
         screen : All_Music
     },
     
    RegisterScreen : 
    {
        screen : RegisterScreen
    },
    Listen : 
    {
        screen : Listen ,
    },
    Song : 
    {
        screen : Song ,
    },  
    Favourites : 
    {
        screen : Favourites ,
    }, 
    PodcastScreen : 
    {
        screen : PodcastScreen ,
    },  
    Songers : 
    {
        screen : Songers , navigationOptions : {
            header : null
        }
    },
    Forget : 
    {
        screen : Forget ,
    },  
    Music_List :
    {
      screen :  Music_List , navigationOptions : {
        header : null
      }
    },
     Logout : 
     {
         screen : Logout
     },
     About_us : 
     {
         screen : About_us
     },
     Share : 
    {
        screen : Share
    },
    Library : 
    {
        screen : Library , navigationOptions : {
            header : null}
    },
   
    Podcast : 
    {
        screen : Podcast
    },
   
    Chat : 
    {
        screen : Chat
    },
   
},{
   // initialRouteName : 'HomeScreen'
  
});

const MainVavigator  = createDrawerNavigator({
   
    
    Background : {
        screen : Navigator  ,  
        
        navigationOptions : {
            drawerLabel : 'Main Menu'  ,  drawerIcon :  <View>
              
                </View>
    }}  , 
   
    
} , {
    contentComponent:  Menu    ,
    backBehavior : "initialRoute" , drawerType : "slide"  , drawerPosition : 'left'  ,
    drawerWidth: Dimensions.get('window').width - 130, statusBarAnimation : "fade" ,  
 
});

export default createAppContainer(  MainVavigator );

