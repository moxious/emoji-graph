import Link from 'next/link';
import { Menu } from 'semantic-ui-react'
import React from 'react';
import _ from 'lodash';
import { useAuth } from 'use-auth0-hooks';
import { Auth0Lock } from 'auth0-lock';
import auth0 from '../components/auth0';
import api from '../api';
let activeItem = 'home';

const Authd = ({ lock, profile }) => {
    const auth = useAuth();

    const doLogin = () => {
        return lock.show({ redirectUrl: auth0().BASE_URL });
    };

    const doLogout = () => {
        lock.logout();
        api.setCredentials({});
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    };

    if (!profile) {
        return (
            <Menu.Item name='login' onClick={doLogin}>
                Log in
            </Menu.Item>
        )
    } else {
        console.log('Logged in', profile);
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

        lock.on('authenticated', (authResult) => {
            console.log('Lock authenticated', authResult);
            localStorage.setItem('accessToken', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            api.setCredentials(authResult);
        
            lock.getUserInfo(authResult.accessToken, (error, profile) => {
                if (error) {
                    console.error('Error on getting lock user info', error);
                    return;
                }

                console.log('Lock user info', profile);
                localStorage.setItem('profile', JSON.stringify(profile));
                this.setState({ profile });
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
                    <Authd lock={this.state.lock} profile={this.state.profile}/>
                </Menu>

                <div className='MainContent'>{this.props.children}</div>
            </div>
        );
    }
}

export default MainLayout;
