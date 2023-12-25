import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import dateFormat from "dateformat";
import Markdown from "react-native-markdown-display";
import * as Linking from "expo-linking";
import SimillerPosts from "./SimillerPosts";
import Seprator from "./Seprator";
import { getSinglePosts } from "../api/post";

const { width } = Dimensions.get("window");

const PostDetail = ({ route, navigation }) => {
  const post = route.params?.post;

  const getImage = (uri) => {
    if (uri) return { uri };
    return require("../../assets/blank.jpg");
  };

  const handleSinglePostsFetch = async ({ slug }) => {
    const { error, post } = await getSinglePosts(slug);
    if (error) console.log(error);
    navigation.push("PostDetail", { post });
  };

  const handelOnLinkPress = async (url) => {
    const res = await Linking.canOpenURL(url);
    if (res) Linking.openURL(url);
    else Alert.alert("Invalid URL", "Can not open broken link!");
  };

  //   const rules = {
  //     paragraph: (node, children, parent, styles) => (
  //       <Text key={node.key} style={styles.paragraph} selectable>
  //         {children}
  //       </Text>
  //     ),
  //   };

  if (!post) return null;

  const { title, thumbnail, tags, createAt, author, content } = post;

  return (
    <ScrollView>
      <Image
        source={getImage(thumbnail)}
        style={{ width, height: width / 1.7 }}
      />
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "700",
            color: "#383838",
            fontSize: 22,
            marginVertical: 15,
          }}
        >
          {title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 3,
          }}
        >
          <Text style={{ color: "#827E7E" }}>By: {author}</Text>
          <Text style={{ color: "#827E7E" }}>
            {dateFormat(createAt, "mediumDate")}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text selectable style={{ color: "#827E7E" }}>
            Tags
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {tags.map((tag, index) => (
              <Text style={{ marginLeft: 5, color: "blue" }} key={tag + index}>
                #{tag}
              </Text>
            ))}
          </View>
        </View>
        <Markdown
          //rules={rules}
          style={styles}
          onLinkPress={handelOnLinkPress}
        >
          {content}
        </Markdown>
      </View>

      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            color: "#383838",
            paddingVertical: 10,
            fontSize: 22,
          }}
        >
          Related Posts
        </Text>
        <Seprator width="100%" />
      </View>

      <View style={{ marginTop: 5 }}>
        <SimillerPosts onPostPress={handleSinglePostsFetch} postId={post.id} />
      </View>
    </ScrollView>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  paragraph: { lineHeight: 25, color: "#545050", letterSpacing: 0.8 },
  body: { fontSize: 16 },
  link: { color: "#7784f9" },
  list_item: {
    color: "#545050",
    paddingVertical: 5,
  },
});
