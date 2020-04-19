import { Container, Grid, Header, Icon, Card } from 'semantic-ui-react'
import Link from 'next/link';
import _ from 'lodash';
import CategoryList from './CategoryList';

const Details = ({ data }) =>
    <div className='EmojiDetails'>
        {data.altName && data.altName !== data.name ? <p>Alternative name: <span>{data.altName}</span></p> : ''}
        {data.unicodeName && data.altName !== data.name ? <p>Unicode name: <span>{data.altName}</span></p> : ''}

        <AltNames data={data} />

        {data.sentiment ? <Sentiment data={data} /> : ''}

        <h2>Related Categories</h2>
        <CategoryList categories={
            _.sortBy(_.uniq((data.categories || []).concat((data.relatedCategories || []))))
        } />

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>;

const AltNames = ({ data }) => {
    const { name, altName, unicodeName } = data;

    const hasAlts = (altName || unicodeName) && (altName !== name) || (unicodeName !== name);

    const isDifferent = n => n && n !== name;

    return hasAlts ?
        <div className='AlternativeNames'>
            <h3>Alternative Names</h3>
            {
                isDifferent(altName) ? altName : ''
            }
            {
                isDifferent(unicodeName) ? unicodeName : ''
            }
        </div> : '';
};

const Sentiment = ({ data }) => {
    const pos = data.positive / data.occurrences;
    const neg = data.negative / data.occurrences;
    const neut = data.neutral / data.occurrences;

    let verdict;

    if (pos >= 0.5) {
        verdict = 'mostly positive';
    } else if (neg >= 0.5) {
        verdict = 'mostly negative';
    } else if (neut >= 0.5) {
        verdict = 'mostly neutral';
    } else {
        verdict = 'mixed';
    }

    return (
        <div className='EmojiSentiment'>
            <h3>Sentiment</h3>

            <em>How often this emoji is positive, neutral, and negative.</em>
            <p>
                {data.positive} <Icon color='green' name='arrow alternate circle up' />
                {data.neutral} <Icon color='grey' name='circle' />
                {data.negative} <Icon color='red' name='arrow alternate circle down' />
            </p>

            {data.occurrences} total occurrences, {verdict} sentiment.
        </div>
    );
};

const Emoji = ({ data, full }) =>
    <Card className='Emoji'>
        <Card.Content>
            <Card.Header>
                <Link href="/emoji/[emoji]" as={`/emoji/${data.name}`}>
                    <a>{data.emoji}</a>
                </Link>
            </Card.Header>

            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                    <Link href="/emoji/[emoji]" as={`/emoji/${data.name}`}>
                <a>{data.name}</a>
            </Link>

                    </Grid.Column>
                    <Grid.Column>
                    <Link href="/similar/[emoji]" as={`/similar/${data.name}`}>
                <a><em>find similar 👉</em></a>
            </Link>

                    </Grid.Column>
                </Grid.Row>
            </Grid>

            {full ? <Details data={data} /> : ''}
        </Card.Content>
    </Card>;

export default Emoji;