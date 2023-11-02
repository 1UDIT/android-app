import { StyleSheet, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';



const SearchBar = ({ searchPhrase, setSearchPhrase, setShowSearchBar, showSearchBar }) => {
  return (
    <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="search" size={20} color="#000" onPress={() => setShowSearchBar(!showSearchBar)}/>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={(text) => setSearchPhrase(text)}
        value={searchPhrase}
      />
    </View>

  );
};


const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242', 
  },
})

export default SearchBar;