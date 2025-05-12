import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { glassmorphism, colors } from '../styles/globalStyles';

const SettingsScreen = () => {
  const { clearAllData } = useExpense();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all expense data? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: clearAllData },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={[glassmorphism.container, styles.settingItem]}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(!isDarkMode)}
          trackColor={{ false: '#767577', true: colors.accent }}
          thumbColor={isDarkMode ? colors.text : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity 
        style={[glassmorphism.container, styles.settingItem]}
        onPress={() => Alert.alert('About Cyros', 'Expense Tracker v1.0.0\nBuilt with React Native')}
      >
        <Text style={styles.settingText}>About Cyros</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[glassmorphism.container, styles.dangerButton]}
        onPress={handleClearData}
      >
        <Text style={[styles.settingText, styles.dangerText]}>Clear All Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.text,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
  },
  settingText: {
    fontSize: 18,
    color: colors.text,
  },
  dangerButton: {
    marginTop: 30,
    padding: 15,
    borderColor: colors.danger,
    borderWidth: 1,
  },
  dangerText: {
    color: colors.danger,
  },
});

export default SettingsScreen;