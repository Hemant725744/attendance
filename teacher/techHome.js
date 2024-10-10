import React from 'react';
import { Image, View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export default function HomeScreen() {
  const navigation = useNavigation();  // Use navigation hook

  return (
    <View style={styles.container}>
      <View style={styles.headerImagesContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.reactLogo}
        />
      </View>

      <Text style={styles.welcomeText}>Welcome to the Class Advisor Page</Text>
      
      <View style={styles.rowContainer}>
        <View style={[styles.row, styles.firstRow]}>
          <Text style={styles.cell}>TE A</Text>
          <Button
            title="Go to TE A"
            onPress={() => navigation.navigate('TE A')}  // Example navigation
          />
        </View>

        <View style={[styles.row, styles.secondRow]}>
          <Text style={styles.cell}>TE B</Text>
          <Button
            title="Go to TE B"
            onPress={() => navigation.navigate('TE B')}  // Example navigation
          />
        </View>

        <View style={[styles.row, styles.firstRow]}>
          <Text style={styles.cell}>TE C</Text>
          <Button
            title="Go to TE C"
            onPress={() => navigation.navigate('TE C')}  // Example navigation
          />
        </View>

        {/* Add a new row for Attendance Upload */}
        <View style={[styles.row, styles.secondRow]}>
          <Text style={styles.cell}>Upload Attendance</Text>  
          <Button
            title="Upload"
            onPress={() => navigation.navigate('AttendanceUploadScreen')}  // Navigation to AttendanceUploadScreen
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  reactLogo: {
    height: 40,
    width: 190,
    marginTop: 40,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  rowContainer: {
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
  },
  firstRow: {
    backgroundColor: '#f9f9f9',
  },
  secondRow: {
    backgroundColor: '#fff',
  },
  cell: {
    fontSize: 18,
    flex: 1,
  },
});
