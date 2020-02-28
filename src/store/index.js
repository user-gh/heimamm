// 放vuex的代码
import Vue from 'vue'
import Vuex from 'vuex'

// 注册vuex
Vue.use(Vuex);

// 创建Vue对象
const store = new Vuex.Store({
    state:{
        // 用户名
        username:'',
        // 头像
        avatar:''
    },
    mutations:{
        // 修改用户名的方法
        changeUsername(state,val){
            state.username = val;
        },
        // 修改头像的方法
        changeAvatar(state,val){
            state.avatar = val;
        }
    }
})
// 暴露出去
export default store;