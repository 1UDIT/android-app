import * as React from 'react';
import { useState, useCallback, useEffect } from "react";
import { CommonActions, DarkTheme, DefaultTheme, DrawerActions, NavigationContainer, useLinkBuilder } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Screens/Home';
import ListingDetails from './Screens/NewsInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appearance, Dimensions, Pressable, StyleSheet, Switch, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import SearchBar from './Components/SearchBar';
import RecommendationList from './Screens/Recommendation';
import RecommdatDetail from './Screens/Cards/RecommdatDetail';
import ScreenIndex from './Screens/MovieScreen/ScreenIndex';
import { get, save } from './storage';
import colors from './colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PresentSeason from './Screens/Scheduler List/PresentSeason';
import NextSeason from './Screens/Scheduler List/NextSeason';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height  

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const bottomTab = createBottomTabNavigator();

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
      <Tab.Screen name="Seasonal" component={Schedule} />
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

function SettingsScreen(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { setTheme, theme } = React.useContext(ThemeContext);
  const colorScheme = Appearance.getColorScheme();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const toggleSwitch = () => setIsEnabled(() => setTheme(theme === 'Light' ? 'Dark' : 'Light'));
  useEffect(() => {
    if (isEnabled === false) { 
      setTheme('Light');
    } else { 
      setTheme('Dark');
    }
  }, [isEnabled])


  const { state, descriptors, navigation } = props;
  const buildLink = useLinkBuilder();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route, i) => {
          const isHidden = descriptors[route.key].options?.hidden;
          if (isHidden === true) return null;
          const focused = i === state.index;
          const {
            title,
            drawerLabel,
            drawerIcon,
            drawerActiveTintColor,
            drawerInactiveTintColor,
            drawerActiveBackgroundColor,
            drawerInactiveBackgroundColor,
            drawerLabelStyle,
            drawerItemStyle,
          } = descriptors[route.key].options;
          return (
            <DrawerItem
              key={route.key}
              label={drawerLabel !== undefined ? drawerLabel : title !== undefined ? title : route.name}
              icon={drawerIcon}
              focused={focused}
              activeTintColor={drawerActiveTintColor}
              inactiveTintColor={drawerInactiveTintColor}
              activeBackgroundColor={drawerActiveBackgroundColor}
              inactiveBackgroundColor={drawerInactiveBackgroundColor}
              labelStyle={drawerLabelStyle}
              style={drawerItemStyle}
              to={buildLink(route.name, route.params)}
              onPress={() => {
                navigation.dispatch({
                  ...(focused
                    ? DrawerActions.closeDrawer()
                    : CommonActions.navigate(route.name)),
                  target: state.key,
                });
              }}
            />
          );
        })}
      </DrawerContentScrollView>
      <View style={styles.containerSwitch}>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.switchText}>Light </Text>
            <Switch
              trackColor={{ false: "light", true: "dark" }}
              thumbColor={isEnabled ? colorScheme == 'light' : colorScheme == 'dark'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text>Dark</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const ThemeContext = React.createContext();

function Schedule() {
  return (
    <bottomTab.Navigator
      initialRouteName="This Season"
      screenOptions={() => ({
        tabBarActiveTintColor: "#f5610a",
        tabBarInactiveTintColor: "#555",
        activeTabStyle: {
          fontWeight: 'bold',
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
        headerShown: false,
        tabBarStyle: { height: 65 },
      })}
    >
      <bottomTab.Screen
        name="This Season"
        component={PresentSeason}
        options={{
          tabBarLabel: 'This Season',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name='calendar-blank-outline' color={color} size={size} />
          ),
        }} />
      <bottomTab.Screen
        name="Next"
        component={NextSeason}
        options={{
          tabBarLabel: 'Next Season',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name='page-next' color={color} size={size} />
          ),
        }} />
    </bottomTab.Navigator>
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
  const [theme, setTheme] = useState('Light');

  const themeData = { theme, setTheme };
  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={theme == 'Light' ? DefaultTheme : DarkTheme}>
        <Drawer.Navigator
          screenOptions={({ navigation }) => ({
            headerRight: (props) => (
              <View style={styles.IconBtncontainer}>
                {
                  showSearchBar === false ? <Icon name='search' onPress={() => setShowSearchBar(!showSearchBar)} size={30} />
                    :
                    <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} style={styles.detailsSearchBar} setShowSearchBar={setShowSearchBar}
                      showSearchBar={showSearchBar} />
                }
              </View>
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
          drawerContent={(props) => <SettingsScreen {...props} />}
        >
          <Drawer.Screen name="Feed" component={HomeScreen} />
          <Drawer.Screen name="Movie" component={MovieScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{
            drawerLabel: () => null,
          }} />
        </Drawer.Navigator >
      </NavigationContainer >
    </ThemeContext.Provider>
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
  containerSwitch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    flexDirection: "row",
  }

});

