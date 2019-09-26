// export default {
//     name:'ddd',
//     age:'12'
// }

async function ddd(){
    // await sleep(1000)//
    Promise.resolve(sleep(1000))
    console.log(2)
}
function sleep(time){
    setTimeout(()=>{
        console.log(1)
    },time)
}
function demo(){
    alert(1)
}
module.exports = ddd


