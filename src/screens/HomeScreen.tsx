import { View, Text, StyleSheet, ScrollView, Dimensions, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import AnimatedView from '../components/AnimatedView';
import React, { useState } from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { glassmorphism, getColors } from '../styles/globalStyles';
import PieChart from '../components/PieChart';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { data, updateBudget } = useExpense();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { colors } = getColors(isDarkMode);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(data.monthlyBudget.toString());

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: colors.background,
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.secondaryText,
    },
    statsContainer: {
      marginBottom: 20,
    },
    chartContainer: {
      marginBottom: 20,
    },
    chartRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    categoryList: {
      flex: 1,
      paddingLeft: 20,
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    colorSwatch: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginRight: 8,
    },
    categoryText: {
      fontSize: 14,
    },
    trendsContainer: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 15,
    },
    statRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    trendsList: {
      width: '100%',
    },
    trendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    trendMonth: {
      width: 40,
      color: colors.text,
    },
    trendBarContainer: {
      flex: 1,
      height: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 10,
      marginHorizontal: 10,
      overflow: 'hidden',
    },
    trendBar: {
      height: '100%',
      borderRadius: 10,
    },
    trendAmount: {
      width: 70,
      textAlign: 'right',
      color: colors.text,
    },
    budgetRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editButton: {
      marginLeft: 8,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      borderRadius: 10,
      backgroundColor: colors.background,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: colors.accent,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      color: colors.text,
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      flex: 1,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: colors.danger,
    },
    saveButton: {
      backgroundColor: colors.success,
    },
    buttonText: {
      color: colors.text,
      fontWeight: 'bold',
    },
  });
  
  // Calculate monthly spending
  const currentMonth = new Date().getMonth();
  const monthlySpending = data.expenses
    .filter(exp => new Date(exp.date).getMonth() === currentMonth)
    .reduce((sum, exp) => sum + exp.amount, 0);

  // Calculate spending by category for pie chart
  const pieData = data.categories.map(cat => {
    const amount = data.expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return {
      value: amount,
      color: colors.accent,
      label: amount > 0 ? cat : ''
    };
  }).filter(item => item.value > 0);

  // Calculate monthly trend (last 6 months)
  const monthlyTrends = Array.from({ length: 6 }, (_, i) => {
    const month = new Date();
    month.setMonth(currentMonth - i);
    const monthName = month.toLocaleString('default', { month: 'short' });
    const total = data.expenses
      .filter(exp => new Date(exp.date).getMonth() === month.getMonth())
      .reduce((sum, exp) => sum + exp.amount, 0);
    return { month: monthName, amount: total };
  }).reverse();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
      <AnimatedView style={[glassmorphism.container, styles.header]}>
        <Text style={[styles.title, { color: colors.accent }]}>Cyros Expense Tracker</Text>
        <Text style={styles.subtitle}>Your financial overview</Text>
      </AnimatedView>

      <AnimatedView style={[glassmorphism.container, styles.statsContainer]}>
        <Text style={styles.sectionTitle}>Monthly Summary</Text>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${monthlySpending.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.budgetRow}>
              <Text style={styles.statValue}>${data.monthlyBudget.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditingBudget(true)}
              >
                <Ionicons name="pencil" size={16} color={colors.accent} />
              </TouchableOpacity>
            </View>
            <Text style={styles.statLabel}>Budget</Text>
          </View>
        </View>
      </AnimatedView>

      {pieData.length > 0 && (
        <AnimatedView style={[glassmorphism.container, styles.chartContainer]}>
          <Text style={styles.sectionTitle}>Spending by Category</Text>
          <PieChart data={pieData} size={width - 60} />
        </AnimatedView>
      )}

      <AnimatedView style={[glassmorphism.container, styles.trendsContainer]}>
        <Text style={styles.sectionTitle}>Monthly Trends</Text>
        <View style={styles.trendsList}>
          {monthlyTrends.map((trend, index) => (
            <View key={index} style={styles.trendItem}>
              <Text style={styles.trendMonth}>{trend.month}</Text>
              <View style={styles.trendBarContainer}>
                <View 
                  style={[
                    styles.trendBar,
                    { 
                      width: `${(trend.amount / data.monthlyBudget) * 100}%`,
                      backgroundColor: colors.accent
                    }
                  ]}
                />
              </View>
              <Text style={styles.trendAmount}>${trend.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </AnimatedView>
    </ScrollView>

    <Modal
      visible={isEditingBudget}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsEditingBudget(false)}
    >
      <View style={styles.modalOverlay}>
        <AnimatedView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Monthly Budget</Text>
          <TextInput
            style={styles.input}
            value={newBudget}
            onChangeText={setNewBudget}
            keyboardType="numeric"
            placeholder="Enter new budget"
            placeholderTextColor={colors.secondaryText}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setIsEditingBudget(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={() => {
                updateBudget(Number(newBudget));
                setIsEditingBudget(false);
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </AnimatedView>
      </View>
      </Modal>
    </View>
  );
};


export default HomeScreen;