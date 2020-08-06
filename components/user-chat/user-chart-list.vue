<template>
	<view >
		<view class="py-2 flex align-center justify-center font-sm text-light-muted" >
			{{shortTime}}
			
		</view>
		<view class="flex align-start px-2 my-2" :style="isSelf?'flex-direction: row-reverse;':''">
			<image :src="item.avatar" style="width: 100rpx;height: 100rpx;" class="rounded-circle"></image>
			<view class="bg-light p-2 rounded mx-2" style="max-width: 400rpx;">
				{{item.data}}
			</view>
		</view>
		
	</view>
</template>

<script>
	import $T from '@/common/time.js'
	// 模拟当前用户登录的userId
	const uid = 1
	export default{
		props:{
			item:Object,
			index:Number,
			pretime:[Number,String]
		},
		computed:{
			isSelf(){
				return  uid === this.item.user_id
			},
			shortTime(){
				return $T.getChatTime(this.item.create_time,this.pretime)
			}
		}
	}
</script>

<style>
</style>
