import  AudioRecorderPlayer from 'react-native-audio-recorder-player';
import React , {Component , useEffect }from 'react';
import { StyleSheet , View , Text , Button, Alert , TouchableOpacity  } from 'react-native';
import FileUpload from 'react-native-file-uploader';

const settings = {
        uri: 'https://console.firebase.google.com/project/radioo-stations/storage/radioo-stations.appspot.com/files?hl=ar',
        method: 'POST', // default 'POST',support 'POST' and 'PUT'
        headers: {
          'Accept': 'application/json',
        },
        fields: {
            'hello': 'world',
        },
        files: [
          {
            name: 'one', // optional, if none then `filename` is used instead
            filename: 'one.w4a', // require, file name
            filepath: 'file:///sdcard/sound.mp4', // require, file absoluete path
            filetype: 'audio/x-m4a', // options, if none, will get mimetype from `filepath` extension
          },
        ]
};

const audioRecorderPlayer = AudioRecorderPlayer();

class VoiceRecorder extends Component 
{
  
    constructor(props) {
      super(props);
      this.state = {
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
      };
  
      this.audioRecorderPlayer = new AudioRecorderPlayer();
      this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }
    static navigationOptions = {header: null};


    onStartRecord = async () => {
        
//        Alert.alert('start')
        const result = await this.audioRecorderPlayer.startRecorder();
        this.audioRecorderPlayer.addRecordBackListener((e) => {
          this.setState({
            recordSecs: e.current_position,
            recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
          });
          return;
        });
      Alert.alert(result)
      
      }
      
      onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
          recordSecs: 0,
        });
      //  console.log(result);
      }
      
      onStartPlay = async () => {
       // console.warn('onStartPlay');
        const msg = await this.audioRecorderPlayer.startPlayer();
       // console.warn(msg);
        this.audioRecorderPlayer.addPlayBackListener((e) => {
          if (e.current_position === e.duration) {
         //   console.warn('finished');
            this.audioRecorderPlayer.stopPlayer();
          }
          this.setState({
            currentPositionSec: e.current_position,
            currentDurationSec: e.duration,
            playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
            duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          });
          return;
        });
       // Alert.alert(msg);
      };
      
      onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
      }
      
      onStopPlay = async () => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
      }
      onupload ()
      {
          FileUpload.upload(settings, function(err, result) {
            console.log ('upload:', err, result);
          })
      }



    render() {
            let playWidth =
              (this.state.currentPositionSec / this.state.currentDurationSec) * 300 ;
            if (!playWidth) playWidth = 0;
        
            return (
              <View style={styles.container}>
                <Text style={styles.titleTxt}>Record</Text>

                <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
                
                <View style={styles.viewRecorder}>
                  <View style={styles.recordBtnWrapper}>
                    <Button title = 'RECORD'
                      style={styles.btn}
                      onPress={this.onStartRecord}
                      textStyle={styles.txt}
                    >
        
                    </Button>
                    <Button title = 'Stop'
                      style={[
                        styles.btn,
                        {
                          marginLeft: 12 ,
                        },
                      ]}
                      onPress={this.onStopRecord}
                      textStyle={styles.txt}
                    >
                     
                    </Button>
                  </View>
                </View>
                
                
                
                
                <View style={styles.viewPlayer}>
                  <TouchableOpacity
                    style={styles.viewBarWrapper}
                    onPress={this.onStatusPress}
                  >
                    <View style={styles.viewBar}>
                      <View style={[styles.viewBarPlay, { width: playWidth }]} />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.txtCounter}>
                    {this.state.playTime} / {this.state.duration}
                  </Text>

                  <View style={styles.playBtnWrapper}>
                    <Button title = 'PLAY'
                      style={styles.btn}
                      onPress={this.onStartPlay}
                      textStyle={styles.txt}
                    >
                      
                    </Button>
                    <Button title = 'PAUSE'
                      style={[
                        styles.btn,
                        {
                          marginLeft: 12 ,
                        },
                      ]}
                      onPress={this.onPausePlay}
                      textStyle={styles.txt}
                    >
                      
                    </Button>
                    <Button title = 'STOP'
                      style={[
                        styles.btn,
                        {
                          marginLeft: 12 ,
                        },
                      ]}
                      onPress={this.onStopPlay}
                      textStyle={styles.txt}
                    >
                      
                    </Button>
               
                  </View>
                </View>
              </View>
        );
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
        alignItems: 'center',
      },
      titleTxt: {
        marginTop: 50 ,
        color: 'orange',
        fontSize: 28 ,
      },
      viewRecorder: {
        marginTop: 40 ,
        width: '100%',
        alignItems: 'center',
      },
      recordBtnWrapper: {
        flexDirection: 'row',
      },
      viewPlayer: {
        marginTop: 60 ,
        alignSelf: 'stretch',
        alignItems: 'center',
      },
      viewBarWrapper: {
        marginTop: 20 ,
        marginHorizontal: 30 ,
        alignSelf: 'stretch',
      },

      viewBar: {
        backgroundColor: 'white',
        height: 4 ,
        alignSelf: 'stretch',
      },
      viewBarPlay: {
        backgroundColor: 'orange',
        height: 4 ,
        width: 0,
      },
      playBtnWrapper: {
        flexDirection: 'row',
        marginTop: 60 
      },
      txt: {
        color: 'white',
        fontSize: 22 ,
        marginHorizontal: 8 ,
        marginVertical: 4,
      },
      txtRecordCounter: {
        marginTop: 32 ,
        color: 'white',
        fontSize: 30 ,
        textAlignVertical: 'center',
        fontWeight: '200',
        letterSpacing: 3,
      },
      txtCounter: {
        marginTop: 12 ,
        color: 'white',
        fontSize: 23 ,
        textAlignVertical: 'center',
        fontWeight: '200',
        fontFamily: 'Helvetica Neue',
        letterSpacing: 2,
      },
    
});

export default VoiceRecorder ;
