import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
<link
    rel='stylesheet'
    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css'
/>;
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider';
import { NextAuthProvider } from '@/components/AuthProvider/AuthProvider';
import Toast from '@/components/Toast/Toast';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700', '900'],
    style: ['normal', 'italic'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: 'Hotel TranspileVania',
    description: 'Discover fancy-looking hotels in TranspileVania',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <head>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
                    crossOrigin='anonymous'
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={poppins.className}>
                <NextAuthProvider>
                    <ThemeProvider>
                        <Toast />
                        <main className='font-normal lg:px-5 md:px-3 sm:px-0'>
                            <Header />
                            {children}
                            <Footer />
                        </main>
                    </ThemeProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
