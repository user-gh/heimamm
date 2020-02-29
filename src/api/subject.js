import Request  from '@/utilis/request.js'

// 封装一个获取学科列表的接口
export function  subjectList(params){
    return Request({
        url:'/subject/list',
        method:'get',
        params
    })
}

// 封装一个修改学科状态的接口
export function subjectStatus(data){
    return Request({
        url:'/subject/status',
        method:'post',
        data
    })
}

// 封装一个增加学科的接口
export function subjectAdd(data){
    return Request({
        url:'/subject/add',
        method:'post',
        data
    })
}

// 封装一个编辑学科的接口
export function subjectEdit(data){
    return Request({
        url:'/subject/edit',
        method:'post',
        data
    })
}


// 封装一个删除学科的接口
export function subjectDel(data){
    return Request({
        url:'/subject/remove',
        method:'post',
        data
    })
}