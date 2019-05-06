/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
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
  Alert,
} from 'react-native';

import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux';
import bgImage from '../images/LoginBkg.jpg'
import SvgComponent from "../images/SvgAssets/signupSVG.js";

const { width: WIDTH } = Dimensions.get('window');

// createUser = (username, email) =>{
//   fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/user/', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     username: username,
//     email: email,
//   }),
// })
// .then((response) => response.json())
// .then((responseJson) => {
// Alert.alert("You did it. I am so proud.");
// })
// .catch((error) => {
//   console.error(error);
// });
// }


// const saveUserId = async userId => {
//   try {
//     await AsyncStorage.setItem('userId', userId);
//   } catch (error) {
//     // Error retrieving data
//     console.log(error.message);
//   }
// };

// const saveProfId = async profileId => {
//   try {
//     await AsyncStorage.setItem('profileId', profileId);
//   } catch (error) {
//     // Error retrieving data
//     console.log(error.message);
//   }
// };

// const getuserId = async () => {
//   let userId = '';
//   try {
//     userId = await AsyncStorage.getItem('userId') || 'none';
//   } catch (error) {
//     // Error retrieving data
//     console.log(error.message);
//   }
//   return userId;
// }

export default class signUp extends React.Component {

  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  createUser = (username, email) => {
    fetch('http://127.0.0.1:8000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(JSON.stringify(responseJson));
        //Alert.alert("You did it. User is created.");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // async storeEmail(email){
  //   key = "email"
  //   if (email) {
  //     AsyncStorage.setItem(key, email)
  //     getEmail();
  //     return
  //   }
  //   else
  //     console.log('not set, stringify failed:', key, email)
  // }

  // async getEmail(){
  //   try{
  //     let email = await AsyncStorage.getItem("email");
  //     console.log("email is "+ email);

  //   }catch(error){
  //     console.log("something went wrong")
  //   }
  // }

  // async storeItem(key, item) {
  //   try {
  //       //we want to wait for the Promise returned by AsyncStorage.setItem()
  //       //to be resolved to the actual value before returning the value
  //       var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
  //       return jsonOfItem;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // async retrieveItem(key) {
  //   try {
  //     const retrievedItem =  await AsyncStorage.getItem(key);
  //     const item = JSON.parse(retrievedItem);
  //     return item;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   return
  // }

  handleSubmit = (title, message) => {
    const { username, email, password, confirmPassword } = this.state;

    if(password !== confirmPassword){
      alert("Passwords need to match");
    } else if (username === '' || password === '' || confirmPassword ===''|| email ==='') {
      alert("All fields must be included.")
    }
    else {
      fetch('http://127.0.0.1:8000/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          var usr = JSON.stringify(responseJson);
          try {
            answer = AsyncStorage.setItem('user', usr);
            Actions.Login();
          } catch (error) {
            Alert.alert("Error", message);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      //userObject = createUser(this.username, this.email)
      // var profileId = '2'
      // var userId = '1'
      // this.storeEmail(email)
      // this.storeItem("userId", userId)
      // this.storeItem("profileId", profileId)

      // AsyncStorage.getItem(userId)
      // .then((value) => {
      //   const data = JSON.parse(value);
      //   console.log('profileID is ', data.name);
      // });

      // var uid = this.retrieveItem("userId").then((uid) => {
      //     // this callback is executed when your Promise is resolved
      //     //return uid
      // }).catch((error) => {
      //     // this callback is executed when your Promise is rejected
      //     console.log('Promise is rejected with error: ' + error);
      // });
      // Alert.alert(uid)
    }
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>

          <SvgComponent/>

          {/*<View style={styles.logoContainer}>*/}
          {/*    <Image source={logo} style={styles.logo} />*/}
          {/*    <Text style={styles.SignupText}>Sign Up</Text>*/}
          {/*</View>*/}

          <View style={styles.inputContainer}>
              <TextInput
                  autoFocus='true'
                  autoCapitalize='none'
                  style={styles.input}
                  placeholder={'Username'}
                  placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                  underLineColorAndroid='transparent'
                  onChangeText={(val) => this.setState({username: val})}
                  value={this.state.username}
              />
          </View>

          <View style={styles.inputContainer}>
              <TextInput
                  autoCapitalize='none'
                  style={styles.input}
                  placeholder={'Email address'}
                  placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                  underLineColorAndroid='transparent'
                  onChangeText={(val) => this.setState({email: val})}
                  value={this.state.email}
              />
          </View>

          <View style={styles.inputContainer}>
              <TextInput
                  autoCapitalize='none'
                  style={styles.input}
                  placeholder={'Password'}
                  secureTextEntry={true}
                  placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                  underLineColorAndroid='transparent'
                  onChangeText={(val) => this.setState({password: val })}
                  value={this.state.password}
              />
          </View>
          <View style={styles.inputContainer}>
              <TextInput
                  autoCapitalize='none'
                  style={styles.input}
                  placeholder={'Confirm Password'}
                  secureTextEntry={true}
                  placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                  underLineColorAndroid='transparent'
                  onChangeText={(val) => this.setState({confirmPassword: val })}
                  value={this.state.confirmPassword}
              />
          </View>

          <Button
              containerStyle={{
                  width: WIDTH - 55,
                  height: 45,
                  borderRadius: 5,
                  alignItems: 'center',
                  marginTop: 20,
                  backgroundColor: '#3AD29F',
                  justifyContent: 'center'}}
              style={{fontSize: 15, color: 'white', fontFamily: 'Helvetica Neue', fontWeight: 'bold'}}
              color= 'rgba(255, 255, 255, 0.7)'
              onPress={this.handleSubmit.bind(this)}>
              SIGN ME UP
          </Button>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSignupText: {
      textAlign: 'center',
      fontFamily: 'Montserrat-ExtraLight',
      color: 'white',
      fontSize: 20,
      justifyContent: 'center',
      fontWeight: 'bold',
      opacity: 1,
    },
    input: {
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        // borderWidth: 0.7,
        width: WIDTH - 55,
        fontFamily: 'Helvetica Neue',
        height: 45,
        // borderRadius: 5,
        fontSize: 16,
        paddingLeft: 25,
        marginHorizontal: 25,
        marginBottom: 10,
    },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
  },
  inputContainer: {
    marginTop: 10,
  },
  btnLogin: {
      width: WIDTH - 70,
      height: 60,
      borderRadius: 45,
      justifyContent: 'center',
      marginTop: 160,
      backgroundColor: '#3ad29f',
      opacity: 0.8,
  },
    SignupText: {
        fontFamily: 'Montserrat-ExtraLight',
        color: 'white',
        fontSize: 40,
        justifyContent: 'center',
        fontWeight: '500',
        marginTop: 10,
        // opacity: ,
    },
});
