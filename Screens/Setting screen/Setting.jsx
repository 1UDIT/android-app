import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";  

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



const Setting = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <Text>dark mode</Text> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: "#f7f5f5",
        padding: 10,
        height: height,
        width: width
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        color: "#fc5c65",
        marginBottom: 15,
        fontWeight: "bold",
    },
    Indicatorcontainer: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});
export default Setting;