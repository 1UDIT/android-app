import * as React from 'react';
import { useState, useEffect } from "react";
import { CommonActions, DrawerActions, NavigationContainer, useLinkBuilder, useTheme } from '@react-navigation/native';
import { get, save, saveString } from './storage';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appearance, Dimensions, Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import SearchBar from './Components/SearchBar';
import ScreenIndex from './Screens/MovieScreen/ScreenIndex';
import { light, dark } from './colors';
import HomeScreen from './Navigation/TopNavigation';
import ListingDetails from './Screens/InfoCards/NewsInfo';
import AnimeList from './Screens/InfoCards/AnimeList';
import RecommdatScreen from './Screens/Recommendation/RecommdatScreen';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height  

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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

function DarkToggle(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { setTheme, theme } = React.useContext(ThemeContext);
  const colorScheme = Appearance.getColorScheme();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const toggleSwitch = () => setIsEnabled(() => setTheme(theme === 'Light' ? 'Dark' : 'Light'));
  useEffect(() => {
    if (isEnabled === false) {
      setTheme('Light');
      save('Mode', false);
    } else {
      setTheme('Dark');
      save('Mode', true);
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


function HomeView() { 
  const theme = useTheme(); 
  return (

    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerActiveTintColor: theme.colors.Activetext, 
        // headerRight: (props) => (
        //   <View style={styles.IconBtncontainer}>
        //     {
        //       showSearchBar === false ? <Icon name='search' onPress={() => setShowSearchBar(!showSearchBar)} size={30} />
        //         :
        //         <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} style={styles.detailsSearchBar} setShowSearchBar={setShowSearchBar}
        //           showSearchBar={showSearchBar} />
        //     }
        //   </View>
        // ),
        // headerLeft: (props) => (
        //   <Pressable android_ripple={{ color: '#666666', foreground: true, borderless: true, }} onPress={() => { navigation.openDrawer() }}>
        //     <View style={styles.detailsConatiner}>
        //       <Icon name='list-sharp' onPress={navigation.toggleDrawer} size={30} />
        //     </View>
        //   </Pressable>
        // ),
        drawerStyle: {
          backgroundColor:theme.colors.headerStyle ,
          width: 240,
        },
        headerStyle: {
          height: 90,
          backgroundColor: theme.colors.headerStyle 
        },
      })}
      initialRouteName="Feed"
      drawerContent={(props) => <DarkToggle {...props} />}
    >
      <Drawer.Screen name="Feed" component={HomeScreen} />
      <Drawer.Screen name="Movie" component={MovieScreen} />
      <Drawer.Screen name="Settings" component={DarkToggle} options={{ drawerLabel: () => null, }} />
    </Drawer.Navigator >
  );
}

export default function App() {
  const [theme, setTheme] = useState('Light');

  const themeData = { theme, setTheme };
  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={theme === 'Light' ? light : dark}>
        <Stack.Navigator
          initialRouteName="Home"
        >
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeView} />
          <Stack.Screen name="Info" component={ListingDetails} />
          <Stack.Screen name="Listing" component={ListingDetails} />
          <Stack.Screen name="List" component={AnimeList} />
          <Stack.Screen name="RecommdatScreen" component={RecommdatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
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

