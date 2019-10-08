class MyPromise{
    constructor(excutor){
        try {
            excutor(resolve,reject)
        } catch (error) {
        }
        function excutor (resolve,reject){
            
        }
    }
    then(){
        console.log('then')
    }
}

export default MyPromise