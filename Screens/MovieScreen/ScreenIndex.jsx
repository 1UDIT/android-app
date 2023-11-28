import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useTheme } from '@react-navigation/native';
import MovieList from '../Cards/MovieList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const TinderSwipe = ({ navigation }) => {
    const [data, Setdata] = useState([]);
    const [isOnline, setIsOnline] = useState(true);
    const [isLoading, setisLoading] = useState(true);
    const [dataIsReturned, setDataIsReturned] = useState(false)
    const [cardIndex, setCardIndex] = useState(0);
    const theme = useTheme();
    const swiperRef = useRef(null);
    var cardStack = undefined; // Store off a reference of the swiper.

    const getResult = async () => {

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
    }, [isOnline, cardIndex]);

    useEffect(() => {
        if (data !== undefined && data.length > 0) {
            setDataIsReturned(true)
        } else {
            setDataIsReturned(false)
        }
    }, [data, cardIndex])

    // console.log(cardIndex, 'length', cardIndex === data.length);

    const getCardBack = (index) => {
        // Handle swipes, e.g., remove the card from the array
        if (data !== undefined) {
            setCardIndex(index + 1);
        };
    }
    const onSwipedAll = () => {
        Setdata(data); // Update with the new cards that we want, but it won't be rendered yet.
        setCardIndex(0); // Lie to the UI that we have nothing in our cards!
        cardStack.forceUpdate(() => {
            setCardIndex(data.length); // Now tell the truth, we have a new length of cards.
        });
    };

    if (dataIsReturned === true && data !== undefined) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <Swiper
                    ref={(ref) => { cardStack = ref; }}
                    cards={[...data]}
                    key={cardIndex}
                    renderCard={(item) => {
                        return (
                            <MovieList
                                title={item.title}
                                subtitle={item.description}
                                image={item.profile_img}
                                onPress={() => navigation.navigate("Info", item)}
                            />
                        )
                    }}
                    onSwiped={(cardIndex) => { getCardBack(cardIndex) }}
                    cardIndex={cardIndex}
                    onSwipedAll={onSwipedAll}
                    containerStyle={{ backgroundColor: '#141414' }}
                    stackSize={4}
                    showSecondCard={true}
                    cardStyle={{ height: 200 }}
                    cardVerticalMargin={5}
                    cardHorizontalMargin={5}
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
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});
export default TinderSwipe;
