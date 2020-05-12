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
import Logout from '../Screens/Logout' ;
import Song from '../Screens/Song' ;
import Favourites from '../Screens/Favourites' ;
import Language from '../Screens/Language' ;
import Library from '../Screens/Library' ;
import Chat from '../Screens/Chat' ;
import Podcast from '../Screens/Podcast' ;
import PodcastScreen from '../Screens/PodcastScreen' ;
import { View , Image , Text , Dimensions } from 'react-native';
import Menu from './Menu';


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
    Forget : 
    {
        screen : Forget ,
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
        screen : Library
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

/*
const BottomTabNavigator = createBottomTabNavigator({
    Home : { screen : Navigator ,  navigationOptions : 
        { 
             tabBarIcon : ( (tabInfo) =>{ return (
                <Icon name="home" type = "Entypo" style={{color: tabInfo.tintColor}}   />
               )})
        },
         tabBarColor : Colors.headerColor , 
    },
    Live : 
    {
        screen : Live  , navigationOptions : 
        {
             tabBarIcon : ( (tabInfo) =>{ return (
                <Icon name="livestream" type = "Fontisto" style={{color: tabInfo.tintColor}}   />
               )})
        },
         tabBarColor : Colors.accentColor , 
    },
  
    Favourites : 
    {
        screen : Favourites  , navigationOptions : 
        {
             tabBarIcon : ( (tabInfo) =>{ return (
                <Icon name="favorite" type = "MaterialIcons" style={{color: tabInfo.tintColor ,}}   />
               )}), 
        },
         tabBarColor : Colors.accentColor , 
    },
  
    Recent : 
    {
        screen : Recent  , navigationOptions : 
        {
             tabBarIcon : ( (tabInfo) =>{ return (
                <Icon name="folder-open" type = "FontAwesome" style={{color: tabInfo.tintColor}}   />
               )})
        },
         tabBarColor : Colors.accentColor , 
    },
    
} , {
   
  tabBarOptions: {
    style: { backgroundColor: "black"  , borderTopColor : 'black'  },
    
    showIcon: true,
    gesturesEnabled: true,
    inactiveTintColor: 'grey',
    activeTintColor: Colors.tapcolor}
});

*/

const MainVavigator  = createDrawerNavigator({
   
    
    Background : {
        screen : Navigator  ,  navigationOptions : {
            drawerLabel : 'Main Menu'  ,  drawerIcon :  <View>
              
                </View>
    }}  , 
   
    
} , {
    contentComponent: Menu,
    backBehavior : "initialRoute" , drawerType : "slide"  , drawerPosition : 'left'  ,
    drawerWidth: Dimensions.get('window').width - 130, statusBarAnimation : "fade" ,  
 
});

export default createAppContainer(  MainVavigator );

