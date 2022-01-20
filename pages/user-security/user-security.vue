<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<uni-list-item :title="item.name" @click="handelEvent(item)">
				<text slot="right" class="text-muted">{{item.data}}</text>
			</uni-list-item>
		</block>
		<divider></divider>
		<block v-for="(item,index) in other" :key="'o'+index">
			<uni-list-item :title="item.name" @click="handelEvent(item)">
				<text slot="right" class="text-muted">{{item.data}}</text>
			</uni-list-item>

		</block>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import { mapState } from 'vuex'
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				list: [],
				other: []
			}
		},
		computed: {
			...mapState(['loginStatus', 'user'])
		},
		onLoad() {
		
			
		},
		onShow(){
			this.__init()
		},
		methods: {
			__init(){
				console.log('=====================',this.user)
				let list = [{
						name: '手机号',
						data: this.user.phone ? this.user.phone : '未绑定',
						type: 'navigateTo',
						url: '/pages/user-phone/user-phone'
					},
					{
						name: '登录密码',
						data: this.user.password ? '修改密码' : '未设置',
						type: 'navigateTo',
						url: '/pages/user-password/user-password'
					},
					{
						name: '邮箱绑定',
						data: this.user.email ? this.user.email : '未绑定',
						type: 'navigateTo',
						url: '/pages/user-email/user-email'
					}
				]
				this.list = [...list]
				let other = [{
						name: '微信账号',
						data: this.user.userbind.weixin?this.user.userbind.weixin.nickName:'未绑定',
						type: 'bind',
						provider: 'weixin'
					},
					{
						name: 'QQ账号',
						data: this.user.userbind.qq?this.user.userbind.qq.nickName:'未绑定',
						type: 'bind',
						provider: 'qq'
					},
					{
						name: '微博账号',
						data: this.user.userbind.sinaweibo?this.user.userbind.sinaweibo.nickName:'未绑定',
						type: 'bind',
						provider: 'sinaweibo'
					}
				
				]
				this.other = [...other]
			},
			handelEvent(item) {
				if (item.type === '') return
				switch (item.type) {
					case 'navigateTo':
						uni.navigateTo({
							url: item.url
						})
						break;
					case 'bind':
						if (item.data !== '未绑定') {
							return uni.showToast({
								title: '你已经绑定过了',
								icon: 'none'
							});
						}
						this.bind(item.provider)
						break;
				}

			},
			// 绑定第三方登录
			bind(provider) {
				uni.login({
					provider: provider,
					// #ifdef MP-ALIPAY
					scopes: 'auth_user', //支付宝小程序需设置授权类型
					// #endif
					success: res => {
					
						// 获取用户信息
						uni.getUserInfo({
							provider: provider,
							success: (infoRes) => {
								let user = {
									provider: provider,
									openid: infoRes.userInfo.openId,
									expires_in: 0,
									nickName: infoRes.userInfo.nickName,
									avatarUrl: infoRes.userInfo.avatarUrl,
								}
								
								let value =  this.user.userbind
								value[provider] = {nickName:user.nickName}
								console.log('userinfo============')
								console.log(infoRes,value)
								this.$store.commit('editUserInfo', {key:'userbind',value})
								this.__init()
								// this.loginEvent(obj)
							}
						});
					}


				})

			}
		}
	}
</script>

<style>

</style>
