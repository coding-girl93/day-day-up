
function Student() {
    
}
Student.prototype.say=function () {
    
}
var o1 = new Student()
console.log(o1)
var o = create(o1)
o.name= 'dd'
console.log(o)
console.log(o instanceof Student)



function  create(object) {
    var F = new Function()
    F.prototype = object
    var f = new F()
    return f
}