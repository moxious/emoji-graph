import Link from 'next/link';
import { Menu } from 'semantic-ui-react'
import React from 'react';
import _ from 'lodash';
import { useAuth } from 'use-auth0-hooks';
import { Auth0Lock } from 'auth0-lock';
import auth0 from '../components/auth0';
import api from '../api';
import moment from 'moment';
let activeItem = 'home';

const store = '_store';

const Authd = ({ lock, profile }) => {
    const auth = useAuth();

    const doLogin = () => {
        return lock.show({ redirectUrl: auth0().BASE_URL });
    };

    const doLogout = () => {
        lock.logout();
        api.credentials.set({});
        localStorage.removeItem(store);
    };

    if (!profile) {
        return (
            <Menu.Item name='login' onClick={doLogin}>
                Log in
            </Menu.Item>
        )
    } else {
        // console.log('Logged in', profile);
        return (
            <Menu.Item name='logout' onClick={doLogout}>
                {profile && profile.picture ? <img src={profile.picture} /> : profile.name}
                &nbsp; Logout
            </Menu.Item>
        )
    }
};

class MainLayout extends React.Component {
    state = {
        items: [
            { name: 'home', link: "/", title: 'Home' },
            { name: 'search', link: "/search", title: 'Search' },
            { name: 'games', link: "/games", title: 'Games' },
            { name: 'category', link: "/category", title: 'Categories' },
        ],
        lock: null,
    };

    componentWillUpdate() {
        if (!api.credentials.areValid() && localStorage.getItem(store)) {
            // Restore API credentials and profile if they're still valid.
            const settings = JSON.parse(localStorage.getItem(store));
            console.log('Found settings')
            api.credentials.set(settings);

            if (!api.credentials.areValid()) {
                console.log('Clearing old invalid settings');
                localStorage.removeItem(store);
            } else {
                this.setState({ profile: settings.profile });
            }
        }
    }

    componentDidMount() {
        const lock = new Auth0Lock(auth0().AUTH0_CLIENT_ID, auth0().AUTH0_DOMAIN, {
            auth: {
                params: {
                    scope: 'openid profile email',
                },
                responseType: 'token id_token',
            },
        });

        lock.on('unrecoverable_error', error => {
            lock.show({
                flashMessage: {
                  type: 'error',
                  text: error.errorDescription
                }
              }); 
        })

        lock.on('authorization_error', function(error) {
            lock.show({
              flashMessage: {
                type: 'error',
                text: error.errorDescription
              }
            });
          });

        lock.on('authenticated', (result) => {
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('id_token', result.idToken);

            const granted = moment.utc();
            const expires = moment.utc().add(result.expiresIn, 'seconds');

            _.set(result, 'granted', granted.toISOString());
            _.set(result, 'expires', expires.toISOString());

            api.credentials.set(result);
            localStorage.setItem(store, result);
        
            lock.getUserInfo(result.accessToken, (error, profile) => {
                if (error) {
                    console.error('Error on getting lock user info', error);
                    return;
                }

                _.set(result, 'profile', profile);
                api.credentials.set(result);
                localStorage.setItem(store, JSON.stringify(result));
                this.setState({ profile });

                return api.private.user(profile)
                    .then(result => console.log('user result', result))
                    .catch(err => console.error('User error', err));
            });
        });

        return this.setState({ lock });
    }

    handleItemClick = (name) => {
        console.log('set active', name);
        activeItem = name;
        return Promise.resolve(true);
    };

    render() {
        return (
            <div className='MainLayout'>
                <Menu>
                    {
                        this.state.items.map((i, idx) => {
                            return (
                                <Link href={i.link} key={idx}>
                                    <Menu.Item
                                        name={i.name}
                                        active={activeItem === i.name}
                                        onClick={() => this.handleItemClick(i.name)}>
                                        {i.title}
                                    </Menu.Item>
                                </Link>
                            );
                        })
                    }
                    <Authd lock={this.state.lock} profile={api.credentials.getProfile()}/>
                </Menu>

                <div className='MainContent'>{this.props.children}</div>
            </div>
        );
    }
}

export default MainLayout;
