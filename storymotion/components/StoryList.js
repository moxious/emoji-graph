import React from 'react';
import api from '../api/index';
import _ from 'lodash';
import EmojiCompact from './EmojiCompact';
import { Divider } from 'semantic-ui-react';
import Story from './Story';

export default class StoryList extends React.Component {
    state = {
        stories: {},
    };

    componentWillMount() {
        if (this.props.stories) {
            if(!_.isNil(this.props.stories[0].storyId)) {
                return this.setState({ stories: _.groupBy(this.props.stories, 'storyId') });
            } else {
                return this.setState({ stories: {} });
            }
        }

        this.setState({ loading: true });
        return api.getStories()
            .then(stories => {
                this.setState({ stories: _.groupBy(stories, 'storyId') });
            })
            .catch(err => console.error('ZOMG'))
            .finally(() => this.setState({ loading: false }));
    }

    isEmpty() {
        return !this.state.stories || Object.keys(this.state.stories).length === 0;
    }

    render() {
        if (this.state.loading) {
            return <p>Loading...</p>;
        }

        return (
            <div className='StoryList'>
                { this.isEmpty() ? 
                <h4>No Stories Available</h4> :
                Object.keys(this.state.stories).map((tok, k) =>
                    <div>
                        <Story key={k} story={this.state.stories[tok]} />
                        <Divider/>
                    </div>)
                }
                {/* <pre>{JSON.stringify(this.state.stories, null, 2)}</pre> */}
            </div>
        )
    }
}