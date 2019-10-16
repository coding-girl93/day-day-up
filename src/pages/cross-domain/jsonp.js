
function jsonp(url, callback){
    // let script = document.createElement('script')
    // let callbackName = 'callback',
    //     jsonpName = `jsonp_${(Date.now())}_${Math.random().toString().substr(2)}`

    // window[jsonpName] = function (data) {
    //     callback(data)
    //     document.body.removeChild(script)
    // }  
    // script.src = `${url}&${callbackName}=${jsonpName}`
    // document.body.appendChild(script)
    let jsonpName = `jsonp_${(Date.now())}_${Math.random().toString().substr(2)}`,
        callbackName = 'callback',
        script = document.createElement('script')
    script.type = 'text/javascript';

    // 请求添加来源参数
    script.src = url.indexOf('?') === -1 ? `${url}?${callbackName}=${jsonpName}` : `${url}&${callbackName}=${jsonpName}`
    window[jsonpName] = function (response) {
        try {
            if (typeof callback != 'undefined') {
                callback(response)
            }
        } finally {
            delete window[jsonpName]
            script.parentNode.removeChild(script)
        }
    }
    document.body.appendChild(script);
}
export default jsonp