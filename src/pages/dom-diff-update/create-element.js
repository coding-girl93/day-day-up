import VNode from './vnode'

// 创建虚拟DOM 
function createElement(type,props,children){
    return new VNode(type,props,children)
}

export default createElement