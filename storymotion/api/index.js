import fetch from 'isomorphic-unfetch';
import auth0 from '../components/auth0';
import _ from 'lodash';
import moment from 'moment';

const endpoint = auth0().API;
let credentials = {};

const json = () => ({ 'Content-Type': 'application/json', });
const authorization = () => ({ Authorization: `Bearer ${credentials.idToken}` });

const apiCall = (endpoint, options = null) => {
    console.log('API call', endpoint);
    return fetch(endpoint, options).then(res => res.json());
};

const translate = async (text) =>
    fetch(endpoint + 'translate', {
        method: 'POST',
        headers: json(),
        body: JSON.stringify({ text }),
    }).then(res => res.json());

const submitStory = async (data) =>
    fetch(endpoint + 'story', {
        method: 'POST',
        headers: _.merge(json(), authorization()),
        body: JSON.stringify(data),
    }).then(r => r.json());

const vote = (entityType, entityId, direction='up') =>
    fetch(endpoint + `vote/${entityType}/${entityId}/${direction}`, {
        method: 'POST',
        headers: _.merge(json(), authorization()),
        body: {
            entity: entityType,
            entityId,
            direction,
        },
    }).then(r => r.json());

const upvote = (entityType, entityId) => vote(entityType, entityId, 'up');
const downvote = (entityType, entityId) => vote(entityType, entityId, 'down');

const getMatrix = async (x = 3, y = 3) => apiCall(endpoint + `matrix?x=${x}&y=${y}`);
const getStories = async (skip = 0, limit = 50) => apiCall(endpoint + `story?skip=${skip}?limit=${limit}`);
const getCategories = async (skip = 0, limit = 20) => apiCall(endpoint + `category?skip=${skip}&limit=${limit}`);
const getEmojiByCategory = async (category) => apiCall(endpoint + `category/${category}`);
const getRelatedCategories = async (category) => apiCall(endpoint + `category/related/${category}`);
const getSimilarEmoji = async (emoji) => apiCall(endpoint + `similar/${emoji}`);
const getEmoji = async (emoji) => apiCall(endpoint + `emoji/${emoji}`);
const searchEmoji = async (text) => apiCall(endpoint + `search/emoji/${text}`);
const searchCategories = async (text) => apiCall(endpoint + `search/category/${text}`);

const user = async (user) =>
    fetch(endpoint + 'user', {
        method: 'POST',
        headers: _.merge(authorization(), json()),
        body: JSON.stringify({ user }),
    }).then(res => res.json());

const hello = () => {
    const token = localStorage.getItem('id_token');
    if (!token) {
        return Promise.reject('Private API calls not allowed while unauthenticated');
    }

    return apiCall(endpoint + 'hello', {
        method: 'POST',
        headers: _.merge(authorization(), json()),
    });
};

export default {
    endpoint,
    scope: 'actions:*',
    translate,
    getMatrix,
    getCategories,
    getStories,
    getEmojiByCategory,
    getRelatedCategories,
    getSimilarEmoji,
    getEmoji,
    apiCall,
    searchEmoji,
    searchCategories,
    credentials: {
        get: () => _.cloneDeep(credentials),
        set: creds => {
            credentials = creds;
        },
        getProfile: () => _.get(_.cloneDeep(credentials), 'profile'),
        arePresent: () => !_.isNil(credentials.idToken),
        areValid: () => {
            const expires = _.get(credentials, 'expires');
            if (!expires) { return false; }
            const m = moment.utc(expires);
            const now = moment.utc();
            
            // We have a token, but it expired in the past.
            if (now.diff(m) >= 0) {
                return false;
            }

            return true;
        },
    },
    private: {
        hello,
        user,
        submitStory,
        upvote,
        downvote,
    },
};