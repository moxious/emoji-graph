import MainLayout from '../components/MainLayout';
import CategoryList from '../components/CategoryList';
import { useRouter } from 'next/router';

const Category = (props) => {
    const router = useRouter();
    console.log(router);

    return (
        <MainLayout>
            <h1>Categories</h1>

            <CategoryList />
        </MainLayout>
    );
};

export default Category;
