// 这个文件放所有跟注册有关的接口
// 导入axios
import axios from 'axios'

// 准备封装的方法

// 获取手机验证码

//  export 把方法暴露出去
// 封装成独立的文件里的函数，好处是以后别人想用，谁都可以导入访问
export function sendSMS(data){
    // 把axios调用后的返回值返回出去了
    // 那么调用者拿到这个返回值，就可以自己写.then,然后想干嘛就干嘛
    return axios({
        url:process.env.VUE_APP_URL + '/sendsms',
        method:'post',
        data, 
        // 允许携带cookie
        withCredentials:true
    });
}