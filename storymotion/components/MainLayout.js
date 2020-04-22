import Link from 'next/link';
import { Menu } from 'semantic-ui-react'
import React from 'react';
import _ from 'lodash';
import { useAuth, withAuth } from 'use-auth0-hooks';
import { Auth0Lock } from 'auth0-lock';
import auth0 from '../components/auth0';
import api from '../api';
let activeItem = 'home';

class LocalStorageAuthHelper extends React.Component {
    state = { lock: null, fresh: 0 };

    componentDidMount() {
        // Access to local storage is only permitted here, not in render or componentWillMount
        const config = auth0();
        const tok = localStorage.getItem('id_token');

        if (!tok) {
            const lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN, {
                auth: {
                    params: {
                        scope: 'openid email',
                    },
                    responseType: 'token id_token',
                },
            });

            lock.on('authenticated', (authResult) => {
                console.log(authResult);
                lock.getUserInfo(authResult.accessToken, (error, profile) => {
                    if (error) {
                        console.error('Error on getting lock user info', error);
                        return;
                    }

                    console.log('Lock authenticated');

                    localStorage.setItem('accessToken', authResult.accessToken);
                    localStorage.setItem('id_token', authResult.idToken);
                    localStorage.setItem('profile', JSON.stringify(profile));

                    return this.setState({ fresh: 1 });
                });
            });

            this.setState({ lock });
        }

        return api.private.user(this.props.details.user)
            .then(resp => resp.json())
            .then(apiResults => console.log('User API Result', apiResults))
            .catch(err => { console.error('ZOMG', err); });
    }

    render() {
        return (<span>&nbsp;</span>);
    }
}

const Authd = withAuth(({ auth }) => {
    const { isAuthenticated, isLoading, accessToken, login, logout } = useAuth();

    if (!isAuthenticated) {
        return (
            <Menu.Item name='login' onClick={() => login({ appState: { returnTo: 'http://localhost:3000/' } })}>
                Log in
            </Menu.Item>
        )
    } else {
        console.log('Logged in', auth);
        return (
            <Menu.Item name='logout' onClick={() => logout({ appState: { returnTo: 'http://localhost:3000/' } })}>
                {auth && auth.user && auth.user.picture ? <img src={auth.user.picture} /> : auth.user.name}
                &nbsp; Logout
                <LocalStorageAuthHelper details={auth}/>
            </Menu.Item>
        )
    }
});

class MainLayout extends React.Component {
    state = {
        items: [
            { name: 'home', link: "/", title: 'Home' },
            { name: 'search', link: "/search", title: 'Search' },
            { name: 'games', link: "/games", title: 'Games' },
            { name: 'category', link: "/category", title: 'Categories' },
        ],
    };

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
                    <Authd />
                </Menu>

                <div className='MainContent'>{this.props.children}</div>
            </div>
        );
    }
}

export default MainLayout;
