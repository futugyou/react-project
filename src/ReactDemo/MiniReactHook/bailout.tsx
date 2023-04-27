import { useState, useMemo } from 'react';

function Child() {
    console.log("child render");
    return <p>child</p>;
}

export function WithoutBailout() {
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

export function Bailout() {
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