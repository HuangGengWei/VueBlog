import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    hasLogin: false
}

/**
* mutations 里面放置的是我们操作state对象属性的方法
*/
const mutations = {
    ChangeLoginStatus(state,value) {
        //console.log(state);
        state.hasLogin = value;
    }
},

export default new Vuex.Store({
    state,
    mutations,
})