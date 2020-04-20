import MainLayout from '../../components/MainLayout';
import { useRouter } from 'next/router';
import api from '../../api/';
import { Header } from 'semantic-ui-react';

const Game = ({ emoji, data }) => {
    const router = useRouter();
    console.log(router);

    return (
        <MainLayout>
            <Header size='huge'>{emoji}</Header>
            { router.query.game }
        </MainLayout>
    );
};

export default Game;
