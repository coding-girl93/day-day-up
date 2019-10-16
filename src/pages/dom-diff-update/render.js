import common from './common'
import VNode from './vnode'

/**
 * 
 * @param {*} vnode vdom=>dom
 */
function render(vnode) {
    let el = document.createElement(vnode.type)
    for (let key in vnode.props) {
        // 设置属性
        common.setAttribute(el, key, vnode.props[key])
    }
    vnode.children.forEach(child => {
        child = (child instanceof VNode) ? render(child) : document.createTextNode(child)
        el.appendChild(child)
    });
    vnode.el = el
    return el
}
// 渲染到页面
function renderDom(target,el) {
    target.appendChild(el)
}

export {
    render,renderDom
}