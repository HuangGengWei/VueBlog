import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * mutations 里面放置的是我们操作state对象属性的方法
 */
const mutations = {
    mutationsChangeLoginStatus(state,value) {
        return (state.hasLogin = value)
    }
}

const state = {
    hasLogin: false,
}

export default new Vuex.Store({
    state,
    mutations
})