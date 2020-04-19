import Link from 'next/link';

export default ({ emoji, children }) => 
    <Link href="/emoji/[name]" as={`/emoji/${emoji}`}>
        <a>{children}</a>
    </Link>;
