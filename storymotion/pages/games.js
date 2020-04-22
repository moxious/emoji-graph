import MainLayout from '../components/MainLayout';
import { useRouter } from 'next/router';
import NewGame from '../components/NewGame';
import { Grid } from 'semantic-ui-react';
import Translate from '../components/Translate';
import React from 'react';
import api from '../api/';
import useSWR from 'swr'
import { withAuth } from 'use-auth0-hooks';

const F = withAuth(({ auth }) => {
    console.log('AUTH',auth);

    if (auth.isAuthenticated) {
        const { data, error } = useSWR('hello', async () => {
            console.log("hello");
            const v = await api.private.hello();
            console.log("v",v);
            const json = await v.json();
            console.log("json",json);
            return json;
        });

        if (error) {
            console.log('Error',error);
            return <div>Failed to load {`${error}`}</div>
        } else {
            console.log('data',data);
        }

        return <pre>{JSON.stringify(data ? data : {loading:true}, null, 2)}</pre>
    } 

    
    return <pre>F: Not authenticated</pre>;
});

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
