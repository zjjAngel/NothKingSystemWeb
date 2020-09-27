import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import index from '@/page/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: 'clientManage',
          component: resolve=>(require(["@/page/clientManage"],resolve)),
        },
        {
          path: 'demandManage',
          component: resolve=>(require(["@/page/demandManage"],resolve)),
          children: [
            // {
            //   path: 'statistics',
            //   component: resolve=>(require(["@/page/clientManage"],resolve))
            // },
            {
              path: 'Inquire',
              component: resolve=>(require(["@/page/Inquire"],resolve))
            }
          ]
        },
        {
          path: 'projectManage',
          component: resolve=>(require(["@/page/projectManage"],resolve))
        },
        {
          path: 'systemManage',
          component: resolve=>(require(["@/page/systemManage"],resolve)),
          children: [
            {
              path: 'user',
              component: resolve=>(require(["@/page/user"],resolve))
            },
            {
              path: 'role',
              component: resolve=>(require(["@/page/role"],resolve))
            },
            {
              path: 'menu',
              component: resolve=>(require(["@/page/menu"],resolve))
            }
          ]
        }
      ]
    },{
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

//路由守卫
router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('sessionId')
  if (isLogin) {
      next()
  } else {
      if (to.path === '/login') {
          next()
      } else {
          next('/login')
      }
  }
})

export default router;
