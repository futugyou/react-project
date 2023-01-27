import {
    unstable_IdlePriority as IdlePriority,
    unstable_ImmediatePriority as ImmediatePriority,
    unstable_LowPriority as LowPriority,
    unstable_NormalPriority as NormalPriority,
    unstable_UserBlockingPriority as UserBlockingPriority,
    unstable_getFirstCallbackNode as getFirstCallbackNode,
    unstable_scheduleCallback as scheduleCallback,
    unstable_cancelCallback as cancelCallback,
    unstable_shouldYield as shouldYield,
    CallbackNode,
} from "scheduler";

const root = document.querySelector("#root") as Element;
const contentBox = document.querySelector("#content") as Element;

type Priority =
    | typeof ImmediatePriority
    | typeof UserBlockingPriority
    | typeof NormalPriority
    | typeof LowPriority
    | typeof IdlePriority;

const priority2UseList: Priority[] = [
    ImmediatePriority,
    UserBlockingPriority,
    NormalPriority,
    LowPriority,
]

const priority2Name = [
    "noop",
    "ImmediatePriority",
    "UserBlockingPriority",
    "NormalPriority",
    "LowPriority",
    "IdlePriority",
]

priority2UseList.forEach((priority) => {
    const button = document.createElement("buttoon");
    root.appendChild(button);
    button.innerText = priority2Name[priority];
    button.onclick = () => {
        workList.unshift({
            count: 100,
            priority,
        });
        schedule();
    };
});

interface Work {
    count: number;
    priority: Priority;
}

const workList: Work[] = [];
let prevPriority = IdlePriority;
let curCallback: CallbackNode | null;

function schedule() {
    // // 从队列末尾获取一个work
    // const currwork = workList.pop();

    // 尝试获取当前调度的callback
    const cbNode = getFirstCallbackNode();

    // 获取优先级最高的work
    const sortedWorkList = workList.sort((w1, w2) => {
        return w1.priority - w2.priority;
    });

    const currwork = sortedWorkList[0];

    // 没有要调度的work，return
    if (!currwork) {
        curCallback = null;
        cbNode && cancelCallback(cbNode);
        return
    }

    // 获取currwork的优先级
    const { priority: curPriority } = currwork;
    // 如果和上次优先级相同，return
    if (curPriority == prevPriority) {
        return
    }

    // 如果有其他工作在进行，中断它
    cbNode && cancelCallback(cbNode);

    // 调度当前优先级最高的work
    curCallback = scheduleCallback(curPriority, perform.bind(null, currwork));
}

function perform(work: Work, didTimeout?: boolean): any {
    // 是否需要同步执行,
    // shouldYield()=== true，表示发生了中断，有两种情况，1工作太多，总耗时超过5ms. 2单次运行时间太长
    // 代码模拟了第二种情况
    // needSync === true，2个原因，1同步优先级，类比‘React的同步更新’。 2 本次调度过期（解决饥饿问题）
    const needSync = work.priority === ImmediatePriority || didTimeout;
    while ((needSync || !shouldYield()) && work.count) {
        work.count--;
        insertItem("");
    }

    // 更新优先级
    prevPriority = work.priority;

    if (!work.count) {
        // 移除完成的work
        const workIndex = workList.indexOf(work);
        workList.splice(workIndex, 1)
        // 重置优先级
        prevPriority = IdlePriority;
    }

    const prevCallback = curCallback;
    schedule();
    // 如果callback发生变化，说明是新work
    const newCallback = curCallback;
    // 同一个work，Time Slice用尽，返回perform.bind继续给scheduler调用
    if (newCallback && newCallback == prevCallback) {
        return perform.bind(null, work);
    }

}

const insertItem = (content: string) => {
    const ele = document.createElement('span');
    ele.innerText = `${content}`;
    doSomeBuzyWork(10000000);
    contentBox.appendChild(ele);
}

// mock long time work
const doSomeBuzyWork = (len: number) => {
    let result = 0;
    while (len--) {
        result += len;
    }
}


export { }