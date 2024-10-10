import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, Alert, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get device screen width

export default function Settings() {
  const [announcements] = useState([
    { id: '1', message: 'Meeting on Monday at 10 AM', author: 'CC' },
    { id: '2', message: 'Annual Day on 25th October', author: 'CC' },
    { id: '3', message: 'Holiday on 15th August', author: 'HR' },
    { id: '4', message: 'New policy announcement', author: 'CC' },
  ]);

  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeSection, setActiveSection] = useState('announcements'); // State to track active section

  // Add new message to the chat
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { id: Date.now().toString(), message: newMessage }]);
      setNewMessage('');
    }
  };

  // Handle deleting a message
  const handleDeleteMessage = (id) => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setChatMessages(chatMessages.filter(message => message.id !== id));
          },
        },
      ]
    );
  };

  // Filter announcements by author 'CC'
  const ccAnnouncements = announcements.filter(announcement => announcement.author === 'CC');

  return (
    <View style={styles.container}>
      <View style={styles.headerImagesContainer}>
        <Image source={require('../assets/icon.png')} style={styles.reactLogo} />
        <Image source={require('../assets/icon.png')} style={styles.profileImage} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          {/* Toggle Buttons for Announcements and Group Chat */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, activeSection === 'announcements' && styles.activeToggle]}
              onPress={() => setActiveSection('announcements')}
            >
              <Text style={styles.toggleButtonText}>Announcements</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, activeSection === 'groupchat' && styles.activeToggle]}
              onPress={() => setActiveSection('groupchat')}
            >
              <Text style={styles.toggleButtonText}>Group Chat</Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally Render Sections */}
          {activeSection === 'announcements' ? (
            <FlatList
              data={ccAnnouncements}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.announcementItem}>
                  <Text style={styles.announcementText}>{item.message}</Text>
                </View>
              )}
            />
          ) : (
            <View style={styles.groupChatContainer}>
              <FlatList
                data={chatMessages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.chatMessageContainer}>
                    <TouchableOpacity
                      style={styles.chatMessage}
                      onLongPress={() => handleDeleteMessage(item.id)} // Long press to delete
                    >
                      <Text style={styles.chatText}>{item.message}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteMessage(item.id)}>
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
                style={styles.chatList}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type your message"
                  value={newMessage}
                  onChangeText={setNewMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Set background color for the entire container
  },
  content: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeToggle: {
    backgroundColor: '#FCE38A', // Highlight color for active toggle
  },
  announcementItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  announcementText: {
    fontSize: 16,
  },
  groupChatContainer: {
    maxHeight: 200, // Limit the height of the chat list
  },
  chatMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#d9f9b1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  chatMessage: {
    flex: 1,
  },
  chatText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    marginLeft: 10,
  },
  chatList: {
    maxHeight: 200, // Limit the height of the chat list
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FCE38A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    fontWeight: 'bold',
    color: '#333',
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
    borderRadius: 50,
    marginLeft: 130,
  },
});
