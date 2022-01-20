<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view>
			<view class=" icon icon-guanbi flex align-center justify-center font-lg" style="width: 100rpx; height: 100rpx;position:"
			 hover-class="bg-light" @click="back">
			</view>
		</view>
		<view class="text-center text-muted" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size: 60rpx;">
			{{status?'手机验证码登录':'账号密码登录'}}
		</view>
		<!-- 昵称密码登录 -->
		<template v-if="!status">
			<view class="px-2">
				<view class="mb-2">
					<input type="text" v-model="username" placeholder="昵称/手机号/邮箱" class="border-bottom p-2" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="password" placeholder="请输入密码" class="border-bottom p-2 flex-1" />
					<view class="border-bottom font flex align-center justify-center text-muted" style="width: 150rpx;">
						忘记密码？
					</view>
				</view>
			</view>
		</template>
		<!-- 手机号登陆 -->
		<template v-else>
			<view class="px-2">
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom font flex align-center justify-center text-muted">
						+86
					</view>
					<input type="text" v-model="phone" placeholder="手机号" class="border-bottom p-2 flex-1" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="code" placeholder="请输入验证码" class="border-bottom p-2 flex-1" />
					<view class="border-bottom font flex align-center justify-center text-white" :class="codeTime>0?'bg-main-disabled':'bg-main'"
					 style="width: 180rpx;" @click="getCode">
						{{codeTime>0?codeTime+'s':'获取验证码'}}
					</view>
				</view>
			</view>
		</template>

		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx; border: 0;" type="primary" :class="disabled?'bg-main-disabled':''"
			 :disabled="disabled" @click="submit" :loadding="loadding">{{loadding?'登录中':'登录'}}</button>
		</view>

		<view class="flex align-center justify-center pt-2 pb-4">
			<view class="text-primary font-sm" @click="changeStatus">{{status?'账号密码登录':'验证码登录'}}</view>
			<text class="text-muted mx-2">|</text>
			<view class="text-primary font-sm">登录遇到问题</view>
		</view>

		<!-- 社交账号登录 -->
		<view class="flex align-center justify-center">
			<view style="height: 1rpx;background-color: #EEEEEE;width: 100rpx;"></view>
			<view class="mx-2 text-muted">社交账号登录</view>
			<view style="height: 1rpx;background-color: #EEEEEE;width: 100rpx;"></view>
		</view>
		<other-login></other-login>

		<view class="flex align-center justify-center text-muted">
			注册即代表同意<text class="text-primary">《xxx社区协议》</text>
		</view>


	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	import otherLogin from '@/components/common/other-login.vue'
	export default {
		components: {
			uniStatusBar,
			otherLogin
		},
		data() {
			return {
				status: false,
				username: '',
				password: '',
				phone: '',
				code: '',
				codeTime: 0,
				loadding:false
			}
		},
		onLoad() {

		},
		computed: {
			disabled() {
				if ((this.username === '' || this.password === '') && (this.phone === '' || this.code === '')) return true
				return false
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 初始化表单
			initForm() {
				this.username = ''
				this.password = ''
				this.phone = ''
				this.code = ''
			},
			// 切换登录方式
			changeStatus() {
				this.initForm()
				this.status = !this.status
			},
			// 获取验证码
			getCode() {
				// 防止重复获取
				if (this.codeTime > 0) {
					return;
				}
				console.log('获取短信验证码')
				// uni.request({
				// 	method:'POST',
				// 	withCredentials:true,
				// 	data:{phone:this.phone},
				// 	success:res=>{
				// 		console.log(res)
				// 	}
				// })
				console.log('倒计时')
				this.codeTime = 60
				let timer = setInterval(() => {
					if (this.codeTime >= 1) {
						this.codeTime--
					} else {
						this.codeTime = 0
						clearInterval(timer)
					}
				}, 1000)
			},
			// 表单验证
			validate() {
				let flag = true
				//用户名正则，4到16位（字母，数字，下划线，减号）
				let uPattern = /^[a-zA-Z0-9_-]{4,16}$/
				//Email正则
				let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
				//手机号正则
				let mPattern = /^1[34578]\d{9}$/
				if (this.status) {
					if (!mPattern.test(this.phone)) {
						uni.showToast({
							title: "手机号格式不正确",
							icon: 'none'
						})
						flag = false
					}
				}
				return flag
			},
			submit() {
				
				// 表单验证
				if (!this.validate()) return
				this.loadding = true
				this.$store.commit('login',{
					nickName:this.status?this.phone:this.username,
					avatarUrl:'/static/default.jpg',
					gender:0,
					openid:this.status?this.phone:this.username,
					password:true,
					phone:this.status?this.phone:this.username,
					email:this.status?this.phone:this.username
					
				})
				this.loadding = false
				uni.navigateBack({
					delta:1
				})
				console.log('登录')
				// 提交后端
				// 登录成功处理

			}
		}
	}
</script>

<style>

</style>
