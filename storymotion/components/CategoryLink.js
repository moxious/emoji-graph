import Link from 'next/link';
import { Icon } from 'semantic-ui-react';

export default ({ category, children }) => 
    <Link href="/category/[name]" as={`/category/${category}`}>
        <div>
            <Icon name='cube' />
            <a>{children}</a>
        </div>
    </Link>;
