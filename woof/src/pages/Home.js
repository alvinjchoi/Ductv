/**
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component {

  calendar() {
    Actions.calendar()
  }

  enterTask() {
    Actions.enterTask()
  }

  todolist() {
    Actions.todolist()
  }

  testAsyncStorage() {
    Actions.testAsyncStorage()
  }

  editEvent() {
    Actions.editEvent()
  }

  addEvent() {
    Actions.addEvent()
  }

  moreInfoEvent(){
    Actions.moreInfoEvent()
  }

  editTask(){
    Actions.editTask()
  }

  userhome(){
    Actions.userhome()
  }


  tasktest = () => {
    fetch('http://127.0.0.1:8000/task/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: 'Post Task 3',
        description: 'AAAAAAAAAAAAAAAAAAAAA',
        owner: 'http://127.0.0.1:8000/profile/3',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert("You did it. I am so proud.");
      })
      .catch((error) => {
        console.error(error);
      });
  } 


  render() {
    return (
      <View style={styles.container}>

        <View>
          <TouchableOpacity onPress={this.calendar}>
            <Text style={styles.calendarbutton} >
              Calendar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.todolist}>
            <Text style={styles.calendarbutton} >
              To do list
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.testAsyncStorage}>
            <Text style={styles.calendarbutton} >
              Test AsyncStorage
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.addEvent}>
            <Text style={styles.calendarbutton} >
              Add Event
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.enterTask}>
            <Text style={styles.calendarbutton} >
              Add Task
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.moreInfoEvent}>
            <Text style={styles.calendarbutton} >
              More Info Event
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.editEvent}>
            <Text style={styles.calendarbutton} >
              Edit Event
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.editTask}>
            <Text style={styles.scratchPaper} >
              Edit Task
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.userhome}>
            <Text style={styles.scratchPaper} >
              User HomeScreen
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={this.tasktest}>
            <Text style={styles.calendarbutton} >
              Make a task in Django (this page)
          </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }

}//t@t.com

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
