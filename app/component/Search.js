import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import { getSinglePosts, searchPosts } from "../api/post";
import PostListItem from "./PostListItem";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const navigation = useNavigation();

  const handleOnSubmit = async () => {
    if (!query.trim()) return;
    const { error, posts } = await searchPosts(query);
    if (error) return console.log(error);
    if (!posts.length) return setNotFound(true);
    setResults([...posts]);
    setNotFound(false);
  };

  const handlePostPress = async (slug) => {
    const { error, post } = await getSinglePosts(slug);
    if (error) console.log(error);
    navigation.navigate("PostDetail", { post });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Search..."
        style={styles.searchInput}
        onSubmitEditing={handleOnSubmit}
      ></TextInput>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {notFound ? (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: "rgba(0,0,0,0.3)",
              textAlign: "center",
              marginTop: 30,
            }}
          >
            Results Not Found !!!
          </Text>
        ) : (
          results.map((post) => {
            return (
              <View key={post.id} style={{ marginTop: 10 }}>
                <PostListItem
                  post={post}
                  onPress={() => handlePostPress(post.slug)}
                />
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 10,
    flex: 1,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: "#383838",
    borderRadius: 5,
    padding: 5,
  },
});
