<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" statusBar :border="false" left-icon="back">
			<view class="w-100 flex justify-center align-center">
				所有人可见
				<text class="icon icon-shezhi"></text>
			</view>
		</uni-nav-bar>
		<!-- 文本域 -->
		<textarea v-model="content" placeholder="说一句话吧~" class="px-2 uni-textarea"></textarea>
		<!-- 多图片上传 -->
		<upload-image :show="show" ref="uploadImage" @change="changeImage" :list="imageList">

		</upload-image>
		<!-- 底部操作条 -->
		<view class="fixed-bottom bg-white flex justify-center align-center" style="height: 85rpx;">
			<view hover-class="jello" class="icon icon-caidan footer-btn animated"></view>
			<view hover-class="jello" class="animated icon icon-huati footer-btn"></view>
			<view hover-class="jello" class="animated icon icon-tupian footer-btn" @click="iconClickEvent('uploadImage')"></view>
			<view class="bg-main text-white ml-auto flex align-center justify-center rounded mr-2" style="width: 140rpx;height: 60rpx;">发送</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import uploadImage from '@/components/common/upload-image.vue'
	export default {
		components: {
			uniNavBar,
			uploadImage
		},
		data() {
			return {
				content: '',
				imageList: [],
				// 是否已经弹出提示框
				showBack: false

			}
		},
		// 监听返回
		onBackPress() {
			if ((this.content !== '' || this.imageList.length > 0) && !this.showBack) {
				uni.showModal({
					content: '是否要保存为草稿？',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						// 点击确认
						if (res.confirm) {
							this.store()
						} else { // 点击取消，清除缓存
							uni.removeStorage({
								key: "add-input"
							})
						}
						// 手动执行返回
						uni.navigateBack({
							delta: 1
						});
					},
				});
				this.showBack = true
				return true
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'add-input',
				success: res => {
					if (res.data) {
						let result = JSON.parse(res.data)
						this.content = result.content
						this.imageList = result.imageList
					}
				}
			})
			// uni.removeStorage({
			// 	key:'add-input'
			// })
		},
		computed: {
			show() {
				return this.imageList.length > 0
			}
		},
		methods: {
			// 底部图片点击事件
			iconClickEvent(e){
				switch (e){
					case 'uploadImage':
					this.$refs.uploadImage.chooseImage()
						break;
					default:
						break;
				}
				
			},
			// 返回上一步
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 选中图片
			changeImage(fils) {
				this.imageList = fils
			},
			// 保存操作
			store() {
				let data = {
					content: this.content,
					imageList: this.imageList
				}
				// 保存为本地存储
				uni.setStorage({
					key: 'add-input',
					data: JSON.stringify(data)
				})
			}
		}
	}
</script>

<style>
	.footer-btn {
		width: 86rpx;
		height: 86rpx;
		display: flex;
		justify-content: center;
		align-content: center;
		font-size: 50rpx;
	}
</style>
