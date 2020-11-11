import Layout from '@/views/layout/Layout'
import storage from '@/utils/localStorage'
import {judgeHide} from '../../utils/auth'

const system = {
  path: '/system',
  name: 'system',
  redirect: '/system/documents/lawLibrary',
  meta: {
    title: '用户中心',
    icon: 'iconxitong'
  },
  component: Layout,
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/system/user/index'),
      meta: {
        title: '用户管理',
      },
      // hidden: true,
      children: []
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/role/index'),
      meta: {
        title: '角色管理',
        level:1,
      },
      // hidden: judgeHide('38010100000'),
      children: [{
        path: 'detail',
        component: () => import('@/views/system/role/detail'),
        name: 'role/detail',
        hidden: true,
        meta: {
          title: '角色详情',
          level: 2,
        }
      }]
    },
  ]
}
export default system
