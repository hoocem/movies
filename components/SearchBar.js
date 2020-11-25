import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({onSearch, onUnfocus}) => {
  const [searchedText, setSearchedText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const textInputRef = useRef();

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleUnfocus = () => {
    setIsSearchFocused(false);
    Keyboard.dismiss();
    textInputRef.current.clear();
  };

  const displaySearchIcon = () => {
    if (isSearchFocused) {
      return (
        <TouchableOpacity onPress={handleUnfocus}>
          <MaterialIcons
            style={styles.searchIcon}
            name="arrow-back"
            size={25}
            color="#000"
          />
        </TouchableOpacity>
      );
    }
    return (
      <MaterialIcons
        style={styles.searchIcon}
        name="search"
        size={25}
        color="#000"
      />
    );
  };

  return (
    <View style={styles.searchSection}>
      {displaySearchIcon()}
      <TextInput
        style={styles.input}
        placeholder="Search movies"
        value={searchedText}
        onChangeText={(text) => setSearchedText(text)}
        onSubmitEditing={() => onSearch(searchedText)}
        onFocus={handleSearchFocus}
        returnKeyType="search"
        ref={textInputRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    paddingLeft: 5,
    height: 50,
    borderColor: '#CD9B44',
    borderWidth: 1,
    borderRadius: 30,
  },
  searchIcon: {
    padding: 10,
    color: '#CD9B44',
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
});

export default SearchBar;
