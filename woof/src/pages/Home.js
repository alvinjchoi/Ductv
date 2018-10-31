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
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component {

  calendar() {
		Actions.calendar()
  }
  enterTask(){
    Actions.enterTask()
  }
  taskdjangotest(){
    Actions.taskdjangotest()
  }

  todolist(){
    Actions.todolist()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>I'm home</Text>
        <View>
          <TouchableOpacity onPress={this.calendar}>
            <Text style={styles.calendarbutton} >
              Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.enterTask}>
            <Text style={styles.calendarbutton} >
              Entering Task
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.taskdjangotest}>
            <Text style={styles.calendarbutton} >
              Task Django Test
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.todolist}>
            <Text style={styles.calendarbutton} >
              To Do list
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
