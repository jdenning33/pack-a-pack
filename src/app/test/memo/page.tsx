'use client';
import React, { createContext, useContext, useState } from 'react';
import { useMemo } from 'react';

export default function PacksPage() {
    return (
        <main className='flex flex-col gap-8 container m-auto'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>Testing Memo</h1>
                </div>
                <ParentComponent />
            </div>
        </main>
    );
}

function Memo({
    dependencies,
    children,
}: {
    dependencies: unknown[];
    children: React.ReactNode;
}) {
    return useMemo(() => {
        return children;
    }, [...dependencies]);
}

const MyContext = createContext({
    value1: 0,
    value2: 0,
    setValue1: (_v: number) => {},
    setValue2: (_v: number) => {},
});

function ParentComponent() {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

    return (
        <MyContext.Provider value={{ value1, value2, setValue1, setValue2 }}>
            <ChildComponent1 />
            <ChildComponent2 />
        </MyContext.Provider>
    );
}

function ChildComponent1() {
    const { value1, setValue1 } = useContext(MyContext);
    console.log('rendered child 1');
    return (
        <Memo dependencies={[value1]}>
            <div onClick={() => setValue1(value1 + 1)}>
                {value1}
                <ThirdComponent />
            </div>
        </Memo>
    );
}

function ChildComponent2() {
    const { value2, setValue2 } = useContext(MyContext);
    console.log('rendered child 2');
    return <div onClick={() => setValue2(value2 + 1)}>{value2}</div>;
}

function ThirdComponent() {
    console.log('rendered third component');
    return <div>Third Component</div>;
}
