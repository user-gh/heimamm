import Request  from '@/utilis/request.js'

// 封装一个获取企业列表的接口
export function  buisinessList(params){
    return Request({
        url:'/enterprise/list',
        method:'get',
        params
    })
}

// 封装一个修改企业状态的接口
export function buisinessStatus(data){
    return Request({
        url:'/enterprise/status',
        method:'post',
        data
    })
}

// 封装一个增加企业的接口
export function buisinessAdd(data){
    console.log("进入新增");
    return Request({
        url:'/enterprise/add',
        method:'post',
        data
    })
}

// 封装一个编辑企业的接口
export function buisinessEdit(data){
    console.log("进入修改");
    return Request({
        url:'/enterprise/edit',
        method:'post',
        data
    })
}


// 封装一个删除学科的接口
export function  buisinessDel(data){
    return Request({
        url:'/enterprise/remove',
        method:'post',
        data
    })
}