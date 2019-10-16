
// 创建虚拟DOM
class VNode{
    constructor(type,props,children){
        this.type = type // 标签类型
        this.props = props // 标签属性
        this.children = children // 子节点
    }
}

export default VNode