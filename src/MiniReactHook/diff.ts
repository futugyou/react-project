
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

export { }