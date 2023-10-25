import * as React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import Home from './Pages/Home';
import ListingDetails from './Pages/NewsInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';


const myIcon = <Icon name="rocket" size={30} color="#900" />;
console.log(Stack, "st")

function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "#f5610a",
        tabBarInactiveTintColor: "#555",
        tabBarLabelStyle: {
          fontSize: 10,
        },
      })}
    >
      <Tab.Screen
        options={{
          title: "News Feed",
        }}
        name="feed"
        component={MyStack}
      />
      <Tab.Screen name="Schedule" component={MyStack} />
      <Tab.Screen name="Recommendation" component={MyStack} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{ presentation: "modal" }}
        name="Info"
        component={ListingDetails}
      />
    </Stack.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <Icon name='list' onPress={navigation.toggleDrawer} size={25} />,
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 240,
        },
        headerTitle: () => <Text>TESTING APP</Text>,
      })}
    >
      <Drawer.Screen name="Feed" component={HomeScreen} />
      <Drawer.Screen name="Article" component={MyStack} />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
