import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "../../Components/Icon";
import Icons from 'react-native-vector-icons/Ionicons';
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



const ListingDetails = ({ route, navigation }) => {
  const theme = useTheme();

  const onShare = async (title) => {
    Linking.openURL(`whatsapp://send?text=Check Out News About:\n${title} https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en', 
    url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en`)
  }; 
  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView style={[styles.containerBox, { backgroundColor: theme.background }]}>
          <Image style={[styles.image, { backgroundColor: theme.background }]} source={{ uri: route.params.profile_img }} />
          <View style={styles.detailsContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{route.params.title}</Text>
            <Text style={[styles.subtitle, { color: theme.colors.text }]}>{route.params.description}</Text>
            <View style={styles.shareContainer}>
              <View style={styles.iconContainer}>
                <Icon
                  onPress={() => onShare(route.params.title)}
                  name={"whatsapp"}
                  size={40}
                  backgroundColor="#00cc00"
                />
                <Text style={[styles.logoText, { color: theme.colors.text }]}>Share News Whats-App</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={[styles.btn]} onPress={() => navigation.navigate('Home')}>
          <View style={styles.searchIcon}>
            <Icons name="arrow-back" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  containerBox: {
    flex: 1,
    paddingBottom: 5,
  },
  btn: {
    height: 50,
    backgroundColor: "red", 
  },
  image: {
    backgroundColor: "#121211",
    width: width,
    justifyContent: 'flex-start',
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  searchIcon: {
    width: width, 
    alignItems: "center",
    justifyContent: "center", 
    flex: 1, 
  },
  detailsContainer: { padding: 20 },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: "#FF595A",
    fontWeight: "bold",
  },
  shareContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 17,
  },
  logoText: {
    marginVertical: 5,
    fontSize: 10,
  },
});
export default ListingDetails;