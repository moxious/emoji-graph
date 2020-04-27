import MainLayout from '../../components/MainLayout';
import EmojiDetail from '../../components/Emoji';
import StoryList from '../../components/StoryList';

import { useRouter } from 'next/router';
import api from '../../api/';
import { Header } from 'semantic-ui-react';

const Emoji = ({ emoji, data, stories }) => {
    const router = useRouter();

    return (
        <MainLayout>
            <Header size='huge'>{emoji}</Header>

            <EmojiDetail data={data} full={true}/>

            <StoryList stories={stories}/>
        </MainLayout>
    );
};

Emoji.getInitialProps = async function (context) {
    const emoji = context.query.emoji;

    return Promise.all([api.getEmoji(emoji), api.emoji.getStories(emoji)])
        .then(([data, stories]) => {
            return { emoji, data: data[0], stories };
        });
    // const data = await api.getEmoji(emoji);
    // console.log(data);
    // const stories = await api.emoji.getStories(emoji);
    // console.log('STORIES',stories);
    // return { emoji, data: data[0] };
};

export default Emoji;
