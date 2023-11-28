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

const MovieList = ({ title, subtitle, image, onPress }) => {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
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
  container: {
    backgroundColor: "black",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 20,
    marginTop: 50, 
    borderColor: 'white',
    borderWidth: 5,
    marginBottom: 30,
  },
  image: {
    backgroundColor: "#121211",
    width: width,
    justifyContent: 'flex-start',
    height: undefined,
    resizeMode:'contain',
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