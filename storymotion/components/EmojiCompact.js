import { Popup } from 'semantic-ui-react';

const EmojiCompact = ({ data }) => {
    return (
        <Popup content={data.name} trigger={
            <span style={{ fontSize: '40px' }} className='EmojiCompact'>
                {data.emoji}
            </span>
        } />
    );
};

export default EmojiCompact;