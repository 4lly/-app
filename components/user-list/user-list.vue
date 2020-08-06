<template>
	<view class="animated fast fadeIn p-2 flex align-center border-bottom border-light-secondary" hover-class="bg-light" @click="open">
		<image :src="item.avatar" style="width: 100rpx;height: 100rpx;" class="rounded-circle mr-2"></image>
		<view class="flex flex-column flex-1">
			<text class="font-md text-dark">{{item.userName}}</text>
			<uni-badge :text="item.age" :type="item.sex===1?'error':'primary'" size="small">
				<text v-if="item.sex>0" class="icon  font-sm" :class="item.sex===1?'icon-nv':'icon-nan'" style="margin-right: 5rpx;"></text>
			</uni-badge>
		</view>
		<view class="text-light-muted uni-icon uni-icon-checkbox-filled" :class="item.isFollow?'text-light-muted':'text-main'">
	
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'
	export default{
		props:{
			item:Object,
			index:Number
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
		}
	}
</script>

<style>
</style>
