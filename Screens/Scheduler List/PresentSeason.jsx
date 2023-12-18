import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, ToastAndroid, View } from "react-native";
import Card from "../Cards/card";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from "@react-navigation/native";
import SchedulerHeader from "../../Components/SchedulerHeader";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



const PresentSeason = ({ navigation }) => {
    const [day, setday] = useState([
        { label: 'All', value: '8' },
        { label: 'Monday', value: '1' },
        { label: 'Tuesday', value: '2' },
        { label: 'Wednesday', value: '3' },
        { label: 'Thursday', value: '4' },
        { label: 'Friday', value: '5' },
        { label: 'Saturday', value: '6' },
        { label: 'Sunday', value: '7' },
    ]);
    const theme = useTheme();
    const [data, Setdata] = useState();
    const [isOnline, setIsOnline] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [value, setValue] = useState('All');
    const { type, isConnected } = useNetInfo();
    const [refreshing, setRefreshing] = useState(false);

    const getResult = async () => {
        // Check internet connection
        // You can use NetInfo here, as shown in the previous response. 

        if (isOnline) {
            // If there's internet connectivity, fetch and store new API data
            axios.get(`https://app-api-u735.onrender.com/Scheduler/data?SeasonType=Prev`,
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
                    AsyncStorage.setItem('Prev', JSON.stringify(response.data));
                }).catch(error => {
                    console.log(error);
                });
        } else {
            // If there's no internet, try to retrieve old data from AsyncStorage 
            try {
                const value = await AsyncStorage.getItem('apiData');
                if (value !== null) {
                    //    console.log(value,"AsyncStorage");                
                    Setdata(value);
                }
            } catch (e) {
                console.error('Error retrieving data:', error)
            }
        }
    }

    const onRefresh = async () => {

        if (data?.length > 2) {
            setRefreshing(true)
            axios.get(`https://app-api-u735.onrender.com/Scheduler/data?SeasonType=Prev`,
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
            const value = await AsyncStorage.getItem('Prev');
            if (value !== null) {
                Setdata(JSON.parse(value));
                setisLoading(false);
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
            // console.log(JSON.parse(data));
            getData();
        }
    }, [isOnline]);

    return (
        <>
            {
                isLoading === true ? [] :
                    <FlatList
                        data={data?.slice(0, 1)}
                        maxToRenderPerBatch={1}
                        style={styles.flatList}
                        renderItem={({ item }) => (
                            <SchedulerHeader
                                Season={item.Season}
                                day={day}
                                setValue={setValue}
                                value={value}
                            />
                        )}
                    />
            }
            <View style={[styles.container, { backgroundColor: theme.background }]}>
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
                                    onPress={() => navigation.navigate("List", item)}
                                />
                            )}
                        />
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    flatList: {
        height: 'auto',
        flexGrow: 0
    },
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
});
export default PresentSeason;