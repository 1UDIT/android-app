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

const Card = ({ title, date, image, onPress }) => {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
        <View style={styles.detailsConatiner}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.dateTitle}>{date}</Text>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    padding: 15,
    alignItems: 'center',
    width: width / 2.3,
    height: 330
  },
  image: {
    backgroundColor: "#121211",
    width: width / 2.3,
    justifyContent: 'flex-start',
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  detailsConatiner: {
    width: "100%",
    height: 140,
    padding: 10
  },
  subtitle: {
    fontSize: 13,
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    color: "#FF595A",
    marginBottom: 7,
    fontWeight: "bold",
  },
  dateTitle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontWeight: "bold",
  },
});
export default Card;