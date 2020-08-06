<template>
	<view>
		<!-- 手机号 -->
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
		<view class="py-2 px-3"><button class="bg-main  text-white" style="border-radius: 50rpx; border: 0;" type="primary"
			 :disabled="disabled" :class="disabled?'bg-main-disabled':''" @click="submit">绑定</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				codeTime: 0
			};
		},
		computed: {
			disabled() {
				return this.phone == '' || this.code == ''
			}
		},
		methods: {
			// 获取验证码
			getCode() {
				// 防止重复获取
				if (this.codeTime > 0) {
					return;
				}
				// uni.request({
				// 	method:'POST',
				// 	withCredentials:true,
				// 	data:{phone:this.phone},
				// 	success:res=>{
				// 		console.log(res)
				// 	}
				// })
				console.log('获取短信验证码')
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
			// 验证
			check() {
				let rule = /^1[34578]\d{9}$/
				if (!rule.test(this.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					})
					return false
				}
				return true
			},
			submit() {
				if(!this.check()){
					return
				}
				this.$store.commit('editUserInfo', {key:'phone',value:this.phone})
				
				uni.navigateBack({
					delta:1
				})
				uni.showToast({
					title:'提交成功'
				})
			}
		}
	};
</script>

<style></style>
