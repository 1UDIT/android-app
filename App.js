import * as React from 'react';
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Screens/Home';
import ListingDetails from './Screens/NewsInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import SearchBar from './Components/SearchBar';
import Scheduler from './Screens/Schedule';
import RecommendationList from './Screens/Recommendation';
import RecommdatDetail from './Screens/Cards/RecommdatDetail';
import ScreenIndex from './Screens/MovieScreen/ScreenIndex';
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
        name="News feed"
        component={HomeView}
      />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Recommendation" component={RecommendationScreen} />
    </Tab.Navigator>
  );
}

function HomeView() {
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

function MovieScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={ScreenIndex} />
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
      <Stack.Screen
        options={{ presentation: "modal" }}
        name="RecommendationDetails"
        component={RecommdatDetail}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({ 
          headerRight: (props) => (
            <View style={styles.IconBtncontainer}>
              {
                showSearchBar === false? <Icon name='search' onPress={() => setShowSearchBar(!showSearchBar)} size={30} />
                :
                <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} style={styles.detailsSearchBar} setShowSearchBar={setShowSearchBar}
                showSearchBar={showSearchBar}/>
              }
             
              {/* {showSearchBar && } */}
            </View>
            // <View style={styles.iconContainer}>
            //   <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} style={styles.detailsSearchBar} />
            // </View>
          ),

          headerLeft: (props) => (
            <Pressable
              android_ripple={{
                color: '#666666',
                foreground: true,
                borderless: true,
              }}
              onPress={() => { navigation.openDrawer() }}>
              <View style={styles.detailsConatiner}>
                <Icon name='list-sharp' onPress={navigation.toggleDrawer} size={30} />
              </View>
            </Pressable>
          ),
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
          },
          headerStyle: {
            height: 90,
            backgroundColor: 'white'
          },

        })}
        initialRouteName="Feed"
      >
        <Drawer.Screen name="Feed" component={HomeScreen} />
        <Drawer.Screen name="Movie" component={MovieScreen} />
      </Drawer.Navigator >
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    width: width / 1.2,
    marginTop: 20
  },
  IconBtncontainer: { 
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  detailsConatiner: {
    alignItems: "center",
    fontWeight: 'bold',
    color: "red",
  },
  detailsSearchBar: {
    width: width,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "red",
  },

});

