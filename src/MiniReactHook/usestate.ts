type Action = (key: any) => void;
// “更新”对应的数据结构
interface Update {
    // 更新执行的函数
    action: Action;
    // 与同一个Hook的其他update形成链表
    next?: Update;
}


export { }