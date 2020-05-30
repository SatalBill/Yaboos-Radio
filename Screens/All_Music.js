/*This is an Example of SearchBar in React Native*/
import * as React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform  , TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import  Colors  from '../constant/color';
import TrackPlayer  from 'react-native-track-player';

 class All_Music extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }
  static navigationOptions = {header: null };

  componentDidMount() {
    TrackPlayer.updateOptions({
      stopWithApp: false, 
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
       
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      
      ]
    });
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });

      
      


  }
  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search:text,
    });
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          marginLeft : '5%',
          backgroundColor: Colors.white,
        }}
      />
    );
  };
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <SearchBar
          round

          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Song Name..."
          value={this.state.search}
          />
   
          <FlatList
          data={this.state.dataSource}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({item , index }) =>  
                    <TouchableOpacity 
                    onPress = {()=>{
                      TrackPlayer.setupPlayer().then(async () => {
                        // Adds a track to the queue
                        await TrackPlayer.add([
                          {id: "1111",
                            url: 'https://drive.google.com/uc?export=download&id=1VM9_umeyzJn0v1pRzR1BSm9y3IhZ3c0E',
                            title: "Yaboos FM",
                            artist: 'Song Name...',
                            artwork: 'http://demo.ezicodes.com:8080/images/Img/yaboos.png'
                        }]).then(function() {
                          TrackPlayer.play();
                          TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
                          TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
                          TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
                             
                        })
                      });  
                 //     this.props.navigation.navigate('Library');
                    }}>
                    <Text style={styles.textStyle}>{item.title}</Text>

               
                       </TouchableOpacity>
                    }/>
        
      </View>
    );
  }
}
//             <Text style={styles.textStyle}>{item.title}</Text>}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.tapcolor,
    marginTop: Platform.OS == 'ios'? 30 : 0
  },
  textStyle: {
    padding: 10, color : Colors.white , fontFamily : 'ArbFONTS-GE-SS-Two-Light', fontSize : 16
  },
});

export default All_Music ;