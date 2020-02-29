import Request  from '@/utilis/request.js'

// 封装一个获取用户列表的方法
export function userList(params){

    return Request({
        url:'/user/list',
        method:'get',
        params
    })
}

// 封装一个后台创建用户的方法
export function userAdd(data){
    return Request({
        url:'/user/add',
        method:'post',
        data
    })
}

// 封装一个设置用户状态的方法
export function userStatus(data){
    return Request({
        url:'/user/status',
        method:'post',
        data
    })
}

// 封装一个删除用户的方法
export function userDel(data){
    return Request({
        url:'/user/remove',
        method:'post',
        data
    })
}

// 封装一个编辑用户的方法
export function userEdit(data){
    return Request({
        url:'/user/edit',
        method:'post',
        data
    })
}

