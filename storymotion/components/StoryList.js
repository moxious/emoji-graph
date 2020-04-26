import React from 'react';
import api from '../api/index';
import _ from 'lodash';

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

    story(storyId, story, k) {
        return <div className='Story' key={k}>
            <p>StoryId: {storyId}</p>

            {
                story.map((line, v) => 
                    <p key={k + '_' + v}>{line.storyLine}</p>)
            }
        </div>;
    }

    render() {
        return (
            <div className='StoryList'>
                StoryList

                {
                    Object.keys(this.state.stories).map((tok, k) =>
                        this.story(tok, this.state.stories[tok], k))
                }

                <pre>{JSON.stringify(this.state.stories, null, 2)}</pre>
            </div>
        )
    }
}