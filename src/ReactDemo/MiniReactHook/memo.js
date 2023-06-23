const useMemo = (callback) => {
    const [s, set] = useState();
    useEffect(() => set(callback));
    return s
}