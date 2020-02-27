// 这个文件放所有跟登录有关的接口
// 导入axios
import axios from 'axios'

// 准备封装的方法

// 用户登录接口的方法
export function login(data){
    return axios({
        url:process.env.VUE_APP_URL + '/login',
        method:'post',
        data,
         // 允许携带cookie
        withCredentials:true
    });
}