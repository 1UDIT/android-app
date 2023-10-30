import {   TextInput } from "react-native";
 



const SearchBar = ({ searchPhrase, setSearchPhrase }) => {
    return (
      <TextInput
        style={{
          width: "90%",
          height: 40,
          borderRadius: 10,
          borderColor: "gray",
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="Search"
        onChangeText={(text) => setSearchPhrase(text)}
        value={searchPhrase}
      />
    );
  };

  export default SearchBar;