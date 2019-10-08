import Promise from './promise'

// console.log(p1)

var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('dddd')
    }, 1000);
   
})

var p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('dddd333')
    }, 1000);

})
p1.finally(()=>{
    console.log(value)
})
// Promise.race([p1,p2]).then(datas=>{
//     console.log(datas)
// }).catch(e=>{
//     console.log(e)
// })