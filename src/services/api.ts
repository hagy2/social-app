import axios from 'axios';

const API_BASE = 'https://gorest.co.in/public/v2';

export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE}/posts`);
  return response.data;
};

export const fetchComments = async (postId: number) => {
  const response = await axios.get(`${API_BASE}/posts/${postId}/comments`);
  return response.data;
};
