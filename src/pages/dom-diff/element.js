// 虚拟DOM
class Element{
    constructor(type, props, children){
        this.type = type
        this.props = props
        this.children = children
    }
}
/**
 * 
 * @param {*} type  标签类型 ul li 
 * @param {*} props 属性 class style value
 * @param {*} children 子节点
 */
function createElements(type,props,children) {
    
    return new Element(type, props, children)
}

function setAttr(node,key,value){
    switch(key){
        case 'value': // node是input类型
            if(node.tagName.toUpperCase()=="INPUT"){
                node.value = value
            }else{
                node.setAttribute(key,value)
            }
            break
        case 'style':
            node.style.cssText = value
        default :
            node.setAttribute(key, value)
        break;
    }
}
// render vnode=>dom
function render(vnode) {
    let el = document.createElement(vnode.type)
    for(let key in vnode.props){
        // 设置属性
        setAttr(el, key, vnode.props[key])
    }
    vnode.children.forEach(child => {
        child = (child instanceof Element) ? render(child):document.createTextNode(child)
        el.appendChild(child)
    });
    return el
}

function renderDom(el,target) {
    target.appendChild(el)
}

module.exports ={
    createElements, render, renderDom, Element
}
