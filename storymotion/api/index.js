import fetch from 'isomorphic-unfetch';

const endpoint = 'https://d9dzj96r0k.execute-api.us-east-1.amazonaws.com/basic/';

const apiCall = (endpoint) => {
    console.log('API call', endpoint);
    return fetch(endpoint);
};

const getCategories = async (skip=0, limit=20) => apiCall(endpoint + `category?skip=${skip}&limit=${limit}`);
const getEmojiByCategory = async (category) => apiCall(endpoint + `category/${category}`);
const getRelatedCategories = async(category) => apiCall(endpoint + `category/related/${category}`);
const getSimilarEmoji = async(emoji) => apiCall(endpoint + `similar/${emoji}`);
const getEmoji = async(emoji) => apiCall(endpoint + `emoji/${emoji}`);
const searchEmoji = async(text) => apiCall(endpoint + `search/emoji/${text}`);
const searchCategories = async(text) => apiCall(endpoint + `search/category/${text}`);

export default {
    endpoint,
    getCategories,
    getEmojiByCategory,
    getRelatedCategories,
    getSimilarEmoji,
    getEmoji,
    apiCall,
    searchEmoji,
    searchCategories,
};