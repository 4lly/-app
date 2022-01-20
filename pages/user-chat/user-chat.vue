<template>
	<view>
		<!-- 聊天列表 -->
		<scroll-view :style="'height:'+scrollH+'px'" :scroll-y="true" :scroll-into-view="scrollInto" scroll-with-animation>
			<block v-for="(item,index) in list" :key="index">
				<!-- 左边 -->
				<view :id="'chart'+index">
					<user-chart-list :item="item" :index="index" :pretime="index>0?list[index-1].create_time:0"></user-chart-list>
				</view>
			</block>
		</scroll-view>
		<!-- 底部操作条 -->
		<bottom-input @submit="submit"></bottom-input>
	</view>
</template>

<script>
	import userChartList from '@/components/user-chat/user-chart-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
	export default {
		components: {
			userChartList,
			bottomInput
		},
		data() {
			return {
				scrollH: 600,
				content: '',
				scrollInto: "",
				list: [{
						user_id: 2,
						avatar: '/static/default.jpg',
						username: '昵称',
						data: '你好啊',
						type: 'text',
						create_time: 1570783530
					},
					{
						user_id: 1,
						avatar: '/static/default.jpg',
						username: '昵称',
						data: '你好啊',
						type: 'text',
						create_time: 1570783530
					},
					{
						user_id: 2,
						avatar: '/static/default.jpg',
						username: '昵称',
						data: '你好啊',
						type: 'text',
						create_time: 1570783530
					},
					{
						user_id: 1,
						avatar: '/static/default.jpg',
						username: '昵称',
						data: '你好啊',
						type: 'text',
						create_time: 1570783530
					}, {
						user_id: 2,
						avatar: '/static/default.jpg',
						username: '昵称',
						data: '你好啊',
						type: 'text',
						create_time: 1570783530
					},
					{
						user_id: 1,
						avatar: '/static/default.jpg',
						username: '昵称',
						data: '你好啊',
						type: 'text',
						create_time: 1570783530
					}, {
						user_id: 2,
						avatar: '/static/default.jpg',
						username: '昵称',
						data: '你好啊',
						type: 'text',
						create_time: 1570783530
					},
					{
						user_id: 1,
						avatar: '/static/default.jpg',
						username: '昵称',
						data: '你好啊99',
						type: 'text',
						create_time: 1570783530
					}
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(101)
				}
			})
		},
		onReady() {},
		onShow() {
			this.pageToBottom()
		},
		methods: {
			submit(content) {
				let obj = {
					user_id: 1,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: content,
					type: 'text',
					create_time: (new Date()).getTime()
				}
				
				this.list.push(obj)
				this.pageToBottom()
			},
			pageToBottom() {
				let lastIndex = this.list.length - 1
				if (lastIndex <= 0) return;
				this.$nextTick(() => {
					this.scrollInto = "chart" + lastIndex
					console.log(this.scrollInto)
				});
				this.scrollInto = '' //不清空再次跳到锚点位置会不起作用
			}
		}
	}
</script>

<style>

</style>
