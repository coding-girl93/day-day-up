function init() {
    let boxes = document.querySelectorAll('.box')
    let start = document.getElementById('start')
    let stop = document.getElementById('stop')
    let flag = false
    start.addEventListener('click',function () {
        flag = false
        requestAnimationFrame(render)
    })
    stop.addEventListener('click',function () {
        flag = true
    })

    let rotate = 0
    let opacity = 0
    function render() {
        if(flag) return
        rotate = rotate+6
        if(opacity>1){
            opacity = 0
        }
        opacity = opacity+0.01
        let command = 'rotate(' +rotate+'deg)'
        boxes.forEach((box,index)=>{
            box.style.transform = command
            box.style.opacity = opacity
        })
        requestAnimationFrame(render)
    }
}
init()