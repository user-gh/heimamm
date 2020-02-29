import Vue from 'vue'
import moment from 'moment'
// 准备一个过滤器
// 参数1：过滤器名字
// 参数2：过滤器具体实现
Vue.filter('formaTime',function(value){
    // value是一个日期  
    return moment(value).format('YYYY-MM-DD');
})