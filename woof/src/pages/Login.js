
import React, { Component } from 'react';

import {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import bgImage from '../images/LoginBkg.jpg'
import SvgComponent from '../images/SvgAssets/logoSVG'


const { width: WIDTH } = Dimensions.get('window');

export default class Login extends React.Component {

    constructor(){
        super();

        this.state = {
          email: ""
        }
    }

    static signUp() {
		Actions.signUp()
    }

    validHome = () => {
      const { email } = this.state;
      const response = fetch('http://127.0.0.1:8000/user/')
        .then(function(response) {
          return response.json()
        })
        .then(function(myJson){
          users = JSON.stringify(myJson);
          users = JSON.parse(users);
          loggedInUser = null;
          for(var i = 0; i < users.length; i++){
            if (users[i].email === email){
              loggedInUser = users[i];
            }
          }
          //Alert.alert()
          if (loggedInUser != null){
            try {
              loggedInUser = JSON.stringify(loggedInUser);
              answer = AsyncStorage.setItem('user', loggedInUser);
              Actions.userhome();
            } catch (error) {
              Alert.alert("oh shit waddup");
            }
          } else { Alert.alert("Invalid Email")}
      });
    };

    goHome(){
      fetch('http://127.0.0.1:8000/user/3/')
        .then(function(response) {
          return response.json()
        })
        .then(function(myJson){
          var user = JSON.stringify(myJson);
          try {
            answer = AsyncStorage.setItem('user', user);
            Actions.userhome();
          } catch (error) {
            Alert.alert("Error");
          }
          //Alert.alert(user);
          //usr = JSON.parse(usr);
      });
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <View>
                    <Text style={styles.topTitle}>
                        Get Things Done.
                    </Text>
                    <SvgComponent/>
                </View>

                <TextInput
                    autoCapitalize='none'
                    style={styles.input}
                    placeholder={'Username'}
                    placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                    underLineColorAndroid='transparent'
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                />

                <TextInput
                    autoCapitalize='none'
                    style={styles.input}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                    underLineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />

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
                    onPress={this.goHome}>
                    LOGIN
                </Button>

                <View>
                    <TouchableOpacity onPress={Login.signUp}>
                        <Text style={styles.signupButton} >
                            New user? Sign up
                        </Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    topTitle: {
        textAlign: 'left',
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 40,
        marginLeft: 35,
        marginRight: 200
    },

    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLogin: {
        width: WIDTH - 70,
        height: 60,
        borderRadius: 45,
        justifyContent: 'center',
        marginTop: 160,
        backgroundColor: '#413a5d',
        opacity: 0.8,
    },

    btnLoginText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-ExtraLight',
        color: 'white',
        fontSize: 20,
        justifyContent: 'center',
        fontWeight: 'bold',
        opacity: 1,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
    logoText: {
        fontFamily: 'Montserrat-ExtraLight',
        color: 'white',
        fontSize: 40,
        justifyContent: 'center',
        fontWeight: '500',
        marginTop: 10,
        // opacity: ,
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
    inputContainer: {
        marginTop: 50,
    },
    signupButton:{
        color: '#3ad29f',
        fontSize: 14,
        fontWeight: '500',
        alignItems: 'center',
        paddingVertical: 16,
    },

});
