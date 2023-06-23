import { useState, useMemo } from 'react';

const Child = () => {
    console.log("child render");
    return <p>child</p>;
}

export const WithoutBailout = () => {
    const [num, updateNum] = useState(0);
    const onClock = () => {
        updateNum(num + 1);
    };
    return (
        <div onClick={onClock}>
            <Child />
        </div>
    );
}

export const Bailout = () => {
    const [num, updateNum] = useState(0);
    const onClock = () => {
        updateNum(num + 1);
    };
    const child = useMemo(() => <Child />, []);
    return (
        <div onClick={onClock}>
            {child}
        </div>
    );
}