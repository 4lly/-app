<template xlang="wxml">
	<view class="position-fixed fixed-top wrap" @click="share">
		<view class="code">
			<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
		</view>
		<!-- <image :src="img" mode="widthFix" style="width: 200rpx;"></image> -->
		<swiper class="swiper-wrap ">
			<swiper-item class="swiper-item " v-for="(item,index) in shares" :key="index">
				<view class="poster">
					<canvas style="width:600rpx;height:80vh;" :canvas-id="'canvas_'+index"></canvas>
				</view>
			</swiper-item>
		</swiper>
		<!-- <view class="uni-padding-wrap">
			<view class="btns">
				<button type="primary" @tap="creatQrcode">生成二维码</button>
				<button type="primary" @tap="saveQrcode">保存到图库</button>
				<button type="warn" @tap="clearQrcode">清除二维码</button>
				<button type="warn" @tap="ifQrcode">显示隐藏二维码</button>
			</view>
		</view> -->
	</view>
</template>
<script>
	import uQRCode from '@/common/uqrcode.js'
	export default {
		props: ['shares'],
		data() {
			return {
				qrcodeText: 'uQRCode',
				qrcodeSize: 200,
				qrcodeImg: '',
				windowWidth: 0,
				windowHeight: 0
			}
		},
		methods: {
			share(){
				this.$emit('share')
			},
			make() {
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})
				uQRCode.make({
					canvasId: 'qrcode',
					text: this.qrcodeText,
					size: this.qrcodeSize,
					margin: 10,
					success: res => {
						this.qrcodeImg = res
						this.shares.forEach((postImg, index) => {
							var ctx = uni.createCanvasContext('canvas_' + index)
							var canvasWidth = this.windowWidth / 750 * 600
							var canvasHeight = this.windowHeight * 0.8
							uni.downloadFile({
								url: postImg,
								success: (res) => {
									console.log(canvasWidth, canvasHeight, res)
									ctx.save()
									ctx.beginPath()
									ctx.rect(0, 0, canvasWidth, canvasHeight)
									// 从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。
									ctx.clip()
									ctx.drawImage(res.tempFilePath, 0, 0, canvasWidth, canvasHeight * 0.7)
									ctx.restore()
									ctx.setFontSize(12)
									//文字 x,y
									ctx.fillText('张三', canvasWidth * 0.5, canvasHeight * 0.80)
									//文字 x,y
									ctx.fillText('邀请您加入我们', canvasWidth * 0.5, canvasHeight * 0.85)
									ctx.setFontSize(14)
									ctx.setFillStyle('#cccccc')
									//文字 x,y
									ctx.fillText('长按识别或扫描二维码进入', canvasWidth * 0.16, canvasHeight * 0.95)
									// 二维码 x,y, w,h
									ctx.drawImage(this.qrcodeImg, canvasWidth * 0.1, canvasHeight * 0.73, canvasWidth * 0.3, canvasWidth *
										0.3)
									ctx.draw()
								},
								fail: (res) => {
									console.log(res)
								}
							})
							console.log(postImg, index)
						})
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
		},
		mounted() {
			let _this = this
			uni.getSystemInfo({
				success(res) {
					_this.windowWidth = res.windowWidth
					_this.windowHeight = res.windowHeight
				}
			})
			if (this.shares.length) {
				this.make()
			}
		},
		watch: {
			shares(curr, old) {
				this.shares = curr
			}
		}
	}
</script>

<style>
	/* @import "../../../common/icon.css"; */
	.wrap {

		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
	}

	.code {
		z-index: -999;
		position: fixed;
		left: 150px;
		top: 99999990px;
		opacity: 0;
		background-color: #0056B3;
	}

	.swiper-wrap {
		position: fixed;
		width: 100%;
		height: 80%;
		top: 10%;
		z-index: 99999;
	}

	.swiper-wrap .swiper-item {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.swiper-wrap .swiper-item .poster {
		width: 600rpx;
		height: 100%;
		margin: 15px auto;
		background-color: #fff;
		border-radius: 7px;
		box-shadow: 0 0 6px #ccc;
		overflow: hidden;
		position: relative;
	}

	.qrimg {
		display: flex;
		justify-content: center;
	}


	.btns {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	button {
		width: 100%;
		margin-top: 10upx;
	}
</style>
