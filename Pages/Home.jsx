import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Card from "../Components/card";

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
        <View> 
            <FlatList
                onRefresh={() => getResult()}
                refreshing={refresh}
                data={data}
                keyExtractor={(news) => news.publishedAt + news.title}
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
export default Home;