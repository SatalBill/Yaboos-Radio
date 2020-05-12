import React  , { Component} from 'react';
import { StyleSheet,View, ImageBackground  , TouchableOpacity , Text  , ToastAndroid } from 'react-native';
import Colors from '../constant/color';
import Orientation from 'react-native-orientation-locker';

import Sound from 'react-native-sound';
import DialogProgress from 'react-native-dialog-progress';


const options = {
  title:"",
  message:"Please wait .....",
  isCancelable:true
}
Sound.setCategory('Playback', true); // true = mixWithOthers

class Listen extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      index : 1 , listen : '' , low : '' , high : '' , speed : '' , alert  : ''
    }
    console.disableYellowBox = true;  
   
    
  }
  static navigationOptions = {header: null }
  componentWillMount() 
  {
    Orientation.lockToPortrait();
 /*  
    const s = new Sound( t1, (error) => { // works
      if (error) {
        console.log('error', error);
        return;
      }
  
      s.play(() => {
        s.release()
      });
    });
  */
    const  param1 = this.props.navigation.getParam('param1');
    const  param2 = this.props.navigation.getParam('param2');
   // alert(param1 + param2 )
    switch ( param1 || param2 ) {
      case 'param1' :
     //  alert(itemId)
       this.setState({
         listen : 'اســـتمع الأن' , 
         high : 'جودة عالية' ,
         low : 'جودة منخفضة' , alert : 'اختار الجودة'
       })
        break;

        case 'param2' :
     //    alert(item) 
        this.setState({
           listen : 'Start Listening' ,
           high : ' High Quality' , low : ' Low Quality' , alert : 'Select Quality'
             })
          break;

      default:
        break;
    }

//source={require('../Img/listen.jpg')}

  }
  render()
    {
      return (
        <View>       
      <ImageBackground  source={{ uri  : 'http://demo.ezicodes.com:8080/images/Img/listen.jpg'}}  style={{width: '100%', height : '100%'}} 
        >
    <View style={{alignItems : 'center' , justifyContent : 'center' , marginTop : '150%'}}>
    <View style = { { flexDirection : 'row' , marginTop : '-10%'} }>
       
       <TouchableOpacity style = {styles.speed}>
               <Text style = {{  alignSelf : "center" , color : Colors.white  ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light',  fontSize : 16  }}
           
           onPress={() =>  {
            
            this.setState ({
              speed : 'http://188.225.182.10:8000/live'
            })
            ToastAndroid.showWithGravityAndOffset(
              this.state.high ,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
              );
               }}
           >
                  {this.state.high} </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.speed}>
               <Text style = {{  alignSelf : "center" , color : Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light' , fontSize : 16  }}
           
           onPress={() => {
             
            this.setState ({
              speed : 'http://188.225.182.10:8000/64'
            })
        ToastAndroid.showWithGravityAndOffset(
          this.state.low ,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
          );
           }}
           >
                   {this.state.low} </Text>
                </TouchableOpacity>
       
       
                </View>    
   
    <TouchableOpacity style = {styles.button}
           onPress = {()=>{  
             
            if (this.state.speed === '')
            {
              ToastAndroid.showWithGravityAndOffset(
                this.state.alert ,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
              
            }
            else 
            {
              DialogProgress.show(options);
              this.props.navigation.navigate('HomeScreen',
              {'param1': this.props.navigation.getParam( 'param1') , 
              'param2': this.props.navigation.getParam( 'param2'), 
               'speed' : this.state.speed });   
               DialogProgress.hide();
            }
              /*
           const s = new Sound( t1, (error) => { // works
             if (error) {
               console.log('error', error);
               return;
             }
         
             s.play(() => {
               s.release()
             });
           });
     */
           
        }}>
           <Text style = {{ alignSelf : "center" , color : Colors.white ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light',  
           fontSize : 18 }}> {this.state.listen}  </Text>
            </TouchableOpacity>
            
       
            </View>
    
            </ImageBackground>
       </View>
      );

    }
     
 
  }


export default Listen ;


const styles = StyleSheet.create({
  button :
        {
          borderWidth : .5  , padding : 10 , borderColor : Colors.white , width : 250 , margin : 10 
          , borderRadius : 20 , marginTop : '5%' , marginLeft : '5%' , marginRight : '5%' ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light'
          , textAlign : 'center' , color : '#ECF0F1' , 
        } , 
       speed : 
       {
          borderWidth : .5   , borderColor : Colors.white , width : '35%' , margin : 10 ,  fontFamily : 'ArbFONTS-GE-SS-Two-Light'
          , borderRadius : 20 , marginTop : '5%' , marginLeft : '5%' , marginRight : '5%' , height : 40 
          , textAlign : 'center' , color : '#ECF0F1' , padding : 5 ,
        } , 
       
});