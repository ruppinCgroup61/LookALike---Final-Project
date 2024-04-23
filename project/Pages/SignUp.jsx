import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtsb7LYsYbTw-voA2NK_ZN_7Qe5-ZIa3h1oovfToe6yQ&s"
  );

  // Handle sign up logic here
  const handleSignUp = () => {
    // Check if phone number is exactly 10 digits
    if (phone.length !== 10) {
      alert("Phone number must be 10 digits");
      setPhone("");
      return;
    }

    // email validation
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Check if age is between 8 and 99
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 8 || age > 99) {
      alert("Age must be between 8 and 99");
      return;
    }

    // Submit only if there are no empty fields
    let defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtsb7LYsYbTw-voA2NK_ZN_7Qe5-ZIa3h1oovfToe6yQ&s";
    if (firstName && lastName && password && image!=defaultImage) {
        alert("Great :)");
    } else alert("Please make sure you have filled in all the details");

    console.log("Signing up...", {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      email,
      password,
      image,
    });
  };

  // upload a profile picture
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
      base64: true,
    });
    console.log(result);

    // check that the upload didnt cancel
    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  // first&last name validation >> english only
  const englishLettersRegex = /^[A-Za-z]+$/;

  const isValidName = (name) => {
    return englishLettersRegex.test(name);
  };

  // birth date validation
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === "ios"); // סגור את מודל התאריך בסיום בחירה באייפון
    setDateOfBirth(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {/* profile picture*/}
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, marginBottom: 20, borderRadius: 50 }}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#B1B1B1"
        value={firstName}
        onChangeText={(text) => {
          if (text.length === 0 || isValidName(text)) {
            setFirstName(text);
          }
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#B1B1B1"
        value={lastName}
        onChangeText={(text) => {
          if (text.length === 0 || isValidName(text)) {
            setLastName(text);
          }
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#B1B1B1"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B1B1B1"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B1B1B1"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.dateButton}>
        <Button
          onPress={showDatepicker}
          title="Date of birth"
          color="#000000"
        />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={handleDateChange}
            color="#000000"
          />
        )}
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Upload Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 30,
    color: "#333333",
    marginBottom: 15,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    fontSize: 16,
    color: "#333333",
  },
  button: {
    backgroundColor: "black",
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  uploadButton: {
    backgroundColor: "gray",
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  dateButton: {
    marginBottom: 20,
  },
});
