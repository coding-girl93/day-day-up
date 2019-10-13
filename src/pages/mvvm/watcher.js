// 观察者：给需要变化的那个元素增加一个观察者，数据变化后执行对应的方法
/**
 * 用新值和老值对比 ，值发生变化，调用更新方法 并通知视图更新
 */
let Dep = require('./dep')

class Watcher{
    constructor(vm,expr,cb){
        this.vm = vm 
        this.expr = expr
        this.cb = cb
        // 获取老的值 并存下来
        this.value = this.get()
    }
    getValue(vm,expr){
        // 获取值 expr : 对象 和简单类型
        expr = expr.split('.')
        let value = expr.reduce((prev, next) => {
            return prev[next]
        }, vm.$data)
        return value
    }
    get(){
        Dep.target = this // 当前实例
        let value = this.getValue(this.vm,this.expr)
        Dep.target = null // 清空当前实例
        return value
    } 
    // 更新
    update(){
        let newValue = this.getValue(this.vm,this.expr)
        let oldValue = this.value

        if(newValue!=oldValue){
            this.cb(newValue,oldValue) // 调用watch的回调callback
        }
    }
}

module.exports = Watcher