import Vue from 'vue'
import App from './App'
import store from './store/index.js';
import divider from './components/common/divider.vue'
import noThing from './components/common/no-thing.vue'
Vue.component('divider',divider)
Vue.component('no-thing',noThing)
Vue.config.productionTip = false
Vue.prototype.$store = store
// 引入配置文件
import $C from './common/config.js';
Vue.prototype.$C = $C
// 挂在助手函数库
import $U from './common/util.js';
Vue.prototype.$U = $U
// 引入http
// 引入配置文件
import Http from './common/request.js';
Vue.prototype.Http = Http
// 判断是否登录
Vue.prototype.checkLogin = (callback)=>{
	if(!store.state.loginStatus){
		uni.showToast({
			title:"请登录",
			icon:'none'
		})
		uni.navigateTo({
			url: '/pages/login/login'
		});
	}else{
			callback()
	}
}
// 页面跳转判断是否登录
Vue.prototype.navigateTo = (options)=>{
	if(!store.state.loginStatus){
		uni.showToast({
			title:"请登录",
			icon:'none'
		})
		uni.navigateTo({
			url: '/pages/login/login'
		});
	}else{
			uni.navigateTo({
				...options
			})
	}

}
App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
