import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, TextInput, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { getGlassmorphism, getColors } from '../styles/globalStyles';

const SettingsScreen = () => {
  const { data, clearAllData, updateBudget } = useExpense();
  const colorScheme = useColorScheme();
  const [userDarkMode, setUserDarkMode] = useState<boolean | null>(null);
  const isDarkMode = userDarkMode ?? colorScheme === 'dark';
  const { colors } = getColors(isDarkMode);
  const glassmorphism = getGlassmorphism(isDarkMode);
  const styles = getStyles(colors);
  const [budgetInput, setBudgetInput] = useState(data.monthlyBudget.toString());

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

  const handleBudgetUpdate = () => {
    const newBudget = parseFloat(budgetInput);
    if (!isNaN(newBudget) && newBudget > 0) {
      updateBudget(newBudget);
      Alert.alert('Success', 'Monthly budget updated');
    } else {
      Alert.alert('Invalid Amount', 'Please enter a valid budget amount');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={[glassmorphism.container, styles.settingItem]}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setUserDarkMode(value)}
          trackColor={{ false: '#767577', true: colors.accent }}
          thumbColor={isDarkMode ? colors.text : '#f4f3f4'}
        />
      </View>

      <View style={[glassmorphism.container, styles.settingItem]}>
        <Text style={styles.settingText}>Monthly Budget</Text>
        <View style={styles.budgetContainer}>
          <TextInput
            style={styles.budgetInput}
            value={budgetInput}
            onChangeText={setBudgetInput}
            keyboardType="numeric"
            placeholder="Enter budget"
            placeholderTextColor={colors.secondaryText}
          />
          <TouchableOpacity 
            style={styles.budgetButton}
            onPress={handleBudgetUpdate}
          >
            <Text style={styles.budgetButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
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

const getStyles = (colors: {
  background: string;
  text: string;
  secondaryText: string;
  accent: string;
  danger: string;
}) => StyleSheet.create({
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
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 10,
    color: colors.text,
    width: 120,
    marginRight: 10,
  },
  budgetButton: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    padding: 10,
  },
  budgetButtonText: {
    color: colors.background,
    fontWeight: 'bold',
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