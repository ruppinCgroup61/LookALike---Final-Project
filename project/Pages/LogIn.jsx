import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // You can add your authentication logic here
  };

  return (
    <View style={styles.container}>
      <View  style={styles.tit}><Text style={styles.title}>SIGN IN</Text></View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#B1B1B1"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B1B1B1"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
    <View  style={styles.tit1}>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
  </View>
    </View>
  );
};

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
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    fontSize: 16,
    color: '#333333',
  },
  button: {
    backgroundColor: 'black',
    width: 200,
    height:50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
 
  forgotPasswordText: {
    color: 'black',
    fontSize: 16,
    marginLeft:30,
  },
 tit: {
    marginBottom:100,
  },
  tit1: {
    marginTop:50,
  }
});

export default LogIn;