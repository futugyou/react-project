function test() {
    const [count, setCount] = useState(0);
    console.log(count());
    setCount(1)
    console.log(count());
}