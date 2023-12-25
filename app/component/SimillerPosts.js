import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PostListItem from "./PostListItem";
import { getSimillerPosts, getSinglePosts } from "../api/post";

const SimillerPosts = ({ postId, onPostPress }) => {
  const [posts, setPosts] = useState([]);

  const fetchSmillerPosts = async () => {
    const { error, posts } = await getSimillerPosts(postId);
    if (error) console.log(error);
    setPosts([...posts]);
  };

  useEffect(() => {
    fetchSmillerPosts();
  }, [postId]);

  return posts.map((post) => {
    return (
      <View style={{ marginTop: 10 }} key={post.id}>
        <PostListItem onPress={() => onPostPress(post)} post={post} />
      </View>
    );
  });
};

export default SimillerPosts;

const styles = StyleSheet.create({});
