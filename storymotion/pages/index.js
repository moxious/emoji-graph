import Header from '../components/Header';
import MainLayout from '../components/MainLayout';

const Index = (props) => {
    return (
        <MainLayout>
            <p>Hello Next.js</p>
            {/* <h1>Batman TV Shows</h1>
            <ul>
              {props.shows.map(show => (
                <li key={show.id}>{show.id}</li>
              ))}
            </ul>             */}
        </MainLayout>
    );
};


// Index.getInitialProps = async function () {
//     const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
//     const data = await res.json();

//     console.log(`Show data fetched. Count: ${data.length}`, data);

//     return {
//         shows: data.map(entry => entry.show)
//     };
// };

export default Index;