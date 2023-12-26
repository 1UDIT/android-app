import { useTheme } from "@react-navigation/native";
import Home from "../Screens/Home"; 
import NextSeason from "../Screens/Scheduler List/NextSeason";
import PresentSeason from "../Screens/Scheduler List/PresentSeason";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import RecommendationIndex from "../Screens/Recommendation/Index";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const bottomTab = createBottomTabNavigator();

export default function HomeScreen(){
    const theme = useTheme();
    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarActiveTintColor: theme.colors.Activetext,
                tabBarInactiveTintColor: theme.colors.InActivetext,
                activeTabStyle: {
                    fontWeight: 'bold',
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                },
                tabBarStyle: { backgroundColor: theme.colors.headerStyle },
            })}
        >
            <Tab.Screen name="News feed" component={Home} />
            <Tab.Screen name="Seasonal" component={BottomNavigation} />
            <Tab.Screen name="Recommendation" component={RecommendationScreen} />
        </Tab.Navigator>
    );
} 

function PresentList() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={PresentSeason} />

        </Stack.Navigator>
    );
}

function NewList() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={NextSeason} /> 
        </Stack.Navigator>
    );
}

function BottomNavigation() {
    const theme = useTheme();
    return (
        <bottomTab.Navigator
            initialRouteName="This Season"
            screenOptions={() => ({
                tabBarActiveTintColor: theme.colors.Activetext,
                tabBarInactiveTintColor: theme.colors.InActivetext,
                activeTabStyle: {
                    fontWeight: 'bold',
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                },
                headerShown: false,
                tabBarStyle: { backgroundColor: theme.colors.headerStyle, height: 65 },
            })}
        >
            <bottomTab.Screen
                name="This Season"
                component={PresentList}
                options={{
                    tabBarLabel: 'This Season',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcon name='calendar-blank-outline' color={color} size={size} />
                    ),
                }} />
            <bottomTab.Screen
                name="Next"
                component={NewList}
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
            <Stack.Screen name="Home" component={RecommendationIndex} />
        </Stack.Navigator>
    );
}