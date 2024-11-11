export function ButtonGroup({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex [&>:not(:first-child)]:rounded-l-none [&>:not(:last-child)]:rounded-r-none'>
            {children}
        </div>
    );
}
