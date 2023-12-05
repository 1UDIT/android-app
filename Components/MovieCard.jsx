import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Replace with the appropriate icon library 
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const MovieCard = ({ genre, iconName, navigation }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RecommendationDetails", genre)}>
      <Icon name={iconName} size={30} color="black" />
      <Text style={styles.genreText}>{genre}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row', // Align icon and text horizontally 
    width: width / 2.3,
    height: 120
  },
  genreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10, // Add some spacing between icon and text
  },
});

export default MovieCard;
