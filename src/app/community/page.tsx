'use client';

export default function CommunityPage() {
    return (
        <main className='flex flex-col gap-8'>
            {/* Coming soon text */}
            <div className='mx-auto p-4 w-full flex flex-col'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>Community</h1>
                </div>
                <div>
                    <p className='text-lg'>
                        The community board is coming soon. Stay tuned!
                    </p>
                </div>
            </div>
        </main>
    );
}
