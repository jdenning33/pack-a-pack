'use client';
import { UploadGearButton } from './UploadGearButton';

export default function AdminPage() {
    return (
        <main className='flex flex-col gap-8 container m-auto'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <UploadGearButton />
            </div>
        </main>
    );
}
