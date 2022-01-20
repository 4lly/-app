<template>
	<view>
		<uni-collapse >
			<uni-collapse-item title="标题文字" showAnimation>
				<view class="p-2">
					需要帮助吗？需要帮助吗需要帮助吗需要帮助吗需要帮助吗需要帮助吗需要帮助吗需要帮助吗
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="标题文字" showAnimation>
				<view class="p-2">
					需要帮助吗？需要帮助吗需要帮助吗需要帮助吗需要帮助吗需要帮助吗需要帮助吗需要帮助吗
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx; border: 0;" type="primary">意见反馈</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '../../components/uni-ui/uni-collapse/uni-collapse.vue'
	
	import uniCollapseItem from '../../components/uni-ui/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components:{
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
