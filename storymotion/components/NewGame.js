import React from 'react';
import api from '../api';
import { Loader, Grid, Header } from 'semantic-ui-react';
import EmojiCompact from '../components/EmojiCompact';

export default class NewGame extends React.Component {
    state = {
        pending: false,
        matrix: null,
        x: 3,
        y: 3
    };

    componentWillMount() {
        this.setState({ pending: true });

        return api.getMatrix(this.state.x, this.state.y)
            .then(res => res.json())
            .then(matrix => {
                console.log('MATRIX', matrix);
                return this.setState({ matrix });
            })
            .catch(err => {
                console.error('ZOMG', err);
            })
            .finally(() => this.setState({ pending: false }));
    }

    render() {
        const wrap = children => <div className='Game'>
            <Header size='huge'>Story Game</Header>
            {children}
        </div>;

        if (!this.state.matrix) {
            return wrap(<Loader />);
        }

        const cellStyle = {
            paddingTop: '20px',
            paddingBottom: '20px',
            paddingLeft: '10px',
            paddingRight: '10px',
        };

        return wrap(
            <Grid rows={this.state.x} divided>
                {
                    this.state.matrix.map((row, i) =>
                        <div key={`'block-${i}`}>
                            <Grid.Row key={i}>
                                {
                                    this.state.matrix[i].map((col, j) =>
                                        <Grid.Column style={cellStyle} key={`${i}_${j}`}>
                                            <EmojiCompact data={this.state.matrix[i][j]} />
                                        </Grid.Column>
                                    )
                                }
                            </Grid.Row>
                        </div>
                    )
                }
            </Grid>
        );
    }
}