import '@/app/ui/global.css';
import { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { roboto } from '@/app/ui/fonts';
import theme from '@/app/theme';

export const metadata: Metadata = {
    title: {
        template: '%s | Volley manager',
        default: 'Volley manager',
    },
    description:
        'The official Next.js Course Dashboard, built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${roboto.className} antialiased`}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
