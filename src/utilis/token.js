// 定义一个常量
const TOKENKEY = 'mmtoken';

// 获取 token，记得return
export function getToken(){
    return window.localStorage.getItem(TOKENKEY);
}

// 设置 token，或是保存token。他有一个参数接收token值
export function setToken(token){
    window.localStorage.setItem(TOKENKEY,token);
}

// 删除token
export function ronoveToken(){
    window.localStorage.removeItem(TOKENKEY);
}