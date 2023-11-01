import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MovieCard from '../Components/MovieCard';

const genres = [
    { id:'1',genre: 'Action', iconName: 'rocket', },
    { id:'2',genre: 'Comedy', iconName: 'emoticon-happy' },
    { id:'3',genre: 'Drama', iconName: 'drama-masks' },
    { id:'4',genre: 'Romance', iconName: 'cards-heart' },
    // Add more genres and corresponding icons
];

const RecommendationList = () => {
    return (
        <View style={styles.container}>
            {genres.length == 2 ?
                <FlatList
                    data={genres}
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                    renderItem={({ item }) => <MovieCard genre={item.genre} iconName={item.iconName} />}
                />
                :
                <FlatList
                    data={genres}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    horizontal={false}
                    renderItem={({ item }) => <MovieCard genre={item.genre} iconName={item.iconName} />}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
});

export default RecommendationList;
