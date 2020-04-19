import Link from 'next/link';
import { Icon } from 'semantic-ui-react';

export default ({ category, children }) => 
    <Link href="/category/[name]" as={`/category/${category}`}>
        <span>
            <Icon name='cube' />
            <a>{children}</a>
        </span>
    </Link>;
