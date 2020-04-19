import MainLayout from '../../components/MainLayout';
import EmojiList from '../../components/EmojiList';
import { useRouter } from 'next/router';
import api from '../../api/';

const Similar = ({ emoji, similar }) => {
    const router = useRouter();

    return (
        <MainLayout>
            <h1>Similar Emoji: {emoji}</h1>

            <EmojiList emojis={similar}/>
        </MainLayout>
    );
};

Similar.getInitialProps = async function (context) {
    const emoji = context.query.emoji;
    const res = await api.getSimilarEmoji(emoji);
    const data = await res.json();
    console.log(data);
    return { emoji, similar: data };
};

export default Similar;
