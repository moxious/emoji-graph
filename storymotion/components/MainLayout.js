import Link from 'next/link';
import { Menu } from 'semantic-ui-react'
import React from 'react';
import _ from 'lodash';
import { useAuth, withAuth } from 'use-auth0-hooks';
let activeItem = 'home';

// https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/
const Profile = withAuth(({ auth }) => {
    const { user } = auth;
    return (
      <div>
        <h1>Profile</h1>
        <p>This is the profile page.</p>
        <pre>{JSON.stringify(user || { }, null, 2)}</pre>
      </div>
    );
  });

const Authd = withAuth(({ auth }) => {
    const { isAuthenticated, isLoading, accessToken, login, logout } = useAuth();

    if (!isAuthenticated) {
        return (
            <Menu.Item name='login' onClick={() => login({ appState: { returnTo: 'http://localhost:3000/' }})}>
                Log in
            </Menu.Item>
        )
    } else {
        console.log('Is logged in with ', auth);
        return (
            <Menu.Item name='logout' onClick={() => logout({ appState: { returnTo: 'http://localhost:3000/' }})}>
                { auth && auth.user && auth.user.picture ? <img src={auth.user.picture}/> : auth.user.name }
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

                    <Profile />
                    <div className='MainContent'>{this.props.children}</div>
                </div>
        );
    }
}

export default MainLayout;
