import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ChatScreen from '../screens/ChatScreen';
import WikiScreen from '../screens/WikiScreen';
import ClipScreen from '../screens/ClipScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function WikiStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wiki"
        component={WikiScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ClipStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Clip"
        component={ClipScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const screenOprion = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === 'Chat') {
      iconName = 'wechat';
    } else if (route.name === 'Wiki') {
      iconName = 'wikipedia-w';
    } else if (route.name === 'Clip') {
      iconName = 'bookmark';
    } else if (route.name === 'Home') {
      iconName = 'home';
    }
    return <FontAwesome name={iconName} size={size} color={color} />;
  },
});

function App() {
  return (
    <Tab.Navigator screenOptions={screenOprion}>
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{ headerLeft: false }}
      />
      <Tab.Screen
        name="Wiki"
        component={WikiStack}
        options={{ headerLeft: false }}
      />
      <Tab.Screen
        name="Clip"
        component={ClipStack}
        options={{ headerLeft: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerLeft: false }}
      />
    </Tab.Navigator>
  );
}

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerLeft: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerLeft: false }}
        />
        <Stack.Screen
          name="App"
          component={App}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
