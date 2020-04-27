import { Card } from 'semantic-ui-react';
import EmojiCompact from './EmojiCompact';
import _ from 'lodash';

const emojiContainerStyle = {
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
};

const StoryLine = ({ line }) => {
    const emoji = _.sortBy(line.emoji, (e) => _.get(e.col, 'low'));
    return (
        <Card className='StoryLine'>
            <Card.Content>
                <Card.Header style={emojiContainerStyle}>{emoji.map((e, i) => <EmojiCompact key={i} data={e} />)}</Card.Header>
                <Card.Content>{line.storyLine}</Card.Content>
            </Card.Content>
        </Card>
    );
};

export default StoryLine;