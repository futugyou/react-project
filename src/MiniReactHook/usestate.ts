type Action = (key: any) => void;
// “更新”对应的数据结构
interface Update {
    // 更新执行的函数
    action: Action;
    // 与同一个Hook的其他update形成链表
    next?: Update;
}

// update queue 单向环状链表
interface Queue {
    pending?: Update;
}

//
interface Hook {
    // 保存update的queue，即dispatchSetState接收的queue
    queue: Queue;
    // 保存hook对应的state
    memoizedState: any;
    // 与下一个hook连接形成单向无环链表
    next?: Hook;
}

interface Fiber {
    // 保存该FC对应的的Hooks链表
    memoizedState?: Hook;
    // 指向APP对象
    stateNode: () => { click: () => void };
}

// 调度timeout对应的ID
let callbackNode: number | undefined = undefined;
// 正在执行Hook
let workInProgressHook: Hook | undefined;
let isMount = true;

function APPP() {
    const [num, updateNum] = useState(0);
    console.log(`${isMount ? 'mount' : 'update'} num: `, num);

    return {
        click() {
            updateNum(num => num + 1);
        }
    }
}

const fiber: Fiber = {
    memoizedState: undefined,
    stateNode: APPP,
}

function schedule() {
    if (callbackNode) {
        // 如果存在其他调度，取消他
        clearTimeout(callbackNode);
    }
    // 开始调度
    callbackNode = setTimeout(() => {
        // 更新前将workInProgressHook重置为fiber保存的第一个hook
        workInProgressHook = fiber.memoizedState;
        // 触发组件
        window.app = fiber.stateNode();
        // 首次render为mount，以后为update
        isMount = false;
    });
}

function dispatchSetState(queue: Queue, action: Action) {
    // 1 创建update
    const update: Update = {
        action,
        next: undefined,
    };

    // 2 将update的实例保存在queue.pending构造的环状链表中
    if (!queue.pending) {
        update.next = update;
    } else {
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update;

    // 3. 开始调度更新
    schedule();
}

function useState(initialState: any) {
    // 当前useState使用的hook会被赋值给该变量
    let hook;
    if (isMount) {
        // mount时，创建新的hook
        hook = {
            queue: {
                pending: undefined,
            },
            memoizedState: initialState,
            next: undefined,
        };
        // 将hook插入fiber.memoizedState链表末尾
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook;
        } else {
            (workInProgressHook as Hook).next = hook;
        }
        // workInProgressHook指向hook
        workInProgressHook = hook;
    } else {
        // update时，从workInProgressHook取出该useState对应的hook
        hook = workInProgressHook;
        // workInProgressHook继续指向下一个hook
        workInProgressHook = (workInProgressHook as Hook).next;
    }

    if (!hook) {
        throw new Error("目标hook不存在");
    }

    // update施行前的初始state
    let baseState = hook.memoizedState;

    if (hook.queue.pending) {
        // update换装链表的第一个update
        let firstUpdate = hook.queue.pending.next as Update;

        do {
            const action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next as Update;
        } while (firstUpdate != hook.queue.pending.next);

        // 清空queue.pending
        hook.queue.pending = undefined;
    }
    // 将update action执行完后的state作为memoizedState
    hook.memoizedState = baseState;

    return [baseState, dispatchSetState.bind(null, hook.queue)];
}

export { }