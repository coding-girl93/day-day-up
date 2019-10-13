import { createElements, render, renderDom} from './element'
// let createElements = require('./element')
import diff from './diff'
import patch from './patch';
let vdom = createElements('ul',{class:'ul'},[
    createElements('li',{class:'li'},['1']),
    createElements('li', { class: 'li' }, ['2']),
    createElements('li', { class: 'li' }, ['3'])
])

let vdom2 = createElements('ul', { class: 'ul-new' }, [
    createElements('li', { class: 'li' }, ['1']),
    createElements('li', { class: 'li' }, ['2']),
    createElements('div', { class: 'li' }, ['t'])
])

let patches = diff(vdom,vdom2) 
let el = render(vdom)

console.log(node)
// 给元素打补丁 重新更新视图
patch(el,patches)

// 渲染真实DOM
renderDom(el,document.querySelector('#app'))

// DOM diff 比较两个虚拟DOM的区别 两个对象的区别
/**
 * 作用：根据两个虚拟对象 创建出补丁patch对象，用来更新
 */