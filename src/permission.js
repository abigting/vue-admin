import router from './router'
import {
  constantRoutes
} from './router'
import store from './store'
import Layout from '@/views/layout/Layout'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth'

NProgress.configure({
  showSpinner: false
});
const whiteList = ['/login', '/register']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});
