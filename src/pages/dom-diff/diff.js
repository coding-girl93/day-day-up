/**
 * 
 * @param {*} oldTree 
 * @param {*} newTree 
 * 1.当节点类型相同时候
 */
let Index = 0 // 全局的
function diff(oldTree,newTree) {
    let patchs ={}
    // 递归树，比较后把结果放到补丁包中
    walk(oldTree, newTree, Index,patchs)
    return patchs
}
function diffAttr(oldAttrs,newAttrs) {
    let patch ={}
    for(let key in oldAttrs){
        if(oldAttrs[key] !==newAttrs[key]){
            patch[key] = newAttrs[key] // 更新了 有可能是undefined
        }
    }
    // 新增了属性
    for(let key in newAttrs){
        // 老节点没有属性
        if(!oldAttrs.hasOwnProperty(key)){
            patch[key] = newAttrs[key] 
        }
    }
    return patch
}
function diffChildren(oldChildren, newChildren, index, patchs) {
    oldChildren.forEach((child,idx) => {
        walk(child, newChildren[idx], ++Index,patchs)
    });
}
function  isString(node) {
    return Object.prototype.toString.call(node)==='[object String]'
}

function walk(oldNode, newNode, index, patchs) {
  
    let currentPatch =[] // 每个元素对应的补丁对象
   
    if (!newNode) {  //新的节点被删除
        currentPatch.push({
            type:'remove',
            index:index
        })
    } else if (isString(oldNode) && isString(newNode)) {     // 文本节点

        if (oldNode != newNode) {
            currentPatch.push({
                type:"text",
                text:newNode
            })
        }
    } else if (oldNode.type == newNode.type){ // 类型相同 
        // 比较属性是否有更改
        let attrs = diffAttr(oldNode.props,newNode.props)
        // 有变化
        if(Object.keys(attrs).length){
            currentPatch.push({
                type:'attrs',
                attrs
            })
        }
        // 如果有子节点 遍历子节点
        diffChildren(oldNode.children, newNode.children, Index, patchs)
    }else{ // 节点被替换了
        currentPatch.push({
            type: 'replace',
            newNode: newNode
        })
    }
    
    if(currentPatch.length){ // 有补丁
        patchs[index] = currentPatch
    }
}

export default diff