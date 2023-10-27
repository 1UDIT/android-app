import axios from "axios";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import Card from "../Components/card";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



const Home = ({ navigation }) => {
    const [data, Setdata] = useState();
    const [refresh, onRefresh] = useState(false);

    const getResult = () => {
        axios.get(`https://app-api-u735.onrender.com/Scheduler`,
            {
                auth: {
                    username: 'AnimeGo',
                    password: 'AnimeRock'
                },
                headers: {
                    'content-type': 'application/json',
                },
            })
            .then(response => {
                Setdata(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getResult();
    }, []);

    return (
        <View style={styles.container}> 
            <FlatList 
                data={data}
                renderItem={({ item }) => (
                    <Card
                        title={item.title}
                        subtitle={item.description}
                        image={item.profile_img}
                        onPress={() => navigation.navigate("Info", item)}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: "#ffcccc",
        padding: 10,
        paddingBottom: 50,
        height: 100,
        width: width
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        color: "#fc5c65",
        marginBottom: 15,
        fontWeight: "bold",
    },
});
export default Home;