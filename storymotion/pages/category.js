import Header from '../components/Header';
import MainLayout from '../components/MainLayout';
import CategoryList from '../components/CategoryList';
import { useRouter } from 'next/router';
import Link from 'next/link';
import api from '../api/';

const Category = (props) => {
    const router = useRouter();
    console.log(router);

    return (
        <MainLayout>
            <h1>Categories</h1>

            <CategoryList categories={props.categories}/>
        </MainLayout>
    );
};

Category.getInitialProps = async function () {
    const skip = 0; 
    const limit = 20;

    const res = await api.getCategories(skip, limit);
    const data = await res.json();
    console.log(data);
    return { categories: data };
};

export default Category;
