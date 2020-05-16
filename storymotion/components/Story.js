import StoryLine from './StoryLine';
import { Card } from 'semantic-ui-react';
import HowLongAgo from './HowLongAgo';
import UserLink from './UserLink';
import VotingControls from './VotingControls';

const Story = ({ story }) => {
    const score = story[0].votes;

    return (
        <div className='Story'>
            <h4>
                {score} votes&nbsp;
                {/* Written by&nbsp; 
                <UserLink id={story[0].userId} nickname={story[0].userName} />&nbsp; */}
                <HowLongAgo date={story[0].created} /> 
            </h4>

            <Card.Group style={{paddingTop: '15px', paddingBottom: '15px'}}>
                {
                    story.map((line, v) => <StoryLine line={line} key={'sl_' + v} />)
                }
            </Card.Group>

            <VotingControls entityType={'story'} entityId={story[0].storyId} />
        </div>);
};

export default Story;