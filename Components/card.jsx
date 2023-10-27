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

const Card = ({ title, subtitle, image, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
        <View style={styles.detailsConatiner}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 20,     
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsConatiner: {
    padding: 20,
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
export default Card;