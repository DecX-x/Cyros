import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import TransactionLogScreen from './src/screens/TransactionLogScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { colors, neon } from './src/styles/globalStyles';
import { ExpenseProvider } from './src/contexts/ExpenseContext';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const Tab = createBottomTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <ExpenseProvider>
      <View style={[styles.container, { backgroundColor: isDarkMode ? colors.background : '#f8f9fa' }]}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: IconName = 'home-outline';

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Chat') {
                  iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                } else if (route.name === 'Add') {
                  iconName = focused ? 'add-circle' : 'add-circle-outline';
                } else if (route.name === 'Transactions') {
                  iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: colors.accent,
              tabBarInactiveTintColor: isDarkMode ? colors.secondaryText : '#6c757d',
              tabBarStyle: {
                backgroundColor: isDarkMode ? colors.background : '#ffffff',
                borderTopWidth: 0,
              },
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Add" component={AddExpenseScreen} />
            <Tab.Screen name="Transactions" component={TransactionLogScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </ExpenseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
