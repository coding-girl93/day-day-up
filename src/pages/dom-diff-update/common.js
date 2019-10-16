let common ={
    setAttribute: function (node, key, value){
        switch (key) {
            case 'value': // node是input类型
                if (node.tagName.toUpperCase() == "INPUT") {
                    node.value = value
                } else {
                    node.setAttribute(key, value)
                }
                break
            case 'style':
                node.style.cssText = value
            default:
                node.setAttribute(key, value)
                break;
        }
    },
    diffAttribute: function (oldAttrs,newAttrs) {
        let patch ={}
        for(let key in oldAttrs){
            if(oldAttrs[key] !==newAttrs[key]){
                patch[key] = newAttrs[key] // 更新了 有可能是undefined
            }
        }
        // 新增了属性
        for(let key in newAttrs){
            // 老节点没有属性
            if(!oldAttrs.hasOwnProperty(key)){
                patch[key] = newAttrs[key] 
            }
        }
        return patch
    },

    isString:function (node) {
        return Object.prototype.toString.call(node)==='[object String]'
    }
}

export default common