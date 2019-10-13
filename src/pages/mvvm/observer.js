let Dep = require('./dep')

class Observer{
    constructor(data){
        this.observer(data)
    }
    observer(data){ // data 数据转成get set形式
        // 判断
        if(!data || typeof data !== 'object'){
            return
        }
        // 将数据劫持
        Object.keys(data).forEach(key=>{
            // 劫持
            this.defineReactive(data,key,data[key])
            // 深度递归
            this.observer(data[key])
        })
    }
    // 定义响应式
    defineReactive(obj,key,value){
        // obj[key] = value
        let dep = new Dep() // 每个变化的数据都会对应一个数组，存放所有更新的操作
        let self = this
        Object.defineProperty(obj, key,{
            enumerable:true,
            configurable:true,
            get(){ // 获取
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue){ // 设置
                if(newValue !=value){
                    // 如果是对象继续劫持,如果用户之间修改了属性 this.$data.message= {a:'1'} 此时如果没有劫持 将不会监听
                    self.observer(newValue) // 注意this指向
                    value = newValue
                    dep.notify() // 通知更新
                }
            }
        })
    }
}

module.exports = Observer