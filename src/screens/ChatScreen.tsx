import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <ScrollView style={styles.chatContainer}>
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>Hello! How can I help with your expenses today?</Text>
        </View>
        <View style={[styles.messageBubble, styles.userMessage]}>
          <Text style={styles.messageText}>I need to track my monthly spending</Text>
        </View>
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>I can help analyze your spending patterns. Try adding some expenses first!</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatContainer: {
    flex: 1,
  },
  messageBubble: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#333',
  },
});

export default ChatScreen;