import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'

const TeacherScreen = () => {
  const navigation = useNavigation()


  const onHome = () => {
    navigation.navigate('techHome')
  }
  const onCalender = () => {
    navigation.navigate('techCalender')
  }
  const onAnnouncement = () => {
    navigation.navigate('techAnnouncement')
  }
  const handleSignOut = () => {
    auth 
    .signOut()
    .then(() => {
        navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }
  return (
    <View style={styles.container}>
      <Text>Email:{auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={onHome}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Home Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onCalender}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Calender</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onAnnouncement}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Announment</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TeacherScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})