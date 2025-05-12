import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, useColorScheme } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { getGlassmorphism, getColors } from '../styles/globalStyles';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Add: undefined;
  Transactions: undefined;
  Settings: undefined;
};

type AddExpenseTabParamList = {
  ManualEntry: undefined;
  CameraUpload: undefined;
};

type AddExpenseScreenProps = BottomTabScreenProps<RootStackParamList, 'Add'>;
type ManualEntryScreenProps = MaterialTopTabScreenProps<AddExpenseTabParamList, 'ManualEntry'>;

const Tab = createMaterialTopTabNavigator<{
  ManualEntry: undefined;
  CameraUpload: undefined;
}>();

const ManualEntryScreen = ({ navigation }: ManualEntryScreenProps) => {
  const { addExpense, data } = useExpense();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { colors } = getColors(isDarkMode);
  const glassmorphism = getGlassmorphism(isDarkMode);
  const styles = getStyles(colors);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(data.categories[0]);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    addExpense({
      amount: parseFloat(amount),
      category,
      date: format(date, 'yyyy-MM-dd'),
      notes,
    });

    Alert.alert('✓ Expense Added', 'Your expense has been recorded', [
      {
        text: 'OK',
        onPress: () => navigation.getParent()?.navigate('Home'),
        style: 'default'
      },
    ]);
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={glassmorphism.container}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="decimal-pad"
          placeholderTextColor={colors.secondaryText}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryContainer}>
          {data.categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.selectedCategory,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{format(date, 'MMMM d, yyyy')}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any notes..."
          placeholderTextColor={colors.secondaryText}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const CameraUploadScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { colors } = getColors(isDarkMode);
  const glassmorphism = getGlassmorphism(isDarkMode);
  const styles = getStyles(colors);
  return (
    <View style={[styles.tabContainer, glassmorphism.container]}>
      <Text style={styles.placeholderText}>Camera/Upload UI Placeholder</Text>
      <Text style={styles.placeholderSubtext}>
        This will allow uploading receipts for AI processing in the future
      </Text>
    </View>
  );
};

const AddExpenseScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { colors } = getColors(isDarkMode);
  const styles = getStyles(colors);
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.secondaryText,
          tabBarStyle: { backgroundColor: colors.background },
          tabBarIndicatorStyle: { backgroundColor: colors.accent },
        }}
      >
        <Tab.Screen name="ManualEntry" component={ManualEntryScreen} />
        <Tab.Screen name="CameraUpload" component={CameraUploadScreen} />
      </Tab.Navigator>
    </View>
  );
};

const getStyles = (colors: {
  background: string;
  text: string;
  secondaryText: string;
  accent: string;
}) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: colors.text,
    fontSize: 16,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  categoryButton: {
    padding: 10,
    margin: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedCategory: {
    backgroundColor: colors.accent,
  },
  categoryText: {
    color: colors.text,
  },
  dateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    color: colors.text,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  submitText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholderText: {
    color: colors.text,
    fontSize: 18,
    marginBottom: 8,
  },
  placeholderSubtext: {
    color: colors.secondaryText,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AddExpenseScreen;