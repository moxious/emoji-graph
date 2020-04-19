import Link from 'next/link';
import { Card } from 'semantic-ui-react'
import Emoji from './Emoji';

const EmojiList = ({ emojis }) => (
    <Card.Group>
        {
            emojis.map((e, key) => 
                <Emoji key={key} data={e}/>
            )
        }
    </Card.Group>
);

export default EmojiList;