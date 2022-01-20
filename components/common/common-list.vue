<template>

	<!-- 列表样式 -->
	<view class="p-2 animated fast fadeIn">
		<!-- 头像昵称|关注按钮 -->
		<view class="flex align-center justify-between ">
			<view class="flex align-center">
				<!-- 头像 -->
				<image :src="item.userpic" @click="openSpace" class="rounded-circle mr-2" style="height: 65rpx;width: 65rpx;"
				 lazy-load></image>
				<!-- 昵称发布时间 -->
				<view>
					<view class="font" style="line-height: 1.5;">{{item.username}}</view>
					<text class="font-sm text-light-muted" style="line-height: 1.5;"> {{item.newstime}}</text>
				</view>
			</view>
			<!-- 按钮 -->
			<view v-if="!item.isFollow" @click="follow" class="flex align-center justify-center text-white rounded bg-main animated faster"
			 hover-class="jello" style="width: 90rpx;height: 50rpx;">
				关注
			</view>
		</view>
		<!-- 标题 -->
		<view class="font-md my-1" @click="openDetail">
			{{item.title}}
		</view>
		<!-- 帖子详情 -->
		<slot>
			<!-- 图片 -->
			<image v-if="item.titlepic" :src="item.titlepic" mode="widthFix" class="rounded w-100" style="height: 350rpx;"></image>
		</slot>

		<!-- 图标按钮 -->
		<view class="flex align-center">
			<view @click="doSupport('support')" class="flex justify-center align-center flex-1 animated faster" hover-class="jello text-main"
			 :class="item.support.type==='support'?'support-active':''">
				<text class="icon icon-dianzan2 mr-1" hover-class="jello"></text>
				<text>{{item.support.support_count>0?item.support.support_count:'顶'}}</text>
			</view>
			<view @click="doSupport('unsupport')" class="flex justify-center align-center flex-1 animated faster" hover-class="jello text-main"
			 :class="item.support.type==='unsupport'?'support-active':''">
				<text class="icon icon-cai mr-1 "></text>
				<text>{{item.support.unsupport_count>0?item.support.unsupport_count:'踩'}}</text>
			</view>
			<view @click="doComment" class="flex justify-center align-center flex-1 animated faster" hover-class="jello text-main">
				<text class="icon icon-pinglun2 mr-1"></text>
				<text>{{item.comment_count>0?item.comment_count:'评论'}}</text>
			</view>
			<view @click="doShare" class="flex justify-center align-center flex-1 animated faster" hover-class="jello text-main">
				<text class="icon icon-zhuanfa1 mr-1"></text>
				<text>{{item.share_num>0?item.share_num:'分享'}}</text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			isdetail: {
				type: Boolean,
				default: false
			},
			item: Object,
			index: {
				type: Number,
				default: -1
			}
		},
		methods: {
			// 打开个人空间
			openSpace() {
				console.log('去个人中心')
				uni.navigateTo({
					url: '/pages/user-space/user-space'
				})
			},
			// 关注
			follow() {
				console.log('关注')
				this.checkLogin(() => {
					this.$emit('follow', this.index)
				})
			},
			// 文章详情
			openDetail() {
				// 处于详情页
				if (this.isdetail) return;
				console.log('文章详情')
				uni.navigateTo({
					url: '../../pages/detail/detail?detail=' + JSON.stringify(this.item)
				})
			},
			// 顶踩
			doSupport(type) {
				this.checkLogin(() => {
					this.$emit('doSupport', {
						type,
						index: this.index
					})
				})

			},
			// 评论
			doComment() {
				if (!this.isdetail) {
					return this.openDetail()
				}
				this.$emit('doComment')
			},
			// 分享
			doShare() {
				if (!this.isdetail) {
					return this.openDetail()
				}
				this.$emit('doShare')
			}
		}
	}
</script>

<style>
	.support-active {
		color: #FF4A6A;
	}
</style>
