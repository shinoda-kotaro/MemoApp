import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ChatScreen from '../screens/ChatScreen';
import WikiScreen from '../screens/WikiScreen';
import ClipScreen from '../screens/ClipScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateChatScreen from '../screens/CreateChatScreen';
import SortScreen from '../screens/SortScreen';
import GroupScreen from '../screens/GroupScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ChatStack({ route }) {
  const db = route.params.db;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
        initialParams={{ db: db }}
      />
      <Stack.Screen
        name="CreateChat"
        component={CreateChatScreen}
        options={{
          headerLeft: false,
          gestureEnabled: false,
          title: '新規チャット',
        }}
        initialParams={{ db: db }}
      />
      <Stack.Screen
        name="Group"
        component={GroupScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
        initialParams={{ db: db }}
      />
      <Stack.Screen
        name="Sort"
        component={SortScreen}
        options={({ route }) => ({
          headerLeft: false,
          title: route.params.title,
        })}
        initialParams={{ db: db }}
      />
    </Stack.Navigator>
  );
}

function WikiStack({ route }) {
  const db = route.params.db;
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

function ClipStack({ route }) {
  const db = route.params.db;
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

function HomeStack({ route }) {
  const db = route.params.db;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ db: db }}
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

function App({ route }) {
  const db = route.params.db;
  return (
    <Tab.Navigator
      screenOptions={screenOprion}
      tabBarOptions={{ activeTintColor: '#b3424a' }}
    >
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{ headerLeft: false }}
        initialParams={{ db: db }}
      />
      <Tab.Screen
        name="Wiki"
        component={WikiStack}
        options={{ headerLeft: false }}
        initialParams={{ db: db }}
      />
      <Tab.Screen
        name="Clip"
        component={ClipStack}
        options={{ headerLeft: false }}
        initialParams={{ db: db }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerLeft: false }}
        initialParams={{ db: db }}
      />
    </Tab.Navigator>
  );
}

function Navigator({ db }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerLeft: false }}
          initialParams={{ db: db }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerLeft: false }}
        />
        <Stack.Screen
          name="App"
          component={App}
          options={{ headerShown: false, gestureEnabled: false }}
          initialParams={{ db: db }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
