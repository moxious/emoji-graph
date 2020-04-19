import MainLayout from '../components/MainLayout';
import React from 'react';
import { Form, Dropdown, Loader } from 'semantic-ui-react'
import EmojiList from '../components/EmojiList';
import CategoryList from '../components/CategoryList';
import api from '../api';
import _ from 'lodash';

const searchTypes = [
    { key: 'emoji', text: 'Emoji', value: 'emoji', default: true },
    { key: 'categories', text: 'Categories', value: 'categories' },
];

class SearchForm extends React.Component {
    state = {
        searchType: 'emoji',
        text: null,
        pending: true,
        results: null
    }

    search = async () => {
        let res;

        if (!this.state.text || !this.state.searchType) {
            console.log('Skipping search');
            return Promise.resolve(null);
        }

        this.setState({ pending: true });

        if (this.state.searchType === 'emoji') {
            console.log('search emoji');
            res = await api.searchEmoji('*' + this.state.text + '*');
        } else {
            console.log('search categories');
            res = await api.searchCategories(this.state.text);
        }

        return res.json()
            .then(data => {
                console.log('SEARCH RESULTS', data);
                return this.setState({ results: data, pending: false });
            });
    }

    onSearchChange = _.debounce((event, data) => {
        this.setState({ text: data.value });

        if (this.state.text && this.state.searchType) {
            return this.search();
        }
    }, 200);

    onTypeChange = _.debounce((event, data) => {
        this.setState({ searchType: data.value });

        if (this.state.text && this.state.searchType) {
            return this.search();
        }
    }, 200);

    render() {
        return (
            <div className='SearchForm'>
            <Form>
                <Form.Group inline={true}>
                    <Form.Field>
                        <Form.Input 
                            onChange={this.onSearchChange}
                            placeholder='search term' />
                    </Form.Field>
                    <Form.Field>
                        <Dropdown defaultValue='emoji'
                            onChange={this.onTypeChange}
                            search selection options={searchTypes} />
                    </Form.Field>
                </Form.Group>
            </Form>

            { 
                this.state.pending ? <Loader /> : 
                (this.state.results ?
                    <SearchResults results={this.state.results} /> : 
                    '' )
            }
            </div>
        );
    }
}

const SearchResults = ({ results }) => {
    if (!results || results.length === 0) {
        return <div className='SearchResults'>
            <h3>No search results.  Try another term</h3>
        </div>
    };

    return (
        <div className='SearchResults'>
            {
                results[0] && results[0].emoji ? 
                <EmojiList emojis={results} /> :
                <CategoryList categories={results.map(r => r.name)} />
            }
        </div>
    );
};

export default function Search() {
    return (
        <MainLayout>
            <h1>Search</h1>

            <SearchForm />
        </MainLayout>
    );
}