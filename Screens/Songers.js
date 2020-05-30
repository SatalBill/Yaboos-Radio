import React  , { Component} from 'react';
import { StyleSheet,View,FlatList,  Text , ImageBackground  , ActivityIndicator , TextInput , ScrollView
   , Alert , TouchableOpacity  , Image} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Icon   } from 'native-base';
import  Colors  from '../constant/color';


const colors= [
  'white' , '#0b5959'
 ];
 const post= [
  '40%' , '1%'
 ];
 const Tet_colors= [
  '#0b5959' , 'white'
 ];

  class Songers extends Component 
 {
   constructor(props) {
     super(props);

     this.state = {
       visible : true , header : '' , isLoading: true, text: '' , search : '', 
       GridListItems: 
       [
         { key: "عمرو دياب" },{ key: "Arist Name" },{ key: "Arist Name" },
         { key: "Arist Name" },{ key: "Arist Name" },{ key: "Arist Name" },
         
         
       ]
   
   
     }
     
    }
  componentDidMount()
  {
    Orientation.lockToPortrait();
  }
 
   static navigationOptions = {header: null }
   
 
   
 render()
 { 
   return (
  <View>
       <ImageBackground source={{ uri : 'http://demo.ezicodes.com:8080/images/Img/songers.jpg'}} 
          style={{width: '100%', height : '100%'}}>  
     <View style= {{  marginTop : '-15%' , justifyContent : 'center' ,
      alignItems : 'center'}}>
     
     <Text style ={{ color : '#0b5959' , fontSize : 45  , alignSelf : 'center' , marginTop : '43%' ,
       fontFamily : 'ArbFONTS-GE-SS-Two-Light' }} 
      onPress = {()=>{
        this.props.navigation.navigate('Music_List')
      }}>ع</Text>

<ScrollView style ={{   
   marginTop : '10%' , width : '90%' , padding : 10 , borderRadius : 10 ,  
   marginLeft : '5%' , marginRight : '5%' , }}>

 <View style ={{ justifyContent : 'center', alignItems : 'center'}}>

 
 <FlatList
             data={ this.state.GridListItems }
             renderItem={ ({item , index }) =>
           
             <TouchableOpacity 
             onPress = {()=>{
                 this.props.navigation.navigate('Music_List');
            }}>
               <View style={{ backgroundColor: '#0b5959' ,flex:1,borderRadius : 10 ,
                   justifyContent: 'center',alignItems: 'center', width : 250,
                   
                   height : 50 ,margin: 5, }}>
              
              
                <Text style={{fontSize: 20,
                      fontFamily : 'ArbFONTS-GE-SS-Two-Light',justifyContent: 'center',
                      color: Colors.white ,padding: 10,
                    }}> {item.key} </Text>
              
               </View> 
               </TouchableOpacity>
            
               }
             numColumns={1}

/>  
 </View>
</ScrollView>


     </View>

 </ImageBackground>
 
     </View>
   );
 
 }
  
 
 }
 
 const styles = StyleSheet.create({
 screen :
 {
 flex : 1 , justifyContent : 'center' ,alignItems : 'center'
 } ,
textStyle: {
  padding: 10 
},
textInputStyle: {
  height: 40, marginLeft : '15%' ,
  borderRadius : 20 ,
  borderWidth: .4,
  color : Colors.white,
  paddingLeft: 10,
  borderColor: Colors.white,
},
 headerText: {
   fontSize: 20,
   textAlign: "center",
   margin: 10,
 },
 
 });
 
 export default Songers ;

