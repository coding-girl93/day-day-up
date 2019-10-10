function Student(name,age) {
    this.name = name
    this.age = age
}
Student.prototype.sayHello = function(className) {
    console.log('sayHello')
}
var student = new Student('张三',4)

console.log(student)

function objectFactory() {
    let Constructor = [].shift.call(arguments); // 构造函数
    const obj = new Object(); // 创建一个新的对象
    obj.__proto__ = Constructor.prototype; // 修改对象的原型指向
    Constructor.call(obj, ...arguments); // 修改this指向
    return obj; // 返回新对象
}
let o = objectFactory(Student,'name','sss') 
console.log(o)

function objectFactory2() {
    let obj = [].shift.call(arguments)
    let o =  Object.create(obj.prototype)
    obj.call(o, ...arguments)
    return o 
}
let o2 = objectFactory2(Student, 'name', 'sss')
console.log(o2)