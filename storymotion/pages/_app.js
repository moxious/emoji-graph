import 'semantic-ui-css/semantic.min.css';
import './app.css';
import { Auth0Provider, useAuth, withAuth } from 'use-auth0-hooks';

function MyApp({ Component, pageProps }) {
    return (
        <Auth0Provider domain={'dev-iey-o5gl.auth0.com'}
            clientId={'vGKmSRL3jNlfPHxZedvE6W3H3bKNPAJO'}
            redirectUri={'http://localhost:3000/'}>
            <Component {...pageProps} />
        </Auth0Provider>
    );
}

export default MyApp;