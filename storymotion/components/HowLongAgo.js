import moment from 'moment';

const HowLongAgo = ({ date }) => {
    const m = moment.utc(date).fromNow();
    return <span className='HowLongAgo'>{m}</span>;
};

export default HowLongAgo;