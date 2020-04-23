import _ from 'lodash';

const API = 'https://d9dzj96r0k.execute-api.us-east-1.amazonaws.com/basic/';

export default () => ({
    API,
    apiOptions: {
        audience: API,
        scope: 'actions:*',
    },
    AUTH0_CLIENT_ID: 'vGKmSRL3jNlfPHxZedvE6W3H3bKNPAJO',
    AUTH0_DOMAIN: 'dev-iey-o5gl.auth0.com',
    AUTH0_CALLBACK_URL: 'http://localhost:3000/',
});