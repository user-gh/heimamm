// 所有首页接口请求的方法
// 导入axios
import axios from 'axios';

// 导入操作token的文件
import { getToken } from '@/utilis/token.js'
 
// 获取当前的用户信息
export function info(){
    return axios({
        url:process.env.VUE_APP_URL + '/info',
        method:'get',
        // 请求头放入token
        headers:{
            token:getToken()
        }
    })
}


// 请求退出按钮的接口
export function logout(){
    return axios({
        url:process.env.VUE_APP_URL + '/logout',
        method:'get',
        // 请求头放入token
        headers:{
            token:getToken()
        }
    })
}