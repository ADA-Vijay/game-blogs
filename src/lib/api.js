// lib/api.js

import axios from 'axios';

const WORDPRESS_API_URL = 'https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/';

// Function to fetch all posts from WordPress
export async function getAllPosts() {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Function to fetch all categories from WordPress
export async function getAllCategories() {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
