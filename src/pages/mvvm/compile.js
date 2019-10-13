
let Watcher = require('./watcher')

class Compile{
    constructor(el,vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el)  //元素节点 或者 dom
        this.vm = vm 
        //获取到元素之后才开始编译
        if(this.el){ 
            // 1.先把真实的DOM 移入到内存中 fragment
            let fragment = this.nodeToFragment(this.el)
            // 2. 提取想要的元素节点和 v-model 、{{}}...
            this.compile(fragment)
            // 3. 把编译好的fragment 塞回页面
            this.el.appendChild(fragment)
        }
    }
    // 辅助方法 文本 标签等
    isElementNode(node){
        return node.nodeType === 1
    }
    isDirective(name){
        return name.includes('v-')
    }
    // 核心方法
    compileElement(node){
        // v-model
        let attrs = node.attributes
        Array.from(attrs).forEach(attr=>{
            // 判断是不是指令 v- 
            let attrName = attr.name 
            if(this.isDirective(attrName)){
                // 取到对应值 放到节点中
                let expr = attr.value
                let type = attrName.slice(2) // model
                // node this.vm.$data
                CompileUtil[type](node,this.vm,expr)
            }
        })
    }
    compileText(node){
        //{{}}
        let expr = node.textContent
        let  reg = /\{\{([^}]+)\}\}/g
        if (reg.test(expr)){
            CompileUtil.text(node, this.vm, expr)
        }
    }
    nodeToFragment(el){
        // 文档碎片  内存中
        let fragment = document.createDocumentFragment()
        let firstChild 
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment
    }
    compile(fragment){
        let  childNodes = fragment.childNodes
        Array.from(childNodes).forEach(node=>{
            // 元素节点
            if(this.isElementNode(node)){
                // console.log('元素节点',node)
                // 需要编译元素
                this.compileElement(node)
                this.compile(node) // 递归
            }else{
                  // 需要编译文本
                this.compileText(node)
                // console.log("文本节点",node)
            }
        })
    }
}

CompileUtil = {
    getValue(vm,expr){
        // 获取值 expr : 对象 和简单类型
        expr = expr.split('.')
        let value = expr.reduce((prev, next) => {
            return prev[next]
        }, vm.$data)
        return value
    },
    getTextValue(vm,expr){ // 获取编译后的文本结果
        let value = expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            return this.getValue(vm, arguments[1])
        })
        return value
    },
    setValue(vm, expr, value) {
        expr = expr.split('.')
        return expr.reduce((prev, next, currentIndex) => {
            if (currentIndex === expr.length - 1) {
                return prev[next] = value // 取到最后赋值
            }
            return prev[next]

        }, vm.$data)
    },
    text(node,vm,expr){ // 文本处理
        let update = this.update.text
        // vm.$data[expr] 'message'、'message.a'
        // {{message.a}}=>message.a
        let value = this.getTextValue(vm,expr)
        // {{a}} {{b}}
        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], (newValue, oldValue) => {
                // 当值变化后,文本节点需要重新获取依赖的数据更新
                update && update(node, this.getTextValue(vm, expr))
            })
        })
        update && update(node, value)
    },
    model(node, vm, expr){ // 输入框处理
        let update = this.update.model
        // 数据变化了 调用watch的回调   调用watch.update的时候 
        new Watcher(vm,expr,(newValue,oldValue)=>{
            // 当值变化后
            update && update(node, this.getValue(vm, expr))
        })
        // input 事件
        node.addEventListener('input',e=>{
            let newValue = e.target.value
            this.setValue(vm,expr,newValue)
        })
        update && update(node, this.getValue(vm, expr))
    },
    update:{
        text(node,value){
            node.textContent = value
        },
        model(node, value){
            node.value = value
        }
    }
}
module.exports = Compile