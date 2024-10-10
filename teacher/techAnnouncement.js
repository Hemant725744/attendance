import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Button, Alert, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'; // Ensure you have installed `react-native-tab-view`
import { getAuth } from 'firebase/auth'; // Import getAuth

// Announcements slide content with input form
const Announcements = () => {
  const auth = getAuth(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const handleAddAnnouncement = () => {
    if (title && content) {
      setAnnouncements(prevAnnouncements => [
        ...prevAnnouncements,
        { id: (prevAnnouncements.length + 1).toString(), title, content },
      ]);
      setTitle('');
      setContent('');
      Alert.alert('Announcement Added', 'The announcement has been added successfully.');
    } else {
      Alert.alert('Input Required', 'Please enter both a title and content.');
    }
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.inputLabel}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter announcement title"
      />
      <Text style={styles.inputLabel}>Content</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Enter announcement content"
        multiline
      />
      <Button title="Add Announcement" onPress={handleAddAnnouncement} />
      
      <FlatList
        data={announcements}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.announcementItem}>
            <Text style={styles.announcementTitle}>{item.title}</Text>
            <Text style={styles.announcementContent}>{item.content}</Text>
          </View>
        )}
        style={styles.announcementList}
      />
    </View>
  );
};

// Leave approvals slide content
const LeaveApprovals = () => {
  const leaveApplicationsData = [
    { id: '1', student: 'Ashutosh Chavan', reason: 'Medical reason' },
    { id: '2', student: 'Prachi Adbane', reason: 'Family event' },
    { id: '3', student: 'Hemant Bhatt', reason: 'Personal work' },
  ];

  const handleApproval = (studentName, isApproved) => {
    Alert.alert(
      'Leave Request Processed',
      `${studentName}'s leave has been ${isApproved ? 'approved' : 'rejected'}.`
    );
  };

  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={leaveApplicationsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.leaveItem}>
            <Text style={styles.leaveStudent}>{item.student}</Text>
            <Text style={styles.leaveReason}>Reason: {item.reason}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Approve" onPress={() => handleApproval(item.student, true)} />
              <Button title="Reject" onPress={() => handleApproval(item.student, false)} color="red" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Main Announcement component with TabView
export default function Announcement() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'announcements', title: 'Make Announcements' },
    { key: 'leaveApprovals', title: 'Leave Applications' },
  ]);

  const renderScene = SceneMap({
    announcements: Announcements,
    leaveApprovals: LeaveApprovals,
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Header Container with Background Color */}
      <View style={styles.headerContainer}>
        <View style={styles.headerImagesContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.reactLogo}
          />
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FCE38A',
    paddingBottom: 20, 
  },
  headerImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  reactLogo: {
    height: 40,
    width: 190,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  announcementList: {
    marginTop: 16,
  },
  announcementItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  announcementContent: {
    fontSize: 16,
    color: '#333',
  },
  leaveItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  leaveStudent: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  leaveReason: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabBar: {
    backgroundColor: '#FCE38A',
  },
  tabLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: '#000',
  },
});
