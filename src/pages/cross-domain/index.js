import jsonp from './jsonp'

jsonp('https://thor.weidian.com/community/buyerExperience.read/1.0?param=%7B%22id%22%3A%227813848%22%2C%22cpcNeedCharge%22%3Atrue%2C%22adsk%22%3A%22%22%7D&wdtoken=cf118d4c&_=1571037725737',
    data=>{
       console.log(data)
       
   }
)

var a=0
var b =0
function A(a){
    A = function(b){
        alert(a+b++)
    }
    alert(a++)
}
A(1)
A(2)

function find(o, attr) {
    let attrs = attr.split('.')
    attrs.reduce((accumulator, currentValue) => {
        return accumulator && accumulator[currentValue]
    }, o)
}

function map(arr){
    arr.map((value,index)=>{
        value++
    })
    console.log(arr)
}