import React from 'react';
import {
  Alert,
  Component,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  Button,
  NavigatorIOS,
  DatePickerIOS,
  DatePickerAndroid,
  CheckBox,
  Slider,
  StatusBar,
} from 'react-native';
import DatePicker from 'react-native-datepicker'


const { width: WIDTH } = Dimensions.get('window');

var moment = require('moment');

export default class EnterTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    this.state = {
      
      chosenDate: new Date(),
      dated: new Date(),
      timed: '00:00',
      showDatePicker: false,
      taskname: '',
      taskdescription: '',
      priority: 1,
      chosenpri: 1,
      due: null,
      duration: '00:30',
      chosendur: '30',
      chosendue: null,
      checkdur: false,
      checkpri: false,
      checkdate: false,
      checktime: false
    }
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate })
  }

  taskbarr = () =>{
      if(this.state.taskname == ''){
          Alert.alert("Please enter Task Name.");
      } else{
          this.tasktest()
          this.props.navigation.navigate('todolist')
      }
  };
  
  changedur(){
    this.setState({
        checkdur: !this.state.checkdur
    })
      alert("button did a change to " + !this.state.checkdur)
  }

  changepri(){
    this.setState({
        checkpri: !this.state.checkpri
    })
      alert("button did a change to " + !this.state.checkpri)
  }

tasktest = () =>{
    fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      header: this.state.taskname,
      description: this.state.taskdescription,
      priority: this.state.priority,
      duration: (parseInt(this.state.duration.substring(3, 5), 10) + (parseInt(this.state.duration.substring(0, 2), 10) * 60)),
      due: this.state.due,
      owner: 'http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/profile/1/',
    }),
})
  .then((response) => response.json())
  .then((responseJson) => {
//Alert.alert("Task Successfully Added.");
Alert.alert((parseInt(this.state.duration.substring(3, 5), 10) + (parseInt(this.state.duration.substring(0, 2), 10) * 60)) + " " + this.state.priority);
  })
  .catch((error) => {
    console.error(error);
  });

}

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.getStartedText}>Task Information</Text>

        <View style={styles.inputContainer}>
          <TextInput
            id={'tasknames'}
            style={styles.input}
            placeholder={'Task Name'}
            secureTextEntry={false}
            placeholderTextColor={'rgba(100, 100, 100, 0.7)'}
            onChangeText={(taskname) => this.setState({ taskname })}
            value={this.state.taskname}
          />
          <TextInput
            style={styles.input}
            placeholder={'Description'}
            secureTextEntry={false}
            placeholderTextColor={'rgba(100, 100, 100, 0.7)'}
            onChangeText={(taskdescription) => this.setState({ taskdescription })}
            value={this.state.taskdescription}
          />
        </View>

        <View style = {{flexDirection: 'row', paddingLeft: 40}}>

          <Text style={{paddingTop: 10}}>Duration: </Text>

          <DatePicker
          style={{width: 200}}
          date={this.state.duration}
          mode="time"
          placeholder="select date"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          customStyles={{
              dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys. {(durationFormat) => {this.changedur({date: durationFormat})}}
          }}
          onDateChange={(duration) => this.setState({duration})}/>
        </View>
        
        <View style = {{flexDirection: 'row', paddingLeft: 40}}>

          <Text style={{paddingTop: 10}}>Priority:</Text>

          <Image source={require('../images/nimportant.png')} style={{width: 30, height: 30}} />
          <Slider
            style={{width: 200}}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={(priority) => this.setState({ priority })}
            value={this.state.priority}
          />
          <Image source={require('../images/vimportant.png')} style={{width: 30, height: 30}} />
        </View>

        <View style = {{flexDirection: 'row', paddingLeft: 40}}>
          <Text style={{paddingTop: 10}}>Due Date:</Text>
          <DatePicker
            style={{width: 250}}
            date={this.state.due}
            mode="datetime"
            placeholder="select date (optional)"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys. {(durationFormat) => {this.changedur({date: durationFormat})}}
            }}
            onDateChange={(due) => this.setState({due})}/>
        </View>
      
        
        <View style={styles.addButtonContainer}>
          <Button
            onPress={this.taskbarr}
            title="ADD TASK"
            color="#000000"
          />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  getStartedText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 36,
    marginTop: 60,
    fontWeight: '300'
  },
  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  input: {
    width: WIDTH - 90, //left-right text input size
    height: 40,         //up-down text input size
    borderRadius: 20,
    fontSize: 16,
    paddingLeft: 40,  //inside text paddinging
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: '#EADCD9',
    marginHorizontal: 40,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  addButtonContainer: {
    paddingTop: 50
  },
  container: {
    flex: 0,
    backgroundColor: '#7B6F92',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

module.exports = EnterTaskScreen;