import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function FirstPage(props) {
  return (
    <View style={styles.container}>
      <Image 
      source={require('../Images/kolav.png')}
      style= {{ width: 60, height: 60, }}
      />
      <Image 
      source={require('../Images/lookalike.png')}
      style= {{ width: 350, height: 100, marginBottom: 100}}
      />

      <TouchableOpacity style={styles.login_button} onPress={() => {
        props.navigation.navigate('LogIn');
        }}><Text style={styles.login_buttonText} >LOG IN</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.signup_button} onPress={() => {
        props.navigation.navigate('SignUp');
        }}><Text style={styles.signup_buttonText} >SIGN UP</Text>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize:50,
      color: '#333333',
    },
    signup_button: {
      backgroundColor: 'black',
      width: 200,
      height:50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    signup_buttonText: {
      color: '#ffffff',
      fontSize: 18,
    },
    login_button: {
        backgroundColor: '#eeeeee',
        width: 200,
        height:50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      login_buttonText: {
        color: '#000000',
        fontSize: 18,
      },
  });