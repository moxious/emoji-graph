import React from 'react';
import api from '../api';
import { Loader, Form, Header, Message, Icon } from 'semantic-ui-react';
import EmojiCompact from '../components/EmojiCompact';
import _ from 'lodash';

const SimpleMessage = ({ message, positive }) =>
    message ? <Message icon positive={positive}>
        <Icon name='check' />
        <Message.Content>
            <Message.Header>{message}</Message.Header>
        </Message.Content>
    </Message> : '';

export default class NewGame extends React.Component {
    state = {
        pending: false,
        matrix: null,
        x: 1,
        y: 3,
        storyLines: [],
        message: null,
    };

    makeGame() {
        this.setState({ pending: true, storyLines: [] });

        return api.getMatrix(this.state.x, this.state.y)
            .then(matrix => {
                console.log('MATRIX', matrix);
                return this.setState({ matrix });
            })
            .catch(err => {
                console.error('ZOMG', err);
            })
            .finally(() => this.setState({ pending: false }));
    }

    componentWillMount() {
        return this.makeGame();
    }

    formComplete = () => {
        let complete = true;
        for (let i = 0; i < this.state.x; i++) {
            if (!this.state.storyLines[i]) { complete = false; }
        }

        return complete;
    };

    submitStory = async () => {
        if (!this.formComplete()) {
            console.log('Refuse to submit an incomplete form');
        }

        const data = _.pick(this.state, ['storyLines', 'matrix', 'x', 'y']);
        console.log('SubmitStory', data);
        // console.log(JSON.stringify(data,null,0));

        try {
            const result = await api.private.submitStory(data);
            const json = await result.json();
            console.log('Result of submitting story', json);
            this.setState({ message: 'Thanks!  Let\'s play again!' });
            return this.makeGame();
        } catch (e) {
            console.error('Error submitting story', e);
        }
    };

    rowText = _.debounce((row, event, data) => {
        const storyLines = this.state.storyLines;
        _.set(storyLines, row, data.value);
        console.log('RowText: ', row, data.value, storyLines);
        return this.setState({ storyLines });
    }, 200);

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
            <div className='NewGame'>
                <SimpleMessage message={this.state.message} positive={true}/>

                <Form>
                    {
                        this.state.matrix.map((row, i) =>
                            <div key={`row-${i}`}>
                                <p style={cellStyle}>{
                                    this.state.matrix[i].map((col, j) =>
                                        <span key={`span${j}`}><EmojiCompact data={this.state.matrix[i][j]} />&nbsp;</span>
                                    )
                                }</p>

                                <Form.Group style={cellStyle}>
                                    <Form.Input
                                        maxLength={1000}
                                        onChange={(e, d) => this.rowText(i, e, d)}
                                        placeholder='story' />
                                    <Form.Button type='submit' disabled={!this.formComplete()}
                                        onClick={this.submitStory}>
                                        Submit
                                    </Form.Button>
                                    <Form.Button type='submit' disabled={this.state.pending}
                                        onClick={() => this.makeGame()}>
                                        Make another
                                    </Form.Button>
                                </Form.Group>
                            </div>
                        )
                    }
                </Form>
            </div>
        );
    }
}