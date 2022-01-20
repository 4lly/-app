<template>
	<view class="animated fast fadeIn flex align-center p-2 border-bottom border-light-secondary" hover-class="bg-light" @click="open">
		<image :src="item.avatar" style="height:80rpx;width:80rpx;" class="rounded-circle mr-2 flex-shrink"></image>
		<view class="flex flex-column flex-1">
			<view class="flex justify-between align-center">
				<text class="font-md">{{item.userName}}</text>
				<text class="font text-secondary">{{item.update_time | formatTime}}</text>
			</view>
			<view class=" flex align-center justify-between">
				<text style="width: 500rpx;" class="text-secondary text-ellipsis">{{item.data}}</text>
				<uni-badge :text="item.noread" type="error"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入时间库
	import $T from '@/common/time.js'
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'
	export default {
		props: {
			item: Object,
			index: Number
		},
		components: {
			uniBadge
		},
		methods:{
			open(){
				uni.navigateTo({
					url:'../../pages/user-chat/user-chat'
				})
			}
		},
		filters: {
			formatTime(value) {
				return $T.gettime(value)
			}
		}
	}
</script>

<style>
</style>
