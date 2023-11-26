import {useTheme } from "@react-navigation/native";
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

const MovieList = ({swiperRef, data, item }) => {
  const theme = useTheme(); 
 console.log(item,"title, subtitle, image, onPress")
   
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 20,
    flexDirection: 'row',
  },
  image: {
    width: "50%",
    justifyContent: 'flex-start',
    height: 200,
  },
  detailsConatiner: {
    width: "50%",
    padding: 10
  },
  subtitle: {
    fontSize: 15,
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    color: "#FF595A",
    marginBottom: 7,
    fontWeight: "bold",
  },
});
export default MovieList;