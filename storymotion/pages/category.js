import MainLayout from '../components/MainLayout';
import CategoryList from '../components/CategoryList';
import { useRouter } from 'next/router';
import { Header } from 'semantic-ui-react';

const Category = (props) => {
    const router = useRouter();
    console.log(router);

    return (
        <MainLayout>
            <Header size='huge'>Categories</Header>

            <CategoryList />
        </MainLayout>
    );
};

export default Category;
