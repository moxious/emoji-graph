import Link from 'next/link';
import { Menu } from 'semantic-ui-react'

const linkStyle = {
    marginRight: 15
};

const MainLayout = ({ children }) => (
    <div className='MainLayout'>
        <Menu>
            <Menu.Item name='home'>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </Menu.Item>

            <Menu.Item name='categories'>
                <Link href="/category/">
                    <a>Categories</a>
                </Link>
            </Menu.Item>

            <Menu.Item name='search'>
                <Link href="/search/">
                    <a>Search</a>
                </Link>
            </Menu.Item>
        </Menu>

        <div className='MainContent'>{children}</div>
    </div>
);

MainLayout.getInitialProps = async function (context) {
    console.log('CONTEXT',context);
    return {};
};

export default MainLayout;
