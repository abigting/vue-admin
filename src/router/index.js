import Vue from 'vue'
import Router from 'vue-router'
import system from './module/system'; //系统管理
import Layout from '@/views/layout/Layout'

Vue.use(Router);

export const constantRoutes = [
  // {...system},
  {
    path: '/',
    component: () => import('@/views/index/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  {
    path: '/forget_pass',
    component: () => import('@/views/login/forget_pass'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: "/404",
    hidden: true
  },
];

//动态加载路由
export const asyncRoutes = [{...system}];

// export const asyncRoutes = [];
const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
});
const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher // reset router
}

export default router

