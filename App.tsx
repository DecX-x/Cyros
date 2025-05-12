import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.background : '#f8f9fa' }]} edges={['top']}>
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
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                height: 60,
                paddingBottom: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginHorizontal: 10,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 10,
              },
              tabBarItemStyle: {
                height: 60,
                paddingVertical: 5,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                marginBottom: 5,
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
      </SafeAreaView>
    </ExpenseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
