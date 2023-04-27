function useEffect(callback) {
    const effect = {
        execute,
        deps: new Set()
    }
    const execute = () => {
        cleanup(effect)
        effectStack.push(effect)
        try {
            callback();
        } finally {
            effectStack.pop();
        }
    }
    execute();
}

function cleanup(effect) {
    for (const subs of effect.deps) {
        subs.delete(effect);
    }
    effect.deps.clear();
}