/**
 * 封装js文件，用于过滤密码中存在的特殊字符
 * （本质上就是一个个函数）
 */
 export function filterPwd(str) {
    const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]");
    let rs = "";
    for (let i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;  // 可以看出，函数返回值为一个字符串
}

export function qaq() {

}