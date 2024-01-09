import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const MovieList = ({ title, subtitle, image, onPress }) => {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, styles.cardShadow]}>
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
        <View style={styles.detailsConatiner}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  cardShadow: {
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    overflow: "hidden", 
    borderColor: 'white',
    borderWidth: 5, 
  },
  image: {
    backgroundColor: "black",  
    height: undefined,
    resizeMode: 'cover',
    aspectRatio: 1,
  },
  detailsConatiner: {
    width: "100%",
    padding: 10
  },
  subtitle: {
    fontSize: 15,
    marginTop: 2,
    color: "white",
  },
  title: {
    fontSize: 18,
    color: "#FF595A",
    marginBottom: 7,
    fontWeight: "bold",
  },
});
export default MovieList;