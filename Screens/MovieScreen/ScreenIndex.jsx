import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useTheme } from '@react-navigation/native';
import MovieList from '../Cards/MovieList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const TinderSwipe = () => {
    const [data, Setdata] = useState([]);
    const [isOnline, setIsOnline] = useState(true);
    const [isLoading, setisLoading] = useState(true);
    const [dataIsReturned, setDataIsReturned] = useState(false)
    const [cardIndex, setCardIndex] = useState(0);
    const theme = useTheme();
    const swiperRef = useRef(null);

    const getResult = async () => {
        // Check internet connection
        // You can use NetInfo here, as shown in the previous response. 

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
    }, [isOnline]);

    useEffect(() => {
        if (data !== undefined && data.length > 0) { 
            setDataIsReturned(true)
        } else {
            setDataIsReturned(false)
        }
    }, [isOnline, data])

    const renderCard = (card) => {
        console.log(card,"card")
        return (
          <View style={styles.card} key={card._id}>
            <Text style={styles.cardText}>{card.title}</Text>
          </View>
        );
      };

    if (dataIsReturned === true && data !== undefined) {
        return (
            <View style={styles.container}>
                <Swiper
                    ref={swiperRef}
                    cards={[...data]}
                    renderCard={renderCard}
                    onSwiped={(cardIndex) => console.log('onSwiped', cardIndex)}
                    onSwipedAll={() =>getResult()}
                    cardIndex={cardIndex}
                    backgroundColor={'#4FD0E9'}
                    stackSize={2}
                    cardVerticalMargin={50}
                    showSecondCard={true}
                    animateOverlayLabelsOpacity
                    animateCardOpacity>
                </Swiper>

            </View>)
    } else {
        return (<Text>Loading</Text>)
    }


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
