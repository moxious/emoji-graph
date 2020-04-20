import MainLayout from '../components/MainLayout';
import { useRouter } from 'next/router';
import NewGame from '../components/NewGame';
import { Header, Grid } from 'semantic-ui-react';
import Translate from '../components/Translate';

const Games = ({ emoji, data }) => {
    const router = useRouter();
    console.log(router);

    return (
        <MainLayout>
            <Grid columns={2} separated>
                <Grid.Row>
                    <Grid.Column>
                        <NewGame />
                    </Grid.Column>

                    <Grid.Column>
                        <Translate />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </MainLayout>
    );
};

export default Games;
