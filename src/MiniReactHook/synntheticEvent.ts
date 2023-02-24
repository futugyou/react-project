
// class SyntheticEvent {
//     constructor(e: any) {
//         // 保存原生事件对象
//         this.nativeEvent = e;
//     }
//     stopPropagation() {
//         this._stopPropagation = true;
//         if (this.nativeEvent.stopPropagation) {
//             // 调用原生事件对象的stopPropagation方法
//             this.nativeEvent.stopPropagation();
//         }
//     }
// }

// // 对于可冒泡的事件，事件传播机制的实现步骤如下：5个
// // 1. 在根元素绑定事件类型对应的事件回调，所有子孙元素触发该事件最终都会委托给根元素的事件回调处理
// const addEvent = (container: { addEventListener: (arg0: any, arg1: (e: any) => void) => void; }, type: string) => {
//     container.addEventListener(type, (e: any) => {
//         // dispatchEvent是需要实现的根元素事件回调
//         dispatchEvent(e, type.toUpperCase(), container);
//     })
// };

// const dispatchEvent = (e: { target: any; }, type: string, container: any) => {
//     //包装合成事件
//     const se = new SyntheticEvent(e);
//     const ele = e.target;

//     // 2. 寻找触发事件的DOM元素，找到其对应的fiberNode
//     let fiber;
//     for (let prop in ele) {
//         if (prop.toLowerCase().includes("fiber")) {
//             fiber = ele[prop];
//         }
//     }

//     // 3. 收集从当前fiberNode到HostRootNode之间所有注册的该事件的回调函数
//     const paths = collectPaths(type, fiber);

//     // 4. 反向遍历并执行一遍收集的所有回调函数（模拟捕获阶段的实现）
//     triggerEventFlow(paths, type + "CAPTURE", se);

//     // 5. 正向遍历并执行一遍收集的所有回调函数（模拟捕冒泡段的实现）
//     if (!se._stopPropagation) {
//         triggerEventFlow(paths.reverse(), type, se);
//     }
// };

// const collectPaths = (type: string, begin: { tag: any; return?: any; memoizedProps?: any; }) => {
//     const paths = [];
//     // 如果不是HostRootFiber，则一直向上遍历
//     while (begin.tag !== 3) {
//         const { memoizedProps, tag } = begin;
//         // 5代表DOM元素对应的fiberNode
//         if (tag === 5) {
//             // 构造形如“ONXXXX”形式的事件回调名
//             const eventName = ("on" + type).toUpperCase();
//             // 如果包含对应的事件回调，则保存在paths中
//             if (memoizedProps && Object.keys(memoizedProps).includes(eventName)) {
//                 const pathNode = {};
//                 pathNode[type.toUpperCase()] = memoizedProps[eventName];
//                 paths.push(pathNode);
//             }
//         }
//         begin = begin.return;
//     }
//     return paths;
// };

// const triggerEventFlow = (paths, type: string, se: SyntheticEvent) => {
//     // 从后向前遍历
//     for (let i = paths.lenght; i--;) {
//         const pathNode = paths[i];
//         const callback = pathNode[type];

//         // 如果存在callback，则传入合成事件，执行
//         if (callback) {
//             callback.call(null, se);
//         }
//         // 如果执行了stopPropagation，则取消接下来的遍历
//         if (se._stopPropagation) {
//             break;
//         }
//     }
// };

export { }