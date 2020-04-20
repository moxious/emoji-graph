import Link from 'next/link';
import { Menu } from 'semantic-ui-react'
import React from 'react';
import _ from 'lodash';

let activeItem = 'home';

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
                </Menu>

                <div className='MainContent'>{this.props.children}</div>
            </div>
        );
    }
}

export default MainLayout;
