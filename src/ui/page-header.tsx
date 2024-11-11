export function PageHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-between items-center border rounded-md p-4 shadow -mx-2 mb-4'>
            {children}
        </div>
    );
}
export function PageHeaderTitle({ children }: { children: React.ReactNode }) {
    return <h1 className='text-2xl font-bold'>{children}</h1>;
}
export function PageHeaderActions({ children }: { children: React.ReactNode }) {
    return <div className='flex'>{children}</div>;
}
