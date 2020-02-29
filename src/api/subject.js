import axios from 'axios'

// 创建一个个新的请求对象
let subjectRequest = axios.create({
    // 基地址
    baseURL: process.env.VUE_APP_URL,
    // 携带cookie
    withCredentials: true
})

// 请求拦截,再请求就不用设置token
// 导入 token
import { getToken } from '@/utilis/token'
// axios 拦截器
subjectRequest.interceptors.request.use(config => {
    config.headers.token = getToken();
    return config;
},
    err => {
        return err;
    })

// 封装一个获取学科列表的接口
export function  subjectList(params){
    return subjectRequest({
        url:'/subject/list',
        method:'get',
        params
    })
}

// 封装一个修改学科状态的接口
export function subjectStatus(data){
    return subjectRequest({
        url:'/subject/status',
        method:'post',
        data
    })
}

// 封装一个增加学科的接口
export function subjectAdd(data){
    return subjectRequest({
        url:'/subject/add',
        method:'post',
        data
    })
}

// 封装一个编辑学科的接口
export function subjectEdit(data){
    return subjectRequest({
        url:'/subject/edit',
        method:'post',
        data
    })
}


// 封装一个删除学科的接口
export function subjectDel(data){
    return subjectRequest({
        url:'/subject/remove',
        method:'post',
        data
    })
}