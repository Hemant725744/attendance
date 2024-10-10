import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase'; // Import firebase app

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const db = getFirestore(app); // Initialize Firestore instance

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email or password is missing");
      return;
    }

    try {
      // Fetch the user document based on the entered email
      const userDocRef = doc(db, 'users', email);  // Assuming email is the document ID
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Check if the password matches
        if (userData.password === password) {
          console.log("Login successful");
          console.log("User Role:", userData.role);

          // Check the role and navigate accordingly
          if (userData.role === 'parent') {
            console.log("Logged in as Parent");
            navigation.navigate('ParentScreen');  // Navigate to Parent Home
          } else if (userData.role === 'teacher') {
            console.log("Logged in as Teacher");
            navigation.navigate('TeacherScreen');  // Navigate to Teacher Home
          } else {
            console.log("Unknown role");
            Alert.alert("Error", "Unknown role.");
          }
        } else {
          console.log("Incorrect password");
          Alert.alert("Error", "Incorrect password.");
        }
      } else {
        console.log("No such user found in Firestore");
        Alert.alert("Error", "No such user found.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
})
