import VNode from './vnode'
import {render} from './render'
import common from './common'
function diffChildren(oldChildren, newChildren, index, patches) {
    oldChildren.forEach((child, idx) => {
        diffNode(child, newChildren[idx], ++Index, patches)
    })
}
let Index =0 ;// 记录索引值
function diff(oldVNode,vnode){
    let patches ={} //记录全部补丁
    diffNode(oldVNode, vnode, Index, patches)
    return patches
}
function diffNode(oldNode, newNode, index, patches){
    let currentPatch = [] // 每个元素对应的补丁对象
    if (!newNode) {  //新的节点被删除
        currentPatch.push({
            type: 'remove',
            index: index
        })
    } else if (common.isString(oldNode) && common.isString(newNode)) {     // 文本节点

        if (oldNode != newNode) {
            currentPatch.push({
                type: "text",
                text: newNode
            })
        }
    } else if (oldNode.type == newNode.type) { // 类型相同 
        // 比较属性是否有更改
        let attrs = common.diffAttribute(oldNode.props, newNode.props)
        // 有变化
        if (Object.keys(attrs).length) {
            currentPatch.push({
                type: 'attrs',
                attrs
            })
        }
        // 如果有子节点 遍历子节点
        diffChildren(oldNode.children, newNode.children, index, patches)
    } else { // 节点被替换了
        currentPatch.push({
            type: 'replace',
            newNode: newNode
        })
    }
    
    if (currentPatch.length) { // 有补丁
        patches[index] = currentPatch
    }
}


let patchIndex = 0;
let patches 
let element 
function patch(oldVNode,vnode){
    patches = diff(oldVNode,vnode)// 补丁
    element = render(vnode) // 真实的DOM
    patchNode(element) 
    return element
}
function patchNode(element) {
    let currenPatch = patches[patchIndex++]
    let childNodes = element.childNodes
    childNodes.forEach(child => {
        patchNode(child) // 深度遍历
    })
    if (currenPatch){
        doPatch(element,currenPatch)
    }
}

function doPatch(node,patches) {
    patches.forEach(patch=>{
        switch (patch.type){
            case 'attrs':
                for(let key in patch.attrs){
                    let value = patch.attrs[key]
                    value ?common.setAttribute(node,key,value):node.removeAttribute(key)
                }
                break;
            case 'replace':
                let newNode = (patch.newNode instanceof VNode) ? render(patch.newNode) : document.createTextNode(patch.newNode)
                node.parentNode.replaceChild(newNode,node)
                break;
            case 'text':
                node.textContent = patch.text
                break;
            case 'remove':
                node.parentNode.removeChild(node)
                break;
            default:
                break
        }
    })
}
export default patch