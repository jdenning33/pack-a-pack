'use client';
import localFont from 'next/font/local';
import './globals.css';
import Link from 'next/link';
import { UserProfileDropdown } from '@/features/auth/components/UserProfileDropdown';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { AuthSignInButton } from '@/features/auth/components/AuthSignInButton';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useMemo } from 'react';
import { AuthProvider } from '@/features/auth/components/AuthProvider';
import { Toaster } from '@/ui/sonner';
import { AppMutationsProvider } from '@/features/app-mutations/AppMutationsProvider';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

const metadata = {
    title: 'PackaPack.co',
    description: 'A backpacking gear list app.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = useMemo(() => new QueryClient(), []);

    return (
        <html lang='en'>
            <head>
                <title>{metadata.title}</title>
                <meta name='description' content={metadata.description} />
                <link rel='icon' href='/favicon.ico' />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <AppMutationsProvider>
                            <div className='min-h-screen flex flex-col'>
                                <AppHeader />
                                <main className='max-w-7xl flex-grow container mx-auto px-4 sm:px-6 py-8'>
                                    {children}
                                    <Toaster />
                                </main>
                                <AppFooter />
                            </div>
                        </AppMutationsProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}

function AppHeader() {
    return (
        <header className='border-b sticky top-0 bg-background z-30'>
            <div className='m-auto px-4 sm:px-6 h-14 flex gap-6 items-center max-w-7xl'>
                <div className='flex-1'>
                    <Link className='flex items-center' href='/'>
                        <BackpackSvg className='h-6 w-6' />
                        <span className='ml-2 text-2xl font-bold'>
                            packapack.co
                        </span>
                    </Link>
                </div>
                <nav className='ml-auto hidden sm:flex items-center gap-4 sm:gap-6'>
                    <Link
                        className='text-sm font-medium hover:underline underline-offset-4'
                        href='/packs'
                    >
                        Packs
                    </Link>
                    <Link
                        className='text-sm font-medium hover:underline underline-offset-4'
                        href='/gear'
                    >
                        Gear
                    </Link>
                    <Link
                        className='text-sm font-medium hover:underline underline-offset-4'
                        href='/community'
                    >
                        Community
                    </Link>
                </nav>{' '}
                <AuthGuard fallback={<AuthSignInButton />}>
                    <UserProfileDropdown />
                </AuthGuard>
            </div>
        </header>
    );
}

function AppFooter() {
    return (
        <footer className='bg-gray-100'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500'>
                © 2024 packapack.co. All rights reserved.
            </div>
        </footer>
    );
}

function BackpackSvg({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox='0 0 24 24'
            id='Line'
            xmlns='http://www.w3.org/2000/svg'
            fill='#000000'
        >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
                id='SVGRepo_tracerCarrier'
                strokeLinecap='round'
                strokeLinejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
                <path
                    id='primary'
                    d='M19,9V20a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V9'
                    style={{
                        fill: 'none',
                        stroke: '#000000',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '2px',
                    }}
                ></path>
                <path
                    id='primary-2'
                    data-name='primary'
                    d='M19,19h1a1,1,0,0,0,1-1V15H19ZM5,15H3v3a1,1,0,0,0,1,1H5ZM20,7V4a1,1,0,0,0-1-1H5A1,1,0,0,0,4,4V7A2,2,0,0,0,6,9H18A2,2,0,0,0,20,7ZM15,8v2M9,8v2m6,11H9V16a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1Z'
                    style={{
                        fill: 'none',
                        stroke: '#000000',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '2px',
                    }}
                ></path>
            </g>
        </svg>
    );
}
