

import React  , { Component} from 'react';
import { StyleSheet,View,FlatList,  Text , ImageBackground   , Alert , TouchableOpacity  , Image} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Icon   } from 'native-base';
import  Colors  from '../constant/color';


const colors= [
 'white'
];
const icons = [
  "hand-holding-heart" , "castle" , "leanpub"
];
const size = [ 0 , 130 , 90 ];
const iconsheader = [
  "FontAwesome5" , "MaterialCommunityIcons" , "FontAwesome5"
];


 class Podcast extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      visible : true , header : '' ,
        GridListItems: [
          { key: "بريك صحي" },
          { key: "مكان من زمان" },
          { key: "هون ربينا" },
         
         
        ]
    
    }}
 componentDidMount()
 {
   Orientation.lockToPortrait();
 }

  static navigationOptions = {header: null }
  
  GetGridViewItem(item) {
    Alert.alert(item);
  }


render()
{
  return (
 <View>
      <ImageBackground source={{uri : 'http://demo.ezicodes.com:8080/images/Img/PodcastDesign.jpg'}} 
         style={{width: '100%', height : '100%'}}>  
<View style ={{alignItems : 'center' , justifyContent : 'center' , marginTop : '80%'}}>
<FlatList
            data={ this.state.GridListItems }
            renderItem={ ({item , index }) =>
              
            <TouchableOpacity 
            onPress = {()=>{
                this.props.navigation.navigate('PodcastScreen' ,{'param1': this.props.navigation.getParam( 'param1') , 
                'param2': this.props.navigation.getParam( 'param2'),
                'text': item.key  

              });
           }}>
              <View style={{ backgroundColor: colors[index%colors.length] ,flex:1,borderRadius : 20 ,
                  justifyContent: 'center',alignItems: 'center', width : 140,
                  height : 120 ,margin: 8, }}>
             
              <Icon name= {icons[index%icons.length]} type ={iconsheader[index%iconsheader.length]} 
              style={{color: Colors.tapcolor , fontSize : 30,}}/>

               <Text style={styles.GridViewTextLayout}> {item.key} </Text>
             
              </View> 
              </TouchableOpacity>
              }
            numColumns={2}
         />  
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
headerText: {
  fontSize: 20,
  textAlign: "center",
  margin: 10,
},
GridViewTextLayout: {
 fontSize: 20,
 fontFamily : 'ArbFONTS-GE-SS-Two-Light',
 justifyContent: 'center',
 color: Colors.tapcolor,
 padding: 10,
}
});

export default Podcast ;
/**
 *       renderItem={({item  }) =>  
                     {
                      return (
                        <View style={{ alignItems : 'center' , justifyContent : 'center' , marginTop : '50%' , 
                        }}  >
                            <Image style={styles.listImage}  source= {{ uri : item.avatar ,}}  />
                            <Text style={styles.listText} >{item.text}</Text>
                         </View>
                    );
                     }
                    }/>



data: [

{
    avatar: require('../Img/Banner.jpg') , text: 'بريك صحي', val: ''
},
{
  avatar: require('../Img/Bannertwo.jpg'), text: 'مكان من زمان', val: ''
},
{
  avatar: require('../Img/Bannerone.jpg'), text: 'هون ربينا', val: ''
},

]
};
}

<FlatList  data={this.state.data}  keyExtractor={(item, index) => index.toString()}
                        renderItem={({item  }) =>  
                     
                      <TouchableOpacity 
                      onPress = {()=>{
                          this.props.navigation.navigate('PodcastScreen' ,{'param1': this.props.navigation.getParam( 'param1') , 
                          'param2': this.props.navigation.getParam( 'param2'),
                          'text': item.text  
                        
                        });
                     }}>
                        <View>
                            <View style ={{ justifyContent : 'center' , alignItems : 'center' , borderWidth : .2
                             , borderColor : 'white' ,backgroundColor : 'rgba(0,0,0,0.2)'}}>
                            <Text style={{ color : 'white' , fontSize : 18 , margin : '1%'}} >{item.text}</Text>
                            </View>
                            <Image style={styles.listImage}  source={item.avatar}  />
                          
                            </View>
                    
                    </TouchableOpacity>
                     
                    }/>



 */