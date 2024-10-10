import { Image, StyleSheet, View, Text } from 'react-native';

// Define your new components
function TimeTable() {
  return (
    <View style={styles.componentContainer}>
      <Image
        source={require('../assets/timetable.jpg')} 
        style={styles.componentImage}
      />
      <Text style={styles.componentText}>Time Table</Text>
    </View>
  );
}

function AcademicCalendar() {
  return (
    <View style={styles.componentContainer}>
      <Image
        source={require('../assets/TermCalendar.png')} 
        style={styles.componentImage}
      />
      <Text style={styles.componentText}>Term Calendar</Text>
    </View>
  );
}

function Events() {
  return (
    <View style={styles.componentContainer}>
      <Image
        source={require('../assets/Events.jpeg')}
        style={styles.componentImage}
      />
      <Text style={styles.componentText}>Upcoming Events</Text>
    </View>
  );
}

export default function Calendar() {
  return (
    <View style={styles.container}>
      <View style={styles.headerImagesContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.reactLogo}
        />
      
      </View>
      <TimeTable />
      <AcademicCalendar />
      <Events />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    flex: 1,
  },
  componentContainer: {
    marginVertical: 15,
    // padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center', // Center align content
    // display: 'flex'
  },
  componentImage: {
    width: '100%', // Adjust the width to fit the container
    height: 100, // Adjust height as needed
    borderRadius: 1,
    marginBottom: 25, // Space between image and text
  },
  componentText: {
    fontSize: 18,
    color: '#333', // Darker text color for contrast
    textAlign: 'center', // Center align text
  },
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
  profileImage: {
    height: 45,
    width: 45,
    marginTop: 40,
    borderRadius: 50, // Make the image circular
    marginLeft: 130, // Add space between logo and profile image
  },
});
