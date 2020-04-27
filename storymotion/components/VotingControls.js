import api from '../api/';
import { Button, Popup } from 'semantic-ui-react';

const VotingControls = ({ entityType, entityId }) => {
    const noCreds = !api.credentials.areValid();

    const upvote = () => {
        return api.private.upvote(entityType, entityId)
            .then(response => console.log('UPVOTE', response))
            .catch(err => console.error('Upvote error', err));
    }

    const downvote = () => {
        return api.private.downvote(entityType, entityId)
            .then(response => console.log('DOWNVOTE', response))
            .catch(err => console.error('Downvote error', err));
    }
   
    const UpvoteButton = () => 
        <Button basic disabled={noCreds} onClick={upvote} color='green'>😍</Button>;
    
    const DownvoteButton = () => 
        <Button basic disabled={noCreds} onClick={downvote} color='green'>👎</Button>

    return (
        <div className='VotingControls'>
            {
                noCreds ? 
                <Popup content='You must be logged in to vote!' trigger={<UpvoteButton/>}/>
                : <UpvoteButton/>
            }            

            {
                noCreds ? 
                <Popup content='You must be logged in to vote!' trigger={<DownvoteButton/>}/>
                : <DownvoteButton/>
            }
        </div>
    );
};

export default VotingControls;