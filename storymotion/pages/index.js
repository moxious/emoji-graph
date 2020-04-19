import MainLayout from '../components/MainLayout';
import EmojiLink from '../components/EmojiLink';

const Index = (props) => {
    return (
        <MainLayout>
            <h1>Storymotion</h1>

            <div style={{
              paddingTop: '40px',
              fontSize: '100px',
              paddingBottom: '40px',
            }}>😂</div>

            <h2>Getting Started</h2>

            <p>Welcome!  You can
            <EmojiLink emoji='magnifying glass tilted right'>🔎 explore</EmojiLink>, 
            play some <EmojiLink emoji='game die'>🎲 games</EmojiLink>, and get a nice
            <EmojiLink emoji='grinning cat face'>😺 grin</EmojiLink> on your face!</p>

            <p>We also have many categories, such as 

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