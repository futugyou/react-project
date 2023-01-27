
const contentBox = document.querySelector("#content") as Element;

interface Work {
    count: number;
}
const workList: Work[] = [];

function schedule() {
    // 从队列末尾获取一个work
    const currwork = workList.pop();
    if (currwork) {
        perform(currwork);
    }
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
        count: 100
    });
    schedule();
}

export { }