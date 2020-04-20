import MainLayout from '../components/MainLayout';
import { useRouter } from 'next/router';
import api from '../api/';
import { Header } from 'semantic-ui-react';

const Games = ({ emoji, data }) => {
    const router = useRouter();
    console.log(router);

    return (
        <MainLayout>
            <Header size='huge'>Games</Header>

            
        </MainLayout>
    );
};

export default Games;
