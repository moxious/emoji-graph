import React from 'react';
import api from '../api/index';
import _ from 'lodash';
import EmojiCompact from './EmojiCompact';
import Story from './Story';

export default class StoryList extends React.Component {
    state = {
        stories: {},
    };

    componentWillMount() {
        return api.getStories()
            .then(stories => {
                this.setState({ stories: _.groupBy(stories, 'storyId') });
            })
            .catch(err => console.error('ZOMG'));
    }

    render() {
        return (
            <div className='StoryList'>
                {
                    Object.keys(this.state.stories).map((tok, k) =>
                        <Story key={k} story={this.state.stories[tok]} />)
                }

                <pre>{JSON.stringify(this.state.stories, null, 2)}</pre>
            </div>
        )
    }
}