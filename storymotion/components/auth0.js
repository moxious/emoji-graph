import _ from 'lodash';

const BASE_URL = 'http://localhost:3000/';
const API = 'https://d9dzj96r0k.execute-api.us-east-1.amazonaws.com/basic/';

export default () => ({
    API,
    BASE_URL,
    apiOptions: {
        audience: API,
        scope: 'actions:*',
    },
    AUTH0_CLIENT_ID: 'vGKmSRL3jNlfPHxZedvE6W3H3bKNPAJO',
    AUTH0_DOMAIN: 'dev-iey-o5gl.auth0.com',
    AUTH0_CALLBACK_URL: BASE_URL,
});