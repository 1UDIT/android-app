import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MovieCard from '../Components/MovieCard';
import { useTheme } from '@react-navigation/native';

const genres = [
    { id: '1', genre: 'Action', iconName: 'rocket', },
    { id: '2', genre: 'Comedy', iconName: 'emoticon-happy' },
    { id: '3', genre: 'Drama', iconName: 'drama-masks' },
    { id: '4', genre: 'Romance', iconName: 'cards-heart' },
    // Add more genres and corresponding icons
];

const RecommendationList = ({ navigation }) => {
    const theme = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {genres.length == 2 ?
                <FlatList
                    data={genres}
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                    renderItem={({ item }) => <MovieCard genre={item.genre} iconName={item.iconName} navigation={navigation}/>}
                />
                :
                <FlatList
                    data={genres}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    horizontal={false}
                    renderItem={({ item }) => <MovieCard genre={item.genre} iconName={item.iconName} navigation={navigation}/>}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        flexDirection: 'row', // Align icon and text horizontally 
    },
});

export default RecommendationList;
