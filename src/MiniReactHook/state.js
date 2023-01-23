function useState(value) {
    const getter = () => value;
    const setter = (newValue) => value = newValue;
    return [getter, setter]
}

function DoStateTest() {
    const [count, setCount] = useState(0);
    console.log(count());
    setCount(1)
    console.log(count());
}