<template>
	<!-- 分享弹出层 -->
	<uni-popup ref="popup" type="bottom">
		<view class="text-center py-2 font-md border-bottom">
			分享到
		</view>
		<view class="flex align-center">
			<view class="flex-1 flex flex-column justify-center align-center py-2 border-light-secondary" hover-class="bg-light"
			 v-for="(item,index) in providerList" :key="index" @click="share(item)">
				<view style="width: 100rpx;height: 100rpx;" class="icon icon-weixin text-white bg-primary flex font-lg rounded-circle justify-center align-center "
				 :class="[item.color,item.icon]">
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="text-center py-2 font-md border-top border-light-secondary " hover-class="bg-light" @click="close">
			取消
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				title: 'welcome to share ！！！',
				shareText: 'uni-app可以同时发布成原生App、小程序、H5，邀请你一起体验！',
				href: "https://uniapp.dcloud.io",
				image: 'https://edu-image.nosdn.127.net/43defb95dd2e460e8b7329d77be9bb0a',
				shareType: 0,
				providerList: []
			}
		},
		components: {
			uniPopup
		},
		computed: {

		},
		beforeDestroy() {
			this.shareText = 'uni-app可以同时发布成原生App、小程序、H5，邀请你一起体验！',
				this.href = 'https://uniapp.dcloud.io',
				this.image = 'https://edu-image.nosdn.127.net/43defb95dd2e460e8b7329d77be9bb0a';
		},
		onShareAppMessage() {
			return {
				title: this.shareText ? this.shareText : "欢迎体验uni-app",
				path: '/pages/tabBar/component/component',
				imageUrl: this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
			}
		},
		mounted() {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					console.log('success', e);
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '微信好友',
									id: 'weixin',
									sort: 0,
									icon: 'icon-weixin',
									color: 'bg-success'
								})
								data.push({
									name: '朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline',
									sort: 1,
									icon: 'icon-huati',
									color: 'bg-dark'
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '新浪微博',
									id: 'sinaweibo',
									sort: 2,
									icon: 'icon-xinlangweibo',
									color: 'bg-warning'
								})
								break;
							case 'qq':
								data.push({
									name: 'QQ好友',
									id: 'qq',
									sort: 3,
									icon: 'icon-QQ',
									color: 'color-primary'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x, y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					console.log('获取分享通道失败', e);
					uni.showModal({
						content: '获取分享通道失败',
						showCancel: false
					})
				}
			});
		},
		methods: {
			open(options) {
				if(options){
					this.image = options.image?options.image:this.image
					this.shareText = options.shareText?options.shareText:this.shareText
					this.href = options.href?options.href:this.href
				}
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			async share(e) {
				console.log('分享通道:' + e.id + '； 分享类型:' + this.shareType);

				if (!this.shareText && !this.image) {
					uni.showModal({
						content: '分享内容不能为空',
						showCancel: false
					})
					return;
				}

				// if(!this.image && (this.shareType === 2 || this.shareType === 0)){
				// 	uni.showModal({
				// 		content:'分享图片不能为空',
				// 		showCancel:false
				// 	})
				// 	return;
				// }

				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: this.shareType,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '已分享',
							showCancel: false
						})
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: e.errMsg,
							showCancel: false
						})
					},
					complete: function() {
						console.log('分享操作结束!')
					}
				}
				shareOPtions.title = this.title
				shareOPtions.href = this.href
				if (this.shareText) {
					shareOPtions.summary = this.shareText;
				}
				if (this.image) {
					shareOPtions.imageUrl = this.image;
				}
				if (shareOPtions.type === 0 && plus.os.name === 'iOS') { //如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				// if (shareOPtions.type === 1 && shareOPtions.provider === 'qq') { //如果是分享文字到qq，则必须加上href和title
				// 	shareOPtions.href = 'https://uniapp.dcloud.io';
				// 	shareOPtions.title = '欢迎体验uniapp';
				// }
				uni.share(shareOPtions);
			},
			compress() { //压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log('开始压缩');
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => { // 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if (file.size > 20480) { // 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content: '分享图片太大,需要请重新选择图片!',
										showCancel: false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content: '分享图片太大,需要请重新选择图片!',
							showCancel: false
						})
					});
				})
			}
		}
	}
</script>

<style>
</style>
