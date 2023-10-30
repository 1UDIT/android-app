import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppButton from "../Components/AppButton";
import Icon from "../Components/Icon";

const ListingDetails = ({ route }) => {

  const onShare = async (title) => {
    Linking.openURL(`whatsapp://send?text=Check Out News About:\n${title} https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en', 
    url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en`)
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={{ uri: route.params.profile_img }} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{route.params.title}</Text>
          <Text style={styles.subtitle}>{route.params.description}</Text>
          <View style={styles.shareContainer}>
            <View style={styles.iconContainer}>
              <Icon
                onPress={() => onShare(route.params.title)}
                name={"whatsapp"}
                size={40}
                backgroundColor="#00cc00"
              />
              <Text style={styles.logoText}>Whats App</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon
                onPress={() => Linking.openURL(`sms:?body=${route.params.url}`)}
                name={"message"}
                size={40}
                backgroundColor="gold"
              />
              <Text style={styles.logoText}>Message</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon
                onPress={() =>
                  Linking.openURL(`mailto:?&body=${route.params.url}`)
                }
                name={"email"}
                size={40}
                backgroundColor="#3399ff"
              />
              <Text style={styles.logoText}>Email</Text>
            </View>
          </View>
          <AppButton
            onPress={() => Linking.openURL(route.params.url)}
            title={"Click here to read full news"}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  container: {
    flex: 1,
    paddingBottom: 50,
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