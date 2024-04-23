import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function UploadItem() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD NEW CLOTHING</Text>
      <View style={styles.twoinarow}>
      <TouchableOpacity style={styles.button2} >
        <Text style={styles.buttonText}>Take a picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} >
        <Text style={styles.buttonText}>Scan barcode</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.txt}>CLOTHING TYPE</Text>
      <Text style={styles.txt}>SEASON</Text>
      <Text style={styles.txt}>BRAND</Text>
      <Text style={styles.txt}>COLOR</Text>
      <Text style={styles.txt}>SIZE</Text>
      <Text style={styles.txt}>NAME</Text>
      <Text style={styles.txt}>PRICE</Text>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>ADD ITEM</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    margin: 40,
    fontSize:30,
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
    height:40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  txt: {
    //textAlign: 'left',
    fontSize: 20,
    margin: 20,
  },
  button2: {
    backgroundColor: '#B5AAA5',
    padding: 8,
    borderRadius: 5,
    //marginLeft: 5,
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 20
  },
  twoinarow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});