import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'

// import admin from '@/components/admin'
const admin = r => require.ensure([], () => r(require('@/components/admin')), 'admin')

// import blogmgr from '@/components/blogmgr'
const blogmgr = r => require.ensure([], () => r(require('@/components/blogmgr')), 'blogmgr')

// import login from '@/components/login'
const login = r => require.ensure([], () => r(require('@/components/login')), 'login')

// const index = r => require.ensure([],()=>r(require('@/components/index')),'index')
// import view from '@/components/view'
const view = r => require.ensure([], () => r(require('@/components/view')), 'view')

// import bloglist from '@/components/bloglist'
const bloglist = r => require.ensure([], () => r(require('@/components/bloglist')), 'bloglist')

// import aboutme from '@/components/aboutme'
const aboutme = r => require.ensure([], () => r(require('@/components/aboutme')), 'aboutme')

// import image from '@/components/image'
const image = r => require.ensure([], () => r(require('@/components/image')), 'image')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta:{ index: 0 },
      children: [
        { 
          path: '/blogmgr',
          name:'blogmgr',
          component: blogmgr,
          meta:{ index:1 }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta:{ index: 0 },
      component: login
    },
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{ index:0},
      children: [
        {
          path: '/bloglist',
          name:'bloglist',
          component: bloglist,
          meta:{
            index:1,
          }
        },
        {
          path: '/view',
          name:'view',
          component: view,
          meta:{index:2}
        },
        {
          path: '/image',
          name:'image',
          component: image,
          meta:{index:1}
        },
        {
          path: '/aboutme',
          name:'aboutme',
          component: aboutme,
          meta:{index:1}
        }
      ]
    }
  ]
})
