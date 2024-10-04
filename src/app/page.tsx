import { AuthGuard } from '@/features/auth/AuthGuard';
import { AuthSignInButton } from '@/features/auth/AuthSignInButton';
import { UserProfileDropdown } from '@/features/auth/UserProfileDropdown';
import Image from 'next/image';

export default function Home() {
    return (
        <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
            <div className='z-10'>
                <AuthGuard fallback={<AuthSignInButton />}>
                    <UserProfileDropdown />
                </AuthGuard>
            </div>
        </main>
    );
}
