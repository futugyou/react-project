const test = () => {
    const [count, setCount] = useState(0);
    console.log(count());
    setCount(1)
    console.log(count());
}

const test1 = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('count is:', count())
    });
    useEffect(() => {
        console.log('nothing to do')
    });
    setCount(2)
}

const test2 = () => {
    const [name1, setName1] = useState('LiLei');
    const [name2, setName2] = useState('hanmeimei');
    const [showAll, setShowAll] = useState(true);

    const whoishere = useMemo(() => {
        if (!showAll) {
            return name1();
        }
        return name1() + ' and ' + name2()
    });

    useEffect(() => {
        console.log('who is herr: ', whoishere())
    });

    setName1('xiaoming');
    setShowAll(false);

    // no log print
    setName2('xiaohong')

}