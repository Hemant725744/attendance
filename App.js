import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './Welcome';
import Login from './screens/Login';
import TeacherScreen from './teacher/TeacherScreen';
import techCalender from './teacher/techCalender';
import techAnnouncement from './teacher/techAnnouncement';
import techHome from './teacher/techHome';
import ParentScreen from './parent/ParentScreen';
import parHome from './parent/parHome';
import parCalendar from './parent/parCalendar';
import parAnnouncement from './parent/parAnnouncement';

// Import AttendanceUploadScreen
import AttendanceUploadScreen from './teacher/AttendanceUploadScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} /> 
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="TeacherScreen" component={TeacherScreen} /> 
        <Stack.Screen name="techHome" component={techHome} /> 
        <Stack.Screen name="techCalender" component={techCalender} />
        <Stack.Screen name="techAnnouncement" component={techAnnouncement} /> 
        <Stack.Screen name="ParentScreen" component={ParentScreen} /> 
        <Stack.Screen name="parHome" component={parHome} /> 
        <Stack.Screen name="parCalendar" component={parCalendar}/>
        <Stack.Screen name="parAnnouncement" component={parAnnouncement} /> 

        <Stack.Screen name="AttendanceUploadScreen" component={AttendanceUploadScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
