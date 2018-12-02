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
  Button,
  Alert,

} from 'react-native';

import { Actions } from 'react-native-router-flux';
import bgImage from '../images/loginbkg.jpg'
import logo from '../images/homelogo.png'

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
    }
  }

  createUser = (username, email) => {
    fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/user/', {
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

  handleSubmit = () => {
    const { username, email } = this.state;
    // perform all necessary validations
    if (username == '') {
      alert("Username cannot be empty")
    }
    else {
      fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/user/', {
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
            Actions.home();
          } catch (error) {
            Alert.alert("oh shit waddup");
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

        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Username'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underLineColorAndroid='transparent'
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            fontFamily= 'Montserrat-ExtraLight'
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Email address'}
            autoCapitalize = 'none'
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underLineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            fontFamily= 'Montserrat-ExtraLight'
          />
        </View>

        <View style={styles.inputContainer}>
         <TextInput
             style={styles.input}
             placeholder={'Password'}
             secureTextEntry={true}
             placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
             underLineColorAndroid='transparent'
             onChangeText={(password) => this.setState({ password })}
             value={this.state.password}
             fontFamily= 'Montserrat-ExtraLight'
           />
         </View>
         <View style={styles.inputContainer}>
           <TextInput
             style={styles.input}
             placeholder={'Confirm Password'}
             secureTextEntry={true}
             placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
             underLineColorAndroid='transparent'
             onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
             value={this.state.confirmPassword}
             fontFamily= 'Montserrat-ExtraLight'
           />
         </View>

        <TouchableOpacity style={styles.btnLogin}>
          <Button
            color='rgba(255, 255, 255, 0.7)'
            title="Sign me up!"
            fontSize='16'
            //onPress={this.userLogin.bind(this)}
            onPress={this.handleSubmit}
            fontFamily= 'Montserrat-ExtraLight'
          />
        </TouchableOpacity>

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
  input: {
    width: WIDTH - 55, //padding on right
    height: 45, //height of text box
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45, //text padding on left
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25, //padding on left
    fontFamily: 'Montserrat-ExtraLight'
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
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
});
