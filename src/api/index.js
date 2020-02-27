// 所有首页接口请求的方法
// 导入axios
import axios from 'axios';

// 导入操作token的文件
import { getToken } from '@/utilis/token.js'
 
// 克隆一个axios对象出来,
// 它的名字是indexRequest ，并设置它的初始基因
// 所以以后，如果要是通过indexRequest这个对象发请求,就会自动有基地址和自动携带token了
let indexRequest = axios.create({
    // 基地址
    baseURL:process.env.VUE_APP_URL,
    headers:{
        token:getToken()
    }
})

// 获取当前的用户信息
export function info(){
    // return axios({
    //     url:process.env.VUE_APP_URL + '/info',
    //     method:'get',
    //     // 请求头放入token
    //     headers:{
    //         token:getToken()
    //     }
    // })
    return indexRequest({
        url:'/info',
        method:'get'
    })
}


// 请求退出按钮的接口
export function logout(){
    // return axios({
    //     url:process.env.VUE_APP_URL + '/logout',
    //     method:'get',
    //     // 请求头放入token
    //     headers:{
    //         token:getToken()
    //     }
    // })
    return indexRequest({
        url:'/logout',
        method:'get'
    })
}