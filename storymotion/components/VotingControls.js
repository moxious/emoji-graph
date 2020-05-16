import api from '../api/';
import { Button, Popup } from 'semantic-ui-react';
import React, { Component } from 'react';

export default class VotingControls extends Component {
    state = {
        voted: false,
    };

    upvote = () => {
        const { entityType, entityId } = this.props;
        return api.private.upvote(entityType, entityId)
            .then(response => console.log('UPVOTE', response))
            .catch(err => console.error('Upvote error', err))
            .finally(() => this.setState({ voted: true }));
    }

    downvote = () => {
        const { entityType, entityId } = this.props;
        return api.private.downvote(entityType, entityId)
            .then(response => console.log('DOWNVOTE', response))
            .catch(err => console.error('Downvote error', err))
            .finally(() => this.setState({ voted: true }));
    }

    render() {
        const noCreds = !api.credentials.areValid();

        const UpvoteButton = () =>
            <Button basic disabled={this.state.voted || noCreds} onClick={this.upvote} color='green'>😍</Button>;

        const DownvoteButton = () =>
            <Button basic disabled={this.state.voted || noCreds} onClick={this.downvote} color='green'>👎</Button>

        return (
            <div className='VotingControls'>
                {
                    noCreds ?
                        <Popup content='You must be logged in to vote!' trigger={<UpvoteButton />} />
                        : <UpvoteButton />
                }

                {
                    noCreds ?
                        <Popup content='You must be logged in to vote!' trigger={<DownvoteButton />} />
                        : <DownvoteButton />
                }
            </div>
        );
    }
};