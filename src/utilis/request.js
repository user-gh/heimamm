import axios from 'axios'

// 创建一个个新的请求对象
let Request = axios.create({
    // 基地址
    baseURL: process.env.VUE_APP_URL,
    // 携带cookie
    withCredentials: true
})

// 请求拦截,再请求就不用设置token
// 导入 token
import { getToken } from '@/utilis/token'
// axios 拦截器
Request.interceptors.request.use(config => {
    config.headers.token = getToken();
    return config;
},
    err => {
        return err;
    })
export default Request;