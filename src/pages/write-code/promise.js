
/**
 * 知识点：异步编程、解决方案、事件循环机制（Event Loop）、js单线程、浏览器的执行
 * 1、callback 地狱式回调
 * 2、事件发布订阅模式
 * 3、Deferred延迟函数
 * 4、Promise
 * 5、Genarate
 * 6、asncy await
 */


const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
    constructor(executor) {
        // executor 必须是函数
        if (typeof executor !== 'function') {
            throw new TypeError('executor 不是函数')
        }

        this.value = '' //成功的值
        this.reason = ''  //失败原因
        this.state = PENDING // 默认pending状态

        this.onFulfilledCallbacks = [] // 收集成功状态的回调
        this.onRejectedCallbacks =[] // 收集失败状态的回调

        const resolve = (value) =>{ // 注意this指向问题
            // 成功后的操作，(转态更改，回调执行)

            if(this.state ==PENDING){

                setTimeout(() => {
                    this.state = FULFILLED
                    this.value = value
                    this.onFulfilledCallbacks.forEach(fn => {
                        fn(this.value)
                    })
                }, 0);
               
            }  
        }

        const reject = (reason) =>{
            if(this.state ==PENDING){
                setTimeout(() => {
                    this.state = REJECTED
                    this.reason = reason
                    this.onRejectedCallbacks.forEach(fn => {
                        fn(this.reason)
                    })
                }, 0); 
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }

    }

    then(onFulfilled, onRejected) {
        // TODO 传参错误的处理

        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value 
        onRejected = typeof onRejected === "function" ? onRejected : error => { throw error } 

        let promise = new Promise((resolve,reject)=>{
            if (this.state == FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            if (this.state == REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        resolvePromise(promise, x, resolve, reject)  
                    } catch (error) {
                        reject(error)
                    }
                    
                }, 0);
            }

            if (this.state == PENDING) {

                this.onFulfilledCallbacks.push(value => {
                    try {
                        let x = onFulfilled(value);
                        resolvePromise(promise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
                this.onRejectedCallbacks.push(reason => {
                    try {
                        let x = onRejected(reason);
                        resolvePromise(promise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            }
        })

        return promise
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }
   
    static all(promises){
       
        let promise = new Promise((resolve,reject)=>{
            let count = 0
            let result = []
            promises.forEach((p,index) => {
                p.then(value=>{
                    result[index] = value
                    if(++count == promises.length){
                        resolve(result)
                    }
                },err=>{
                    reject(err)
                })
            })
        })
        return promise
    }
    static race(promises){
        let promise = new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                p.then(value => {
                    resolve(value)
                }, err => {
                    reject(err)
                })
            })
        })
        return promise
    }
    static resolve(value){
        let promise = new Promise((resolve,reject)=>{
            resolve(value)
        })
        return promise
    }
    static reject(error){
        let promise = new Promise((resolve, reject) => {
            reject(error)
        })
        return promise
    }

}

function resolvePromise(promise,x,resolve,reject){
    // 避免循环引用
    if(promise === x){
        return reject(new TypeError('如果 promise 和 x 指向同一对象 ，以 TypeError 为据因拒绝执行 promise ;Chaining cycle detected for promise'))
    }
    // x 是对象或者函数 
    let called = false // 避免重复调用
    // x是 promise对象
    if(x instanceof Promise){
        if(x.state ===PENDING){
            x.then(y=>{
                resolvePromise(promise,y,resolve,reject)
            },err=>{
                reject(err)
            })
        }else{
            x.then(resolve,reject)
        }
    }else if(x !==null &&(typeof x ==='object' || typeof x ==='function')){
        //如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x,y=>{
                    if (called) return
                    called = true
                    resolvePromise(promise,y,resolve,reject)
                },err=>{
                    if (called) return
                    called = true
                    reject(err)
                })
            } else {
              
                resolve(x)
            }
        } catch (error) {
              if (called) return
                called = true
            reject(error)
        }
        
    }else{
        //如果 x 不为对象或者函数，以 x 为参数执行 promise
        resolve(x)
    }


}

module.exports = Promise
