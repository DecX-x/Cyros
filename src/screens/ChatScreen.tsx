import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import React from 'react';
import { getColors } from '../styles/globalStyles';

const ChatScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { colors } = getColors(isDarkMode);
  const styles = getStyles(colors, isDarkMode);
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

const getStyles = (colors: {
  background: string;
  text: string;
  secondaryText: string;
  accent: string;
}, isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
  },
  chatContainer: {
    flex: 1,
  },
  messageBubble: {
    backgroundColor: isDarkMode ? colors.secondaryText : '#f0f0f0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: colors.accent,
    alignSelf: 'flex-end',
  },
  messageText: {
    color: colors.text,
  },
});

export default ChatScreen;