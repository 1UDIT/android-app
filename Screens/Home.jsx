import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Dimensions, FlatList, RefreshControl, StyleSheet, Text, ToastAndroid, View, Animated, Platform } from "react-native";
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from "@react-navigation/native";
import Homecard from "./Cards/HomeCard";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });


const Home = ({ navigation }) => {
    const [data, Setdata] = useState([]);
    const [isOnline, setIsOnline] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [isOffline, setisOffline] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [visible, setVisible] = useState(false);
    const theme = useTheme();
    const { type, isConnected } = useNetInfo();

    const [scrollY] = useState(new Animated.Value(0));
    const diffClamp = Animated.diffClamp(scrollY, 0, 140); 



    const navigationTranslateY = diffClamp.interpolate({
        inputRange: [0, 60],
        outputRange: [0, -30],
        extrapolate: 'clamp',
    });




    const handleCancel = () => {
        setVisible(false);
    };


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
            setVisible(true)
            ToastAndroid.show('Offline Data Fetch', ToastAndroid.SHORT);
            getData();
        }
    }, [isOnline]);
    // { backgroundColor: theme.background }
    const onEndReached = () => {
        if (!isLoading) {
            getResult();
        }
    };
    return (<>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Animated.View style={[{ transform: [{ translateY: navigationTranslateY }] }]}>
                <Animated.Text style={[styles.navigationText]}>Your Navigation Content</Animated.Text>
            </Animated.View>

            {
                isLoading === true ? <ActivityIndicator style={[styles.Indicatorcontainer, styles.horizontal]} size="large" color="#f5610a" /> :
                    < FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        data={data}
                        onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => (
                            <Homecard
                                title={item.title}
                                subtitle={item.description}
                                image={item.profile_img}
                                onPress={() => navigation.navigate("Info", item)}
                            />
                        )}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.5}
                    />
            }
        </View>
        <Dialog.Container visible={visible}>
            <Dialog.Title>Data</Dialog.Title>
            <Dialog.Description>
                You Are Offline...
            </Dialog.Description>
            <Dialog.Button label="Ok" onPress={handleCancel} />
        </Dialog.Container>
    </>
    );
};

const styles = StyleSheet.create({
    navigation: {
        height: 80,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 2,
    },
    navigationText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        paddingTop: 5,
        flex: 1,
        backgroundColor: "#faf1e5",
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