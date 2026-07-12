import Link from 'next/link';

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    if (items.length === 0) return null;

    return (
        <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
                {items.map((item, index) => (
                    <li key={item.href} className="breadcrumb-item">
                        {index === items.length - 1 ? (
                            <span className="breadcrumb-current" aria-current="page">
                                {item.name}
                            </span>
                        ) : (
                            <>
                                <Link href={item.href} className="breadcrumb-link">
                                    {item.name}
                                </Link>
                                <span className="breadcrumb-separator" aria-hidden="true">
                                    /
                                </span>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
