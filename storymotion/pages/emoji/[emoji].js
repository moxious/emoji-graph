import MainLayout from '../../components/MainLayout';
import Header from '../../components/Header';
import EmojiDetail from '../../components/Emoji';
import { useRouter } from 'next/router';
import Link from 'next/link';
import api from '../../api/';

const Emoji = ({ emoji, data }) => {
    const router = useRouter();

    return (
        <MainLayout>
            <h1>Emoji Details: {emoji}</h1>

            <EmojiDetail data={data} full={true}/>
        </MainLayout>
    );
};

Emoji.getInitialProps = async function (context) {
    const emoji = context.query.emoji;
    const res = await api.getEmoji(emoji);
    const data = await res.json();
    // console.log(data);
    return { emoji, data: data[0] };
};

export default Emoji;
