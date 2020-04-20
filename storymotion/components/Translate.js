import React from 'react';
import _ from 'lodash';
import { Form, Loader, Container } from 'semantic-ui-react';
import api from '../api/';
import EmojiCompact from '../components/EmojiCompact';

const TokenResult = ({ data, token }) => {
    return (
        <span className='TokenResult'>
            {data ? <EmojiCompact data={data} /> : token}&nbsp;
        </span>
    );
};

const TranslateResults = ({ results, tokens, text }) => {
    if (!results || results.length === 0) {
        return <div className='TranslateResults'>
            <h3>No translation results.  Try another text</h3>
        </div>
    };

    // Tokens is guaranteed to be >= results.
    // Go through each token.  If it matches 
    const copy = _.cloneDeep(results);

    console.log('RENDER with', copy);
    return (
        <Container className='TranslateResults'>
            <h3>Input Text</h3>
            <p>{text}</p>

            <p style={{wordWrap: 'break-word'}}>
            {
                tokens.map((tok, index) => {
                    let emoji = null;
                    const word = _.get(copy[0], 'word');
                    console.log('COMPARE ', tok, 'to', word);

                    if (tok === word) {                        
                        emoji = copy.shift();
                        console.log('TOOK.  Remaining:', copy);
                    }

                    return <TokenResult key={index} data={emoji} token={tok} />
                })
            }
            </p>

            {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
        </Container>
    );
};

export default class Translate extends React.Component {
    state = {
        results: null,
        text: '',
        pending: false,
    };

    onChange = _.debounce((event, data) => {
        const val = (data.value && data.value.length > 1024) ? data.value.slice(0, 1023) : data.value;

        this.setState({ text: data.value });

        if (this.state.text) {
            console.log('translating....');
            return this.translate();
        }
    }, 200);

    translate = async () => {
        let res;

        if (!this.state.text) {
            console.log('Skipping translate');
            return Promise.resolve(null);
        }

        this.setState({ pending: true });

        console.log('search categories');
        res = await api.translate(this.state.text);

        const tokens = this.state.text.split(/[ ,;:"-]/).map(e => e.toLowerCase());
        return res.json()
            .then(data => {
                console.log('TRANSLATE RESULTS', data);

                if (data.error) {
                    return this.setState({ error: data, results: null });
                }

                return this.setState({ 
                    error: null,
                    tokens, 
                    results: data, 
                });
            })
            .catch(err => {
                this.setState({ error: err, results: null });
            })
            .finally(() => this.setState({ pending: false }));
    }

    render() {
        return (
            <div className='Translate'>
                <h1>Translate English to Emoji</h1>

                <div className='TranslateForm'>
                    <Form>
                        <Form.Group inline={false}>
                            <Form.Field>
                                <Form.Input style={{width: '200px'}}
                                    maxLength={1000}
                                    onChange={this.onChange}
                                    placeholder='text' />
                            </Form.Field>
                        </Form.Group>
                    </Form>

                    {this.state.pending ? <Loader /> : ''}
                    {
                        this.state.error ?
                            'Error: ' + this.state.error.error : ''
                    }

                    {
                        this.state.results ?
                            <TranslateResults
                                text={this.state.text}
                                tokens={this.state.tokens}
                                results={this.state.results} /> :
                            ''
                    }
                </div>
            </div>
        )
    }
}