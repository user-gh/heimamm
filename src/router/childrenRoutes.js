// 准备组件
import user from '@/views/index/user/index';
import chart from '@/views/index/chart/index';
import buisiness from '@/views/index/buisiness/index';
import question from '@/views/index/question/index';
import subject from '@/views/index/subject/index';

export default [

    // 子路由一搬不加 /
    {
        path: 'chart',
        component: chart,
        meta: {
            title: '数据概览',
            routes: [
                '超级管理员',
                '管理员'
            ],
            icon:"el-icon-pie-chart"
        },
    },
    {
        path: 'user',
        component: user,
        meta: {
            title: '用户列表',
            routes: [
                '超级管理员',
                '管理员'
            ],
            icon:'el-icon-user'
            
        },
    },
    {
        path: 'buisiness',
        component: buisiness,
        meta: {
            title: '企业列表',
            routes: [
                '超级管理员',
                '管理员',
                '老师'
            ],
            icon:"el-icon-edit-outline"
        },
    },
    {
        path: 'question',
        component: question,
        meta: {
            title: '题库列表',
            routes: [
                '超级管理员',
                '管理员',
                '老师',
                '学生'
            ],
            icon:"el-icon-office-building"
        },
    },
    {
        path: 'subject',
        component: subject,
        meta: {
            title: '学科列表',
            routes: [
                '超级管理员',
                '管理员',
                '老师',
                '学生'
            ],
            icon:"el-icon-notebook-2"
        },
    },
]