import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useTheme } from '@react-navigation/native';
import MovieList from '../Cards/MovieList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';   


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



const Home = ({ navigation }) => {
    const [data, Setdata] = useState();
    const [isOnline, setIsOnline] = useState(true);
    const [isLoading, setisLoading] = useState(true);

    const getResult = async () => {

        if (isOnline) {
            // If there's internet connectivity, fetch and store new API data
            axios.get(`https://shiny-colt-overalls.cyclic.app/Scheduler`,
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
                    setCardIndex(0);
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
    }, [isOnline, cardIndex]);


    return (
        <View style={styles.container}> 
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
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});
export default TinderSwipe;
