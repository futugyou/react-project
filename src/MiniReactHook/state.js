const effectStack = [];

function useState(value) {
    const subs = new Set()
    const getter = () => {
        const effect = effectStack[effectStack.length - 1]
        if (effect) {
            subscribe(effect, subs)
        }
        return value;
    }
    const setter = (newValue) => {
        value = newValue;
        for (const effect of [...subs]) {
            effect.execute();
        }
    }
    return [getter, setter]
}

function subscribe(effect, subs) {
    subs.add(effect)
    effect.deps.add(subs)
}
