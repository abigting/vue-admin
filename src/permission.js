import router from './router'
import {
  constantRoutes,
  asyncRoutes
} from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth'
import storage from '@/utils/localStorage'

NProgress.configure({
  showSpinner: false
});
const whiteList = ['/login', '/register']; // 不重定向白名单
router.beforeEach(async(to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (router.options.routes.length===5) {
      try {
        const auths = storage.get('auths');
        await store.dispatch('permission/generateRoutes', auths).then(accessRoutes => {

          console.log(accessRoutes, 'accessRoutes')

          router.addRoutes(accessRoutes);
          router.options.routes = router.options.routes.concat(accessRoutes);
          next({...to, replace: true})
        })
      } catch (error) {
        await store.dispatch('user/logout');
        Message.error(error || 'Has Error');
        next(`/login`)
      }
    } else {
      //放行
      next()
    }
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
