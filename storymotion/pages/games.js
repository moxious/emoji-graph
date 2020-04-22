import MainLayout from '../components/MainLayout';
import { useRouter } from 'next/router';
import NewGame from '../components/NewGame';
import { Grid } from 'semantic-ui-react';
import Translate from '../components/Translate';
import React from 'react';
import api from '../api/';

class F extends React.Component {
    state = { data: null };

    componentDidMount() {
        return api.private.hello()
            .then(r => r.json())
            .then(data => this.setState({ data }))
            .catch(err => console.error('F component', err));
    }

    render() {
        return <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
    }
}

const Games = ({ emoji, data }) => {
    const router = useRouter();
    console.log(router);

    return (
        <MainLayout>
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <NewGame />

                        <F/>
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
