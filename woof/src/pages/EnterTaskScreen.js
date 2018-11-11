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
  Slider
} from 'react-native';
import DatePicker from 'react-native-datepicker'


const { width: WIDTH } = Dimensions.get('window');

var moment = require('moment');

export default class EnterTaskScreen extends React.Component {
  static navigationOptions = {
    title: 'EnterTaskScreen',
  };

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
      priority: 0,
      chosenpri: 0,
      duration: '00:30',
      chosendur: '30',
      chosendue: "2018-11-12T15:30",
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
          if(this.state.checkdur){
              var len = this.state.duration.length;
              this.state.chosendur = parseInt(this.state.duration.substring(len-2, len), 10);
              this.state.chosendur += parseInt(this.state.duration.substring(0, len-3), 10) * 60;
          } 
          if(this.state.checkpri) this.state.chosenpri =  this.state.priority;
          if(this.state.checkdate) {
              if(this.state.checktime){
                  this.state.chosendue = this.state.dated + 'T' + this.state.timed + ':00-05:00';
              } else{
                  this.state.chosendue = this.state.dated + 'T00:00:00-05:00';
              }
          }
          this.tasktest();
      }
      
  }
  
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

  changedate(){
    this.setState({
        checkdate: !this.state.checkdate
    })
      alert("button did a change to " + !this.state.checkdate)
  }

  changetime(){
    this.setState({
        checktime: !this.state.checktime
    })
      alert("button did a change to " + !this.state.checktime)
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
      priority: this.state.chosenpri,
      duration: this.state.chosendur,
      due: this.state.chosendue,
      owner: 'http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/profile/1/',
    }),
})
  .then((response) => response.json())
  .then((responseJson) => {
Alert.alert("Task Successfully Added.");
  })
  .catch((error) => {
    console.error(error);
  });

}

  render() {
            
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.getStartedText}>WHAT NEEDS TO GET DONE?</Text>

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
            placeholder={'Task Description(Optional)'}
            secureTextEntry={false}
            placeholderTextColor={'rgba(100, 100, 100, 0.7)'}
            multiline={true}
            onChangeText={(taskdescription) => this.setState({ taskdescription })}
            value={this.state.taskdescription}
          />
        </View>

        <View style = {{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
          <CheckBox
            onChange={this.changedur.bind(this)}
            title="checkdur"
            checked={this.state.checkdur}
          />
            
          <DatePicker
            style={{width: 200}}
            date={this.state.duration}
            mode="time"
            placeholder="select date"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../images/stopwatch.png')}
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
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({duration: date})}}
          />
            <Text style={{paddingTop: 10}}>  Duration?</Text>
        </View>
        
        <View style = {{flexDirection: 'row', paddingLeft: 10}}>
          
          <CheckBox
            onChange={this.changepri.bind(this)}
            title="checkpri"
            checked={this.state.checkpri}
          />
          <Image source={require('../images/nimportant.png')} style={{width: 30, height: 30}} />
          <Slider
            style={{width: 140}}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={(priority) => this.setState({ priority })}
            value={this.state.priority}
          />
          <Image source={require('../images/vimportant.png')} style={{width: 30, height: 30}} />
          <Text style={{paddingTop: 10}}>  Priority?</Text>
        </View>

        <View style = {{flexDirection: 'row', paddingLeft: 10}}>
          <CheckBox
            onChange={this.changedate.bind(this)}
            title="checkdate"
            checked={this.state.checkdate}
          />
          <DatePicker
            style={{width: 200}}
            date={this.state.dated}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2029-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
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
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({dated: date})}}
          />
            <Text style={{paddingTop: 10}}>  Due Date?</Text>
        </View>
        

        <View style = {{flexDirection: 'row', paddingLeft: 10}}>
          <CheckBox
            onChange={this.changetime.bind(this)}
            title="checktime"
            checked={this.state.checktime}
          />
          <DatePicker
            style={{width: 200}}
            date={this.state.timed}
            mode="time"
            placeholder="select date"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../images/clock.png')}
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
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({timed: date})}}
          />
            <Text style={{paddingTop: 10}}>  Due Time?</Text>
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
    paddingTop: 10,
    fontSize: 20,
    color: 'rgba(50, 50, 50, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderColor: 'rgba(0,0,0,1)',
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: 'rgba(0, 0, 0, 1)',
    marginHorizontal: 25,
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
    backgroundColor: '#FFF',
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