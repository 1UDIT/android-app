import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, Text, ToastAndroid, View } from "react-native";
import Card from "./Cards/card";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from "@react-navigation/native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



const Home = ({ navigation }) => {
    const [data, Setdata] = useState([]);
    const [isOnline, setIsOnline] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [isOffline, setisOffline] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const theme = useTheme();
    const { type, isConnected } = useNetInfo();

    const getResult = async () => {
        // Check internet connection
        // You can use NetInfo here, as shown in the previous response. 

        // If there's internet connectivity, fetch and store new API data
        axios.get(`https://app-api-u735.onrender.com/News`,
            {
                auth: {
                    username: 'AnimeGo',
                    password: 'AnimeRock'
                },
                headers: {
                    'content-type': 'application/json',
                },
            })
            .then(response => {
                setisLoading(false);
                Setdata(response.data);
                AsyncStorage.setItem('News', JSON.stringify(response.data));
            }).catch(error => {
                console.log(error);
            });
    }
    const onRefresh = async () => {
       
        if (data?.length > 2) {
            setRefreshing(true)
            axios.get(`https://app-api-u735.onrender.com/News`,
                {
                    auth: {
                        username: 'AnimeGo',
                        password: 'AnimeRock'
                    },
                    headers: {
                        'content-type': 'application/json',
                    },
                })
                .then(response => {
                    setisLoading(false);
                    setRefreshing(false)
                    Setdata(response.data);
                    AsyncStorage.setItem('News', JSON.stringify(response.data));
                    ToastAndroid.show('Data Update', ToastAndroid.SHORT);
                }).catch(error => {
                    console.log(error);
                });
        }
        else {
            ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
            setRefreshing(false)
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('News');
            if (value !== null) {
                Setdata(JSON.parse(value));
                setisLoading(false);
                setisOffline('Offline Services')
            }
        } catch (e) {
            console.error('Error retrieving data:', error)
        }
    };
 


    useEffect(() => {
        // Check internet connection
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected);
        });
        // Cleanup
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => { 
        // Simulate fetching data from API
        if (isConnected === true) {
            getResult();
        } else if (isConnected === false) {
            ToastAndroid.show('Offline Data Fetch', ToastAndroid.SHORT);
            getData();
        }
    }, [isOnline]); 

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}><Text>{isOnline === true ? 'online' : isOffline}</Text>
            {
                isLoading === true ? <ActivityIndicator style={[styles.Indicatorcontainer, styles.horizontal]} size="large" color="#f5610a" /> :
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        data={data}
                        renderItem={({ item }) => (
                            <Card
                                title={item.title}
                                subtitle={item.description}
                                image={item.profile_img}
                                onPress={() => navigation.navigate("Info", item)}
                            />
                        )}
                    />
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: "#f7f5f5",
        padding: 10,
        height: height,
        width: width
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        color: "#fc5c65",
        marginBottom: 15,
        fontWeight: "bold",
    },
    Indicatorcontainer: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});
export default Home;