import * as React from 'react';
import { useEffect, useState } from "react";
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import Home from './Pages/Home';
import ListingDetails from './Pages/NewsInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import SearchBar from './Components/SearchBar';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



const myIcon = <Icon name="rocket" size={30} color="#900" />;

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

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       screenOptions={({ navigation }) => ({
//         headerLeft: () => <Icon name='list' onPress={navigation.toggleDrawer} size={25} />,
//         drawerStyle: {
//           backgroundColor: '#c6cbef',
//           width: 240,
//         },
//         headerTitle: () => <Text>TESTING APP</Text>,
//       })}
//       initialRouteName="Feed"
//     >
//       <Drawer.Screen name="Feed" component={HomeScreen} />
//       <Drawer.Screen name="Article" component={MyStack} />
//     </Drawer.Navigator>
//   );
// }


export default function App() {
  const [searchPhrase, setSearchPhrase] = useState("");
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          headerLeft: () => <Icon name='list' onPress={navigation.toggleDrawer} size={25} />,
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
          },
          headerStyle: {
            height: 110
          },
          headerTitle: () =>
          (
            <View style={styles.container}>
              <View style={styles.detailsConatiner}>
                <Text>TESTING APP</Text>
              </View>
              <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} style={styles.detailsConatiner}/>
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
    width: width/1.2,
  },
  detailsConatiner: {
    width: width/1.5,
  },

});