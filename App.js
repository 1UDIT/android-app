import * as React from 'react';
import { useEffect, useState } from "react";
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Screens/Home';
import ListingDetails from './Screens/NewsInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import SearchBar from './Components/SearchBar';
import Scheduler from './Screens/Schedule';
import RecommendationList from './Screens/Recommendation';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height  

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "#f5610a",
        tabBarInactiveTintColor: "#555",
        activeTabStyle: {
          fontWeight: 'bold',
        },
        tabBarLabelStyle: {
          fontSize: 11,
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
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Recommendation" component={RecommendationScreen} />
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

function Schedule() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Scheduler} />
    </Stack.Navigator>
  );
}
function RecommendationScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={RecommendationList} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [searchPhrase, setSearchPhrase] = useState("");
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          headerLeft: () => <Icon name='list-sharp' onPress={navigation.toggleDrawer} size={30} />,
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
          },
          headerStyle: {
            height: 110,
            backgroundColor: 'white'
          },  
          headerTitle: () =>
          (
            <View style={styles.container}>
              <View style={styles.detailsConatiner}>
                <Text style={styles.titleText}>TESTING APP</Text>
              </View>
              <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} style={styles.detailsSearchBar} />
            </View>
          )
        })}
        initialRouteName="Feed"
      >
        <Drawer.Screen name="Feed" component={HomeScreen} />
        {/* <Drawer.Screen name="Article" component={MyStack} /> */}
      </Drawer.Navigator >
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    width: width / 1.2,
    marginTop: 20
  },
  detailsConatiner: {
    width: width / 1.5,
    marginBottom: 20,
    alignItems: "center",
    fontWeight: 'bold',
    color: "red", 
  },
  detailsSearchBar: {
    width: width / 1.5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "red", 
  },

});

