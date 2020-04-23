import React from 'react';
import _ from 'lodash';
import { Form, Loader, Container } from 'semantic-ui-react';
import api from '../api/';
import EmojiCompact from '../components/EmojiCompact';
import EmojiLink from '../components/EmojiLink';

const TokenResult = ({ word, hit, emoji }) => {
    if (!hit) {
        return <span className='TokenResult'>{word}&nbsp;</span>
    }

    return (
        <span className='TokenResult'>
            <EmojiLink emoji={emoji.name}><EmojiCompact data={emoji} />&nbsp;</EmojiLink>
        </span>
    );
};

const TranslateResults = ({ data, tokens, text }) => {
    if (!data.results || data.results.length === 0) {
        return <div className='TranslateResults'>
            <h3>No translation results.  Try another text</h3>
        </div>
    };

    return (
        <Container className='TranslateResults'>
            <h3>Input Text</h3>
            <p>{text}</p>

            <p style={{wordWrap: 'break-word'}}>
            {
                data.results.map((result, index) => {
                    const { word, hit, emoji } = result;
                    return <TokenResult key={index} word={word} hit={hit} emoji={emoji} />
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
        const input = (data.value || '').trim();
        const val = (input && input > 1024) ? input.slice(0, 1023) : input;

        this.setState({ text: val, results: null });

        if (this.state.text) {
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
        const tokens = this.state.text.split(/[ ,;:"-]/).map(e => e.toLowerCase());
        return api.translate(this.state.text)
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
                            <TranslateResults data={this.state.results} /> :
                            ''
                    }
                </div>
            </div>
        )
    }
}