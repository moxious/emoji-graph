import MainLayout from '../components/MainLayout';
import EmojiLink from '../components/EmojiLink';
import CategoryLink from '../components/CategoryLink';
import { Header, Grid } from 'semantic-ui-react';
import Translate from '../components/Translate';
import NewGame from '../components/NewGame';

const Index = (props) => {
    return (
        <MainLayout>
            <div style={{
                paddingTop: '40px',
                fontSize: '100px',
                paddingBottom: '40px',
            }}><EmojiLink emoji='face with tears of joy'>😂</EmojiLink></div>

            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <NewGame />
                    </Grid.Column>

                    <Grid.Column>
                        <Translate />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

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

export default Index;