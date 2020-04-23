import MainLayout from '../../components/MainLayout';
import EmojiDetail from '../../components/Emoji';
import { useRouter } from 'next/router';
import api from '../../api/';
import { Header } from 'semantic-ui-react';

const Emoji = ({ emoji, data }) => {
    const router = useRouter();

    return (
        <MainLayout>
            <Header size='huge'>{emoji}</Header>

            <EmojiDetail data={data} full={true}/>
        </MainLayout>
    );
};

Emoji.getInitialProps = async function (context) {
    const emoji = context.query.emoji;
    const data = await api.getEmoji(emoji);
    // console.log(data);
    return { emoji, data: data[0] };
};

export default Emoji;
