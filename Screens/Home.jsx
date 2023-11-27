import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import Card from "./Cards/card";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useTheme } from "@react-navigation/native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



const Home = ({ navigation }) => {
    const [data, Setdata] = useState();
    const [isOnline, setIsOnline] = useState(true);
    const [isLoading, setisLoading] = useState(true);
    const theme = useTheme();

    const getResult = async () => {
        // Check internet connection
        // You can use NetInfo here, as shown in the previous response. 

        if (isOnline) {
            // If there's internet connectivity, fetch and store new API data
            axios.get(`https://app-api-u735.onrender.com/Scheduler`,
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
                    AsyncStorage.setItem('apiData', JSON.stringify(response.data));
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

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('apiData');
            if (value !== null) {
                Setdata(value);
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

        // Simulate fetching data from API
        if (isOnline) {
            getResult();
        }

        if (isLoading === true) {
            getData();
        }

        // Cleanup
        return () => {
            unsubscribe();
        };
    }, [isOnline]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {
                isLoading === true ? <ActivityIndicator style={[styles.Indicatorcontainer, styles.horizontal]} size="large" color="#f5610a" /> :
                    <FlatList
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