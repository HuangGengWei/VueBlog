import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    hasLogin: false,
    curr:1,
    position:0
}

/**
 * mutations 里面放置的是我们操作state对象属性的方法
 */
const mutations = {
    SaveCurr(state, n){
        return (state.curr = n)
    },
    SavePosition(state, n){
        return (state.position = n)
    }
}

export default new Vuex.Store({
    state,
    mutations
})