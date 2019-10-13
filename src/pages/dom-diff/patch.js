import{render,Element}  from './element'

let allPatches 
let index =0 
function patch(node,patches) {
    console.log(node)
    allPatches = patches
    walk(node)
}

function walk(node) {
    let currenPatch = allPatches[index++]
    let childNodes = node.childNodes
    childNodes.forEach(child => {
        walk(child) // 深度遍历
    })
    if (currenPatch){
        doPatch(node,currenPatch)
    }
}
function setAttr(node, key, value) {
    switch (key) {
        case 'value': // node是input类型
            if (node.tagName.toUpperCase() == "INPUT") {
                node.value = value
            } else {
                node.setAttribute(key, value)
            }
            break
        case 'style':
            node.style.cssText = value
        default:
            node.setAttribute(key, value)
            break;
    }
}
function doPatch(node,patches) {
    patches.forEach(patch=>{
        switch (patch.type){
            case 'attrs':
                for(let key in patch.attrs){
                    let value = patch.attrs[key]
                    value ?setAttr(node,key,value):node.removeAttribute(key)
                }
                break;
            case 'replace':
                let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode)
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