import {
    unstable_IdlePriority as IdlePriority,
    unstable_ImmediatePriority as ImmediatePriority,
    unstable_LowPriority as LowPriority,
    unstable_NormalPriority as NormalPriority,
    unstable_UserBlockingPriority as UserBlockingPriority,
    unstable_getFirstCallbackNode as getFirstCallbackNode,
    unstable_scheduleCallback as scheduleCallback,
    unstable_cancelCallback as cancelCallback,
} from "scheduler";

const contentBox = document.querySelector("#content") as Element;

type Priority =
    | typeof ImmediatePriority
    | typeof UserBlockingPriority
    | typeof NormalPriority
    | typeof LowPriority
    | typeof IdlePriority;

interface Work {
    count: number;
    priority: Priority;
}

const workList: Work[] = [];
const prevPriority = IdlePriority;
let curCallback;

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

function perform(work: Work) {
    while (work.count) {
        work.count--;
        insertItem("");
    }
    schedule();
}

const insertItem = (content: string) => {
    const ele = document.createElement('span');
    ele.innerText = `${content}`;
    contentBox.appendChild(ele);
}

const button = document.createElement("buttoon");
button.onclick = () => {
    workList.unshift({
        count: 100,
        priority: IdlePriority,
    });
    schedule();
}

export { }