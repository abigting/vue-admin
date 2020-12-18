import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import 'default-passive-events'
import './permission'
import "babel-polyfill"
import storage from '@/utils/localStorage'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'mini' })
import '@/icons'
import '@/styles/index.scss' // global css
import 'normalize.css' // A modern alternative to CSS resets

//loading
function timeOut(){
	setTimeout(()=>{
		this.isLoading = false;
	},280)
}
Vue.prototype.timeOut = timeOut;

 // 按钮元素控制 v-permission=" "
 Vue.directive('permission', {
   inserted: (el, binding, vnode) => {
     const auths =storage.get('auths')||[];
     // let permissionList = vnode.context.$route.meta.permission||[];
     if(binding.value.toString()==='9999') return;
     if (!auths.includes(binding.value.toString())) {
       el.parentNode.removeChild(el)
     }
   }
 });

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
