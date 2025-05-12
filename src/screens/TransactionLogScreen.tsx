import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { glassmorphism, colors } from '../styles/globalStyles';
import AnimatedView from '../components/AnimatedView';
import { SlideInRight } from 'react-native-reanimated';

const TransactionLogScreen = () => {
  const { data } = useExpense();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={data.expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <AnimatedView 
            style={[styles.transactionItem, glassmorphism.container]}
            entering={SlideInRight.delay(index * 50).duration(300)}
          >
            <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
            <View style={styles.details}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </AnimatedView>
        )}
      />
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
    marginBottom: 20,
    color: colors.text,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  details: {
    alignItems: 'flex-end',
  },
  category: {
    fontSize: 16,
    color: colors.text,
  },
  date: {
    fontSize: 14,
    color: colors.secondaryText,
  },
});

export default TransactionLogScreen;