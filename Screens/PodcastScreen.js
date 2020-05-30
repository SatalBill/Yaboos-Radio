import React , {useState , useEffect }from 'react';
import { StyleSheet , View , Text  , FlatList , ImageBackground  , ToastAndroid , ScrollView
    , TouchableOpacity, Modal } from 'react-native';
import firebase from '../Navigation/Config';
import Colors from '../constant/color';
import { Icon } from 'native-base';
import TrackPlayer from 'react-native-track-player';
import Orientation from 'react-native-orientation-locker';
import { SliderBox } from "react-native-image-slider-box";



const images_heart = [{uri: 'http://demo.ezicodes.com:8080/images/Img/Banners-01.jpg'}];
const images_place = [{uri: 'http://demo.ezicodes.com:8080/images/Img/Banners-02.jpg'}];
const images_hwn = [{uri: 'http://demo.ezicodes.com:8080/images/Img/Banners-03.jpg'}];

const data_break =  [
  {text: 'بريك صحي 01', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2001.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2001.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 02', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2001%20%20%D8%B1%D9%85%D8%B6%D8%A7%D9%86.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2001%20%20%D8%B1%D9%85%D8%B6%D8%A7%D9%86.mp3&openfolder=normal&ep='},     
  {text: 'بريك صحي 03', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2002.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2002.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 04', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2002%20%20%D8%B1%D9%85%D8%B6%D8%A7%D9%86.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2002%20%20%D8%B1%D9%85%D8%B6%D8%A7%D9%86.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 05', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2003.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2003.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 06', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2004.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2004.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 07', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2005.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2005.mp3&openfolder=normal&ep='},     
  {text: 'بريك صحي 08', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2008.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2008.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 09', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2009.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2009.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 10', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2010.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2010.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 11', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2011.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2011.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 12', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2012.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2012.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 13', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2013.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2013.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 14', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2014.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2014.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 15', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2015.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2015.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 16', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2016.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2016.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 17', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2017.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2017.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 18', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2018.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2018.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 19', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2019.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2019.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 20', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2020.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2020.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 21', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2021.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2021.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 22', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2023.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2023.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 23', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2025.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2025.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 24', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2026.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2026.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 25', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2027.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2027.mp3&openfolder=normal&ep='},
  {text: 'بريك صحي 26', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2028.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A&filename=%D8%A8%D8%B1%D9%8A%D9%83%20%D8%B5%D8%AD%D9%8A%2028.mp3&openfolder=normal&ep='},
  
]
 const data_place  = [
  {text: 'الكولون الامريكى', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20%20-%20American%20colony.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20%20-%20American%20colony.mp3&openfolder=normal&ep='},
  {text: 'مدرسة الشمت', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D8%B4%D9%85%D8%AA.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D8%B4%D9%85%D8%AA.mp3&openfolder=normal&ep='},
  {text: 'المكان الشرقى', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20YMCA%20WEST.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20YMCA%20WEST.mp3&openfolder=normal&ep='},
  {text: 'باب الخليل 01', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A8%D8%A7%D8%A8%20%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D9%84.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A8%D8%A7%D8%A8%20%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D9%84.mp3&openfolder=normal&ep='},
  {text: 'باب الخليل 02', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A8%D8%A7%D8%A8%20%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D9%842.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A8%D8%A7%D8%A8%20%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D9%842.mp3&openfolder=normal&ep='},
  {text: 'باب العمود', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A8%D8%A7%D8%A8%20%D8%A7%D9%84%D8%B9%D9%85%D9%88%D8%AF.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A8%D8%A7%D8%A8%20%D8%A7%D9%84%D8%B9%D9%85%D9%88%D8%AF.mp3&openfolder=normal&ep='},
  {text: 'إسعاف النشاشيبي', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A7%D8%B3%D8%B9%D8%A7%D9%81%20%D8%A7%D9%84%D9%86%D8%B4%D8%A7%D8%B4%D9%8A%D8%A8%D9%8A.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A7%D8%B3%D8%B9%D8%A7%D9%81%20%D8%A7%D9%84%D9%86%D8%B4%D8%A7%D8%B4%D9%8A%D8%A8%D9%8A.mp3&openfolder=normal&ep='},
  {text: 'المعهد الموسيقي', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A7%D9%84%D9%85%D8%B9%D9%87%D8%AF%20%D8%A7%D9%84%D9%88%D8%B7%D9%86%D9%8A%20%D9%84%D9%84%D9%85%D9%88%D8%B3%D9%8A%D9%82%D9%89.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A7%D9%84%D9%85%D8%B9%D9%87%D8%AF%20%D8%A7%D9%84%D9%88%D8%B7%D9%86%D9%8A%20%D9%84%D9%84%D9%85%D9%88%D8%B3%D9%8A%D9%82%D9%89.mp3&openfolder=normal&ep='},
  {text: 'النوتردام', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A7%D9%84%D9%86%D9%88%D8%AA%D8%B1%D8%AF%D8%A7%D9%85%20-%20Notredam.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A7%D9%84%D9%86%D9%88%D8%AA%D8%B1%D8%AF%D8%A7%D9%85%20-%20Notredam.mp3&openfolder=normal&ep='},
  {text: 'بيت الشرق', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A8%D9%8A%D8%AA%20%D8%A7%D9%84%D8%B4%D8%B1%D9%82.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A8%D9%8A%D8%AA%20%D8%A7%D9%84%D8%B4%D8%B1%D9%82.mp3&openfolder=normal&ep='},
  {text: 'بنك باركلنز', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A8%D9%86%D9%83%20%D8%A8%D8%A7%D8%B1%D9%83%D9%84%D9%86%D8%B2.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%A8%D9%86%D9%83%20%D8%A8%D8%A7%D8%B1%D9%83%D9%84%D9%86%D8%B2.mp3&openfolder=normal&ep='},
  {text: 'سينما الحمرا', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%B3%D9%8A%D9%86%D9%85%D8%A7%20%D8%A7%D9%84%D8%AD%D9%85%D8%B1%D8%A7.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D8%B3%D9%8A%D9%86%D9%85%D8%A7%20%D8%A7%D9%84%D8%AD%D9%85%D8%B1%D8%A7.mp3&openfolder=normal&ep='},
  {text: 'مستشفى العيون', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%B3%D8%AA%D8%B4%D8%AA%D9%81%D9%89%20%D8%A7%D9%84%D8%B9%D9%8A%D9%88%D9%86.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%B3%D8%AA%D8%B4%D8%AA%D9%81%D9%89%20%D8%A7%D9%84%D8%B9%D9%8A%D9%88%D9%86.mp3&openfolder=normal&ep='},
  {text: 'مستشفى المطلع', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%B3%D8%AA%D8%B4%D9%81%D9%89%20%D8%A7%D9%84%D9%85%D8%B7%D9%84%D8%B9.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%B3%D8%AA%D8%B4%D9%81%D9%89%20%D8%A7%D9%84%D9%85%D8%B7%D9%84%D8%B9.mp3&openfolder=normal&ep='},
  {text: 'متحف فلسطين', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%AA%D8%AD%D9%81%20%D9%81%D9%84%D8%B3%D8%B7%D9%8A%D9%86.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%AA%D8%AD%D9%81%20%D9%81%D9%84%D8%B3%D8%B7%D9%8A%D9%86.mp3&openfolder=normal&ep='},
  {text: 'مدرسة الرشدية', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D8%B1%D8%B4%D8%AF%D9%8A%D8%A9.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D8%B1%D8%B4%D8%AF%D9%8A%D8%A9.mp3&openfolder=normal&ep='},
  {text: 'مدرسة المطران', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D9%85%D8%B7%D8%B1%D8%A7%D9%86.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D9%85%D8%B7%D8%B1%D8%A7%D9%86.mp3&openfolder=normal&ep='},
  {text: 'مدرسة المامونية', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D9%85%D8%A7%D9%85%D9%88%D9%86%D9%8A%D8%A9.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D9%85%D8%A7%D9%85%D9%88%D9%86%D9%8A%D8%A9.mp3&openfolder=normal&ep='},
  {text: 'مركز البحوث', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%B1%D9%83%D8%B2%20%D8%A7%D9%84%D8%A8%D8%AD%D9%88%D8%AB%20%D8%B3%D9%8A%D8%B1%20%D9%88%D9%84%D9%8A%D8%A7%D9%85%20%D8%A7%D9%88%D9%84%D8%A8%D8%B1%D8%A7%D9%8A%D8%AA.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%B1%D9%83%D8%B2%20%D8%A7%D9%84%D8%A8%D8%AD%D9%88%D8%AB%20%D8%B3%D9%8A%D8%B1%20%D9%88%D9%84%D9%8A%D8%A7%D9%85%20%D8%A7%D9%88%D9%84%D8%A8%D8%B1%D8%A7%D9%8A%D8%AA.mp3&openfolder=normal&ep='},
  {text: 'مبنى برامكى', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D8%A8%D8%B1%D8%A7%D9%85%D9%83%D9%8A.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D8%A8%D8%B1%D8%A7%D9%85%D9%83%D9%8A.mp3&openfolder=normal&ep='},
  {text: 'مبنى الداخلية', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D8%A7%D9%84%D8%AF%D8%A7%D8%AE%D9%84%D9%8A%D8%A9.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D8%A7%D9%84%D8%AF%D8%A7%D8%AE%D9%84%D9%8A%D8%A9.mp3&openfolder=normal&ep='},
  {text: 'مبني السانت جورج', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D8%A7%D9%84%D8%B3%D8%A7%D9%86%D8%AA%20%D8%AC%D9%88%D8%B1%D8%AC.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D8%A7%D9%84%D8%B3%D8%A7%D9%86%D8%AA%20%D8%AC%D9%88%D8%B1%D8%AC.mp3&openfolder=normal&ep='},
  {text: 'مبنى المحكمة', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D8%A7%D9%84%D9%85%D8%AD%D9%83%D9%85%D8%A9.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D8%A7%D9%84%D9%85%D8%AD%D9%83%D9%85%D8%A9.mp3&openfolder=normal&ep='},
  {text: 'مبنى المسكوبية', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D8%A7%D9%84%D9%85%D8%B3%D9%83%D9%88%D8%A8%D9%8A%D8%A9.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D8%A7%D9%84%D9%85%D8%B3%D9%83%D9%88%D8%A8%D9%8A%D8%A9.mp3&openfolder=normal&ep='},
  {text: 'مبنى محطة القطر', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D9%85%D8%AD%D8%B7%D8%A9%20%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D8%B1.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%85%D8%A8%D9%86%D9%89%20%D9%85%D8%AD%D8%B7%D8%A9%20%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D8%B1.mp3&openfolder=normal&ep='},
  {text: 'قبور الساطين', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%82%D8%A8%D9%88%D8%B1%20%D8%A7%D9%84%D8%B3%D8%A7%D8%B7%D9%8A%D9%86.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%82%D8%A8%D9%88%D8%B1%20%D8%A7%D9%84%D8%B3%D8%A7%D8%B7%D9%8A%D9%86.mp3&openfolder=normal&ep='},
  {text: 'قبور السلاطين', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%82%D8%A8%D9%88%D8%B1%20%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D8%B7%D9%8A%D9%86.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%82%D8%A8%D9%88%D8%B1%20%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D8%B7%D9%8A%D9%86.mp3&openfolder=normal&ep='},
  {text: 'هند الحسنى', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%87%D9%86%D8%AF%20%D8%A7%D9%84%D8%AD%D8%B3%D9%86%D9%8A.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%87%D9%86%D8%AF%20%D8%A7%D9%84%D8%AD%D8%B3%D9%86%D9%8A.mp3&openfolder=normal&ep='},
  {text: 'فندق البالاس', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%81%D9%86%D8%AF%D9%82%20%D8%A7%D9%84%D8%A8%D8%A7%D9%84%D8%A7%D8%B3.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20-%20%D9%81%D9%86%D8%AF%D9%82%20%D8%A7%D9%84%D8%A8%D8%A7%D9%84%D8%A7%D8%B3.mp3&openfolder=normal&ep='},
  {text: 'مدرسة الفرير', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20%20-%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D9%81%D8%B1%D9%8A%D8%B1.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20%20-%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D9%81%D8%B1%D9%8A%D8%B1.mp3&openfolder=normal&ep='},
  {text: 'المستشفى الطلياني', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D8%B4%D8%AA%D9%81%D9%89%20%D8%A7%D9%84%D8%B7%D9%84%D9%8A%D8%A7%D9%86%D9%8A.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86&filename=%D9%85%D9%83%D8%A7%D9%86%20%D9%85%D9%86%20%D8%B2%D9%85%D8%A7%D9%86%20%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D8%B4%D8%AA%D9%81%D9%89%20%D8%A7%D9%84%D8%B7%D9%84%D9%8A%D8%A7%D9%86%D9%8A.mp3&openfolder=normal&ep='},


 ]

 const data_hwn  = [
  {text: 'عين كارم', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D8%B9%D9%8A%D9%86%20%D9%83%D8%A7%D8%B1%D9%85.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D8%B9%D9%8A%D9%86%20%D9%83%D8%A7%D8%B1%D9%85.mp3&openfolder=normal&ep='},
  {text: 'قرية ساريس', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%B3%D8%A7%D8%B1%D9%8A%D8%B3.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%B3%D8%A7%D8%B1%D9%8A%D8%B3.mp3&openfolder=normal&ep='},
  {text: 'قرية عرتوف', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%B9%D8%B1%D8%AA%D9%88%D9%81.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%B9%D8%B1%D8%AA%D9%88%D9%81.mp3&openfolder=normal&ep='},
  {text: 'قرية برير', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A8%D8%B1%D9%8A%D8%B1.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A8%D8%B1%D9%8A%D8%B1.mp3&openfolder=normal&ep='},
  {text: 'قرية جريشة', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%AC%D8%B1%D9%8A%D8%B4%D8%A9.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%AC%D8%B1%D9%8A%D8%B4%D8%A9.mp3&openfolder=normal&ep='},
  {text: 'قرية سعسع', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%B3%D8%B9%D8%B3%D8%B9.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%B3%D8%B9%D8%B3%D8%B9.mp3&openfolder=normal&ep='},
  {text: 'قرية تل الشوك', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%AA%D9%84%20%D8%A7%D9%84%D8%B4%D9%88%D9%83.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%AA%D9%84%20%D8%A7%D9%84%D8%B4%D9%88%D9%83.mp3&openfolder=normal&ep='},
  {text: 'قرية الحرم يافا', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AD%D8%B1%D9%85%20-%20%D9%8A%D8%A7%D9%81%D8%A7.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AD%D8%B1%D9%85%20-%20%D9%8A%D8%A7%D9%81%D8%A7.mp3&openfolder=normal&ep='},
  {text: 'قرية الجمامة', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AC%D9%85%D8%A7%D9%85%D8%A9.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AC%D9%85%D8%A7%D9%85%D8%A9.mp3&openfolder=normal&ep='},
  {text: 'قرية اقرث', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%82%D8%B1%D8%AB.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%82%D8%B1%D8%AB.mp3&openfolder=normal&ep='},
  {text: 'قرية البيرة', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D8%A8%D9%8A%D8%B1%D8%A9.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D8%A8%D9%8A%D8%B1%D8%A9.mp3&openfolder=normal&ep='},
  {text: 'قرية الكابرى', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D9%83%D8%A7%D8%A8%D8%B1%D9%8A.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D9%83%D8%A7%D8%A8%D8%B1%D9%8A.mp3&openfolder=normal&ep='},
  {text: 'قرية القبو', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D9%82%D8%A8%D9%88.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D9%82%D8%A8%D9%88.mp3&openfolder=normal&ep='},
  {text: 'قرية المزار', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D8%A7%D8%B1.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D8%A7%D8%B1.mp3&openfolder=normal&ep='},
  {text: 'قرية الكويكات', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D9%83%D9%88%D9%8A%D9%83%D8%A7%D8%AA.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D9%83%D9%88%D9%8A%D9%83%D8%A7%D8%AA.mp3&openfolder=normal&ep='},
  {text: 'قرية عمقى', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%B9%D9%85%D9%82%D9%89.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%B9%D9%85%D9%82%D9%89.mp3&openfolder=normal&ep='},
  {text: 'قرية دير ابان', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%AF%D9%8A%D8%B1%20%D8%A7%D8%A8%D8%A7%D9%86.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%AF%D9%8A%D8%B1%20%D8%A7%D8%A8%D8%A7%D9%86.mp3&openfolder=normal&ep='},
  {text: 'قرية عين غزال', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%B9%D9%8A%D9%86%20%D8%BA%D8%B2%D8%A7%D9%84.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%B9%D9%8A%D9%86%20%D8%BA%D8%B2%D8%A7%D9%84.mp3&openfolder=normal&ep='},
  {text: 'قرية اندور', url: 'http://cloud.coolnet.ps:8080/share.cgi/%D9%87%D9%88%D9%86%20%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%86%D8%AF%D9%88%D8%B1.mp3?ssid=0muWOtU&fid=0muWOtU&path=%2F%D9%87%D9%88%D9%86%20%D8%B1%D8%A8%D9%8A%D9%86%D8%A7%202019&filename=%D9%87%D9%88%D9%86%20%D8%A8%D9%8A%D9%86%D8%A7%20-%20%D9%82%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%86%D8%AF%D9%88%D8%B1.mp3&openfolder=normal&ep='},
  
 ]
 const icon_heart = 'gratipay' ;
 const icon_heart_title = 'FontAwesome5' ; 
 const icon_place = 'castle' ;
 const icon_place_title = 'MaterialCommunityIcons' ; 
 const icon_hwn = 'book';
 const icon_hwn_title = 'Entypo' ;

  const PodcastScreen = ({navigation}) =>
  {
    const [print , isprint ] =  useState('');
    const [text , istext ] =  useState('');
    const [title , istitle ] =  useState('');
    const [url , isurl ] =  useState('');
    const [icon , isicon ] =  useState('');
    const [check , ischeck ] =  useState('control-play');
    const [icon_title , isicon_title ] =  useState('');
    const [img , isimg ] =  useState({ uri : 'http://demo.ezicodes.com:8080/images/Img/play.gif'})
    const [data_podcast , isdata_podcast ] =  useState( [
      {
        text : '' , url : ''
      }
    ]);
       
        console.disableYellowBox = true;
        PodcastScreen.navigationOptions = navigationData =>
        {
          return { header: null };
        }
        useEffect(() => {

  Orientation.lockToPortrait();
  const  text = navigation.getParam('text');
  istitle(text);
  //alert(text);
  const param1 = navigation.getParam( 'param1');
  const param2 = navigation.getParam('param2');
  
 // alert(item)
 switch ( param1 || param2 ) {
   case 'param1' :
  //  alert(itemId)
     isprint('من فضلك قم باختيار حلقة البرنامج ')   
     break;

     case 'param2' :
  //    alert(item) 
  isprint('Please select the program Episode')
      
          break;

   default:
     break;
  }

  if(text === 'بريك صحي')
  {
    isdata_podcast(data_break) ;
    isimg(images_heart) ;
    isicon_title(icon_heart_title);
    isicon(icon_heart);
   
  }
  else if ( text === 'مكان من زمان')
  {
    isdata_podcast(data_place) ;
    isimg(images_place) ;
    isicon_title(icon_place_title);
    isicon(icon_place);
   
  }
  else if ( text === 'هون ربينا')
  {
    isdata_podcast(data_hwn) ;
    isimg(images_hwn) ;
    isicon_title(icon_hwn_title);
    isicon(icon_hwn);
    
  }

}),[]; 

    return (
   
            <View style = { styles.view }> 

    <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/slide.jpg'}} 
         style={{width: '100%', height : '100%'}}>  
     
         <View style={{ width : '100%' , marginTop : '60%' , height : '15%' }}>
          
        <SliderBox images={img} autoplay circleLoop backgroundColor = {'white'}
       resizeMode={'cover'}
       sliderBoxHeight={'100%'}  dotColor={Colors.tapcolor}
       inactiveDotColor="white"
       dotStyle={{
         width: 10,
         height: 10,
         borderRadius: 15,
         marginHorizontal: 5,
       }}
       />

    </View>
    <View style= {{ justifyContent : 'center' , alignItems : 'center' , marginTop : '5%'}}>
    <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/Cyrcel.png'}} 
  style ={{ width : 70 , height : 70 , marginTop : '1%' , marginLeft : '1%' ,}} >
    
    
        <Icon name={check} type = "SimpleLineIcons" style={{color: Colors.white 
      , fontSize : 30  , marginTop : '25%', marginLeft : '30%'}}
      onPress = {()=> 
        {
          
          if (url === '' )
          {
            ToastAndroid.showWithGravityAndOffset(
              'Please select the program Episode',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
              25,
              50,
              );
          }
          else 
          {

          
          if (check === 'control-pause')
        {
           ischeck('control-play');
           istext(text);
           TrackPlayer.destroy();
        }
      
            if(check === 'control-play')
            {
              
          TrackPlayer.setupPlayer().then(async () => {
            // Adds a track to the queue
            await TrackPlayer.add({
              id: '1111',
              url: url ,
              artist: title + " - "  + text,
              artwork: 'http://demo.ezicodes.com:8080/images/Img/yaboos.png'
          }).then(function() {
              TrackPlayer.play();
              ischeck('control-pause');
              TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
              TrackPlayer.addEventListener('remote-pause', () => {
                
                ischeck('control-play')
                
                TrackPlayer.pause();
                
             
              } );
              TrackPlayer.addEventListener('remote-stop', () => {
                
                ischeck('control-play')
                istext('');
                TrackPlayer.stop();
                
             
              } );
            
           //   navigation.navigate('Yaboos')
          });
        });
      }
      }
      
        }}/> 
    
    </ImageBackground>  
    </View>

    <View style={{ width: '90%',  marginLeft : '5%'  , height: .5 , 
    backgroundColor: Colors.white , marginTop: '3%'}} />
   <Text style ={{ color : Colors.white , fontSize : 22 , margin : 5 , marginTop : '5%' , textAlign : 'center' ,
   fontFamily : 'ArbFONTS-GE-SS-Two-Light', }}>{text} </Text>
    <ScrollView>
<View style ={{marginTop : '5%' ,borderRadius : 5 , backgroundColor : 'white' , 
         height : '100%' , padding : '5%' , marginRight : '5%' , marginLeft : '5%'
 }}>

         <FlatList  data={data_podcast}  keyExtractor={(item, index) => index.toString()}
                    renderItem={({item , index }) =>  
                    <TouchableOpacity 
                    onPress = {()=>{
                      const  text = navigation.getParam('text');
                      istext(item.text);
                      isurl(item.url);
  
                    }}>
                      
                    <View style ={{borderRadius : 5 , margin : 3 , height : 60 ,
                     flexDirection : 'row'
              }}>
                
                <Icon name= {icon} type ={icon_title} 
              style={{color: Colors.tapcolor , fontSize : 30, marginTop : '5%'}}/>
                    <Text style={{ color : '#7F8C8D'  , width : '80%' ,fontFamily : 'ArbFONTS-GE-SS-Two-Light',
                     marginLeft : '1%', marginTop : '7%' , fontSize : 18}}>{item.text}</Text>  
                  
                   
                       </View>
                       <View style={{ width: '100%'  , height: .5 , 
                backgroundColor: '#7F8C8D' ,}} />
                       </TouchableOpacity>
                    }/>

                      </View>
                      </ScrollView>
                      </ImageBackground>

                    </View> 
     
            );
        }
        


const styles = StyleSheet.create(
    {
        view :
        {
           flex :  1 ,  backgroundColor : Colors.tapcolor

        },
        card : 
        {
          borderRadius : 10 , backgroundColor : 'white' , margin : 3 , height : 70 ,
         padding : '5%' , flexDirection : 'row'
        }
    });
    
    export default PodcastScreen ;
 /*
  <Icon name={this.state.check} type = "AntDesign" style={{color: Colors.tapcolor , marginTop : '5%'   
      , fontSize : 30  , marginLeft : '20%'}} onPress ={()=>{
        const  text = this.props.navigation.getParam('text');
 
        this.setState({
          check : 'pausecircle'
        })
       
        if (this.state.check === 'pausecircle')
        {
         this.setState({
           check : 'play'
         })
           TrackPlayer.destroy();
        }
 
        if(this.state.check === 'play')
        {
              
        TrackPlayer.setupPlayer().then(async () => {
          // Adds a track to the queue
          await TrackPlayer.add([{id: "1111",
          url: item.url,
          title: "Yaboos FM",
          artist: item.text + " _ " + text ,
          artwork: 'http://demo.ezicodes.com:8080/images/Img/yaboos.png'}]).then(function() {
            TrackPlayer.play();
            TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
            TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
            TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
              });
              });
            }
       
      }}/>*/