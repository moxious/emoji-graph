import MainLayout from '../components/MainLayout';
import StoryList from '../components/StoryList';
import { useRouter } from 'next/router';
import { Header } from 'semantic-ui-react';

const Story = (props) => {
    const router = useRouter();
    console.log(router);

    return (
        <MainLayout>
            <Header size='huge'>Stories</Header>

            <StoryList />
        </MainLayout>
    );
};

export default Story;
