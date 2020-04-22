import MainLayout from '../components/MainLayout';
import EmojiLink from '../components/EmojiLink';
import CategoryLink from '../components/CategoryLink';
import { Header } from 'semantic-ui-react';

const Index = (props) => {
    return (
        <MainLayout>
            <Header size='huge'>Storymotion</Header>

            <div style={{
              paddingTop: '40px',
              fontSize: '100px',
              paddingBottom: '40px',
            }}><EmojiLink emoji='face with tears of joy'>😂</EmojiLink></div>

            <h2>Getting Started</h2>

            <p>Welcome!  You can
            <EmojiLink emoji='magnifying glass tilted right'>🔎 explore</EmojiLink>, 
            play some <EmojiLink emoji='game die'>🎲 games</EmojiLink>, and get a nice
            <EmojiLink emoji='grinning cat face'>😺 grin</EmojiLink> on your face!</p>

            <p>We also have many categories, such as&nbsp;
                <CategoryLink category='sport'>sport ⚽</CategoryLink>, 
                <CategoryLink category='person-activity'>activities 🕺🏿</CategoryLink>,
                <CategoryLink category='family'>families 👩‍❤‍👨</CategoryLink>,
                <CategoryLink category='hands'>hands 👏</CategoryLink>,
                and even <CategoryLink category='food-fruit'>fruit 🍌</CategoryLink>!

            </p>
        </MainLayout>
    );
};


// Index.getInitialProps = async function () {
//     const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
//     const data = await res.json();

//     console.log(`Show data fetched. Count: ${data.length}`, data);

//     return {
//         shows: data.map(entry => entry.show)
//     };
// };

export default Index;