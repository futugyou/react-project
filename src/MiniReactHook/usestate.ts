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

let callbackNode: number | undefined = undefined;
let workInProgressHook: Hook | undefined;
let isMount = true;
export { }