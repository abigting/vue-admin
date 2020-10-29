import Layout from '@/views/layout/Layout'
import {
  head
} from 'shelljs'

const test = {
  path: '/system',
  name: 'system',
  redirect: '/system/documents/lawLibrary',
  meta: {
    title: '系统管理',
    icon: 'user'
  },
  component: Layout,
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/system/user/index'),
      meta: {
        title: '用户管理'
      },
      children: []
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/role/index'),
      meta: {
        title: '角色管理',
        level:1
      },
      children: [{
        path: 'detail',
        component: () => import('@/views/system/role/detail'),
        name: 'role/detail',
        hidden: true,
        meta: {
          title: '角色详情',
          level: 2
        }
      }, ]
    },
  ]
}
export default test
