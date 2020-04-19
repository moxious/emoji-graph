import Link from 'next/link';
import { Icon, List, Pagination } from 'semantic-ui-react'
import CategoryLink from './CategoryLink';

const CategoryList = ({ categories }) => (
    <div className='CategoryList'>
        {/* <Pagination
            defaultActivePage={5}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={3}
        /> */}
        <List className='CategoryList'>
            {
                categories.map((c, i) =>
                    <List.Item key={i}>
                        <List.Content>
                            <CategoryLink category={c}>{c}</CategoryLink>
                        </List.Content>
                    </List.Item>)
            }
        </List>
    </div>
);

export default CategoryList;