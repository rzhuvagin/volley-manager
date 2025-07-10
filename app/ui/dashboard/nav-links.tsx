// 'use client';

// import clsx from 'clsx';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { JSX, ReactNode } from 'react';
// import StarIcon from '@mui/icons-material/Star';

// interface LinkItem {
//     name: string;
//     href: string;
//     icon: ReactNode;
// }

// // Map of links to display in the side navigation.
// // Depending on the size of the application, this would be stored in a database.
// export const links: LinkItem[] = [
//     { name: 'Home', href: '/dashboard', icon: <StarIcon /> },
//     {
//         name: 'Invoices',
//         href: '/dashboard/invoices',
//         icon: <StarIcon />,
//     },
//     { name: 'Customers', href: '/dashboard/customers', icon: <StarIcon /> },
// ];

// export default function NavLinks() {
//     const pathname = usePathname();
//     return (
//         <>
//             {links.map((link) => {
//                 const LinkIcon = link.icon;
//                 return (
//                     <Link
//                         key={link.name}
//                         href={link.href}
//                         className={clsx(
//                             'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
//                             {
//                                 'bg-sky-100 text-blue-600':
//                                     pathname === link.href,
//                             }
//                         )}
//                     >
//                         <LinkIcon className="w-6" />
//                         <p className="hidden md:block">{link.name}</p>
//                     </Link>
//                 );
//             })}
//         </>
//     );
// }
