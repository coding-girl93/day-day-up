import {renderDom} from './render'
import createElement from './create-element'
import patch from './patch'

// let createElements = require('./element')
let vdom1 = createElement('ul',{class:'ul'},[
    createElement('li',{class:'li'},['1']),
    createElement('li', { class: 'li' }, ['2']),
    createElement('li', { class: 'li' }, ['3'])
])

let vdom2 = createElement('ul', { class: 'ul-new' }, [
    createElement('li', { class: 'li' }, ['1']),
    createElement('li', { class: 'li' }, ['2']),
    createElement('div', { class: 'li' }, ['t'])
])

// let patches = patch(vdom1,vdom2) 
// let el = render(vdom)

// console.log(node)
// 给元素打补丁 重新更新视图
let el = patch(vdom1, vdom2)
console.log(el)
// 渲染真实DOM
renderDom(document.querySelector('#app'),el)

