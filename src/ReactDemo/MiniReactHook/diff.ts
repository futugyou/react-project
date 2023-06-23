
type Flag = 'Placement' | 'Deletion';
// 虚拟DOM节点
interface Node {
    // 唯一标识，用于在变化前后关联节点
    key: string;
    // node经过Diff标记后的副作用，其中
    // Placement对于新生node，代表对应DOM元素需要插入到页面中，对于已有元素，，代表对应DOM元素需要在页面中移动
    // Deletion代表DOM元素需要从页面中删除
    flag?: Flag;
    // 该node在同级node中的索引位置
    index?: number;
}

type NodeList = Node[];

// 接收更新前后的nodelist，并为他们标记flag
const diff = (before: NodeList, after: NodeList): NodeList => {
    const result: NodeList = [];
    // 1 遍历前准备工作
    // 将before保存在map
    const beforeMap = new Map<string, Node>();
    before.forEach((node, i) => {
        node.index = i;
        beforeMap.set(node.key, node);
    });

    // 2 核心遍历逻辑
    // 遍历到的最后一个可复用的node在before中的index
    let lastPlacedIndex = 0;

    for (let i = 0; i < after.length; i++) {
        const afterNode = after[i];
        afterNode.index = i;
        const beforeNode = beforeMap.get(afterNode.key);

        if (beforeNode) {
            // 存在可复用node
            // 从map删除node
            beforeMap.delete(beforeNode.key);

            const oldIndex = beforeNode.index as number;

            if (oldIndex < lastPlacedIndex) {
                // 移动
                afterNode.flag = 'Placement';
                result.push(afterNode);
            } else {
                // 不移动
                lastPlacedIndex = oldIndex;
            }

        } else {
            // 不存在可复用node，这是一个新node
            afterNode.flag = 'Placement';
            result.push(afterNode);
        }
    }

    // 3 遍历后收尾工作
    beforeMap.forEach(node => {
        node.flag = 'Deletion';
        result.push(node);
    });

    return result;
}
export { }