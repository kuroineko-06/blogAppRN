import client from "./client";

export const getFeaturedPosts = async () => {
  try {
    const { data } = await client("post/featured-posts");
    return data;
  } catch (error) {
    const { respond } = error;
    if (respond?.data) {
      return respond.data;
    }
    return { error: error.message || error };
  }
};

export const getLatestPosts = async (limit, pageNo) => {
  try {
    const { data } = await client(`post/posts?limit=${limit}&pageNo=${pageNo}`);
    return data;
  } catch (error) {
    const { respond } = error;
    if (respond?.data) {
      return respond.data;
    }
    return { error: error.message || error };
  }
};

export const getSinglePosts = async (slug) => {
  try {
    const { data } = await client(`post/single/${slug}`);
    return data;
  } catch (error) {
    const { respond } = error;
    if (respond?.data) {
      return respond.data;
    }
    return { error: error.message || error };
  }
};
export const getSimillerPosts = async (id) => {
  try {
    const { data } = await client(`post/related-posts/${id}`);
    return data;
  } catch (error) {
    const { respond } = error;
    if (respond?.data) {
      return respond.data;
    }
    return { error: error.message || error };
  }
};

export const searchPosts = async (query) => {
  try {
    const { data } = await client(`post/search?title=${query}`);
    return data;
  } catch (error) {
    const { respond } = error;
    if (respond?.data) {
      return respond.data;
    }
    return { error: error.message || error };
  }
};
