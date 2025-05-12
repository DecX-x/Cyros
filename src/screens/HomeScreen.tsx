import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AnimatedView from '../components/AnimatedView';
import React from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { glassmorphism, colors } from '../styles/globalStyles';

const HomeScreen = () => {
  const { data } = useExpense();
  
  // Calculate monthly spending
  const currentMonth = new Date().getMonth();
  const monthlySpending = data.expenses
    .filter(exp => new Date(exp.date).getMonth() === currentMonth)
    .reduce((sum, exp) => sum + exp.amount, 0);

  // Calculate spending by category
  const spendingByCategory = data.categories.map(cat => ({
    name: cat,
    amount: data.expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0)
  })).filter(cat => cat.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return (
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
            <Text style={styles.statValue}>${data.monthlyBudget.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Budget</Text>
          </View>
        </View>
      </AnimatedView>

      <AnimatedView style={[glassmorphism.container, styles.categoriesContainer]}>
        <Text style={styles.sectionTitle}>Top Categories</Text>
        {spendingByCategory.slice(0, 3).map((cat, index) => (
          <View key={index} style={styles.categoryItem}>
            <Text style={styles.categoryName}>{cat.name}</Text>
            <Text style={styles.categoryAmount}>${cat.amount.toFixed(2)}</Text>
          </View>
        ))}
      </AnimatedView>
    </ScrollView>
  );
};

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
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryName: {
    fontSize: 16,
    color: colors.text,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});

export default HomeScreen;