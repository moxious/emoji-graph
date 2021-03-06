import 'semantic-ui-css/semantic.min.css';
import './app.css';
import auth0 from '../components/auth0';
import { Auth0Provider } from 'use-auth0-hooks';

function MyApp({ Component, pageProps }) {
    const config = auth0();

    return (
        <Auth0Provider domain={config.AUTH0_DOMAIN}
            clientId={config.AUTH0_CLIENT_ID}
            // cacheLocation={'localstorage'}
            redirectUri={config.BASE_URL}>
            <Component {...pageProps} />
        </Auth0Provider>
    );
}

export default MyApp;