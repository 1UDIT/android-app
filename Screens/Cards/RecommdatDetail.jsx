import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const data = [
    {
        id: '1',
        title: 'Movie 1',
        posterUri: 'https://example.com/movie1.jpg',
        description: 'Description for Movie 1',
    },
    {
        id: '2',
        title: 'Movie 2',
        posterUri: 'https://example.com/movie2.jpg',
        description: 'Description for Movie 2',
    },
    // Add more movie data objects here
];

const MovieCard = ({ title, posterUri, description }) => (
    <View style={styles.cardContainer}>
        <Image source={{ uri: posterUri }} style={styles.poster} />
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    </View>
);

const RecommdatDetail = () => (
    <View style={styles.container}>
        {data.length == 2 ?
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                numColumns={1}
                horizontal={false} 
                renderItem={({ item }) => (
                    <MovieCard
                        title={item.title}
                        posterUri={item.posterUri}
                        description={item.description}
                    />
                )}
            />
            :
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                numColumns={2}
                horizontal={false} 
                renderItem={({ item }) => (
                    <MovieCard
                        title={item.title}
                        posterUri={item.posterUri}
                        description={item.description}
                    />
                )}
            />
        }
    </View>
);

const styles = StyleSheet.create({
    container: { 
        flex:1,
        backgroundColor: 'lightgray',
        flexDirection:"row",
    },
    cardContainer: {
        flex:2,
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 10,
        padding: 20,
        alignItems: 'center', 
    },
    poster: {
        width: 200,
        height: 250,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textContainer: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
    },
});

export default RecommdatDetail;
