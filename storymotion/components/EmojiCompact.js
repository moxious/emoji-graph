import { Popup } from 'semantic-ui-react';

const EmojiCompact = ({ data }) => {
    let meta = data.name;

    if (data.categories && data.categories.length > 0) {
        meta = meta + '(' + data.categories.join(', ') + ')';
    }

    return (
        <Popup content={meta} trigger={
            <span style={{ fontSize: '40px' }} className='EmojiCompact'>
                {data.emoji}
            </span>
        } />
    );
};

export default EmojiCompact;