// 发布订阅
class Dep{
    constructor(){
        this.subs =[] // 订阅的数组
    }
    //添加
    addSub(watcher){
        this.subs.push(watcher)
    }
    // 通知
    notify(){
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
}
module.exports = Dep