import MainLayout from '../../components/MainLayout';
import EmojiList from '../../components/EmojiList';
import { useRouter } from 'next/router';
import api from '../../api/';
import { Header } from 'semantic-ui-react';

const Similar = ({ emoji, similar }) => {
    const router = useRouter();

    return (
        <MainLayout>
            <Header size='huge'>Similar to: {emoji}</Header>

            <EmojiList emojis={similar}/>
        </MainLayout>
    );
};

Similar.getInitialProps = async function (context) {
    const emoji = context.query.emoji;
    const data = await api.getSimilarEmoji(emoji);
    console.log(data);
    return { emoji, similar: data };
};

export default Similar;
