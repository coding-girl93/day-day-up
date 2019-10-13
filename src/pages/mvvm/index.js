// import  Compile  from "./compile"
// import  Observer from './observer'
let Compile = require('./compile')
let Observer = require('./observer')

class MVVM {
    constructor(options){
        this.$el = options.el
        this.$data = options.data
        if(this.$el){
            // 数据劫持
            new Observer(this.$data)
            this.proxyData(this.$data) // 代理数据 可以直接vm.data 获取数据
            // 编译模板
            new Compile(this.$el,this)
            
        }
     
    }
    proxyData(data) {
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                get(){
                    return data[key]
                },
                set(newValue){
                    data[key] = newValue
                }
            })
        })
    }
}
let vm = new MVVM({
    el: "#app",
    data: {
        message: 'hello world',
        student:{
            name:"盐粒儿",
            age:26
        }
    }
})
window.vm = vm
module.exports = MVVM 