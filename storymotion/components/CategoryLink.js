import Link from 'next/link';
import { Icon } from 'semantic-ui-react';

export default ({ category, children }) => 
    <Link href="/category/[name]" as={`/category/${category}`}>
        <a>{children}</a>
    </Link>;
