<template>
	<view>
		<!--消息列表  -->
		<template v-if="list.length>0">
			<block v-for="(item,index) in list" :key="index">

				<msg-list :item="item" :index="index"></msg-list>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view class="flex align-center justify-center border-bottom p-2 font-md " hover-class="bg-light" @click="popupEvent('friend')">
				<text class="icon icon-sousuo mr-2"></text>添加好友
			</view>
			<view class="flex align-center justify-center border-bottom p-2 font-md"  hover-class="bg-light" @click="popupEvent('clear')">
				<text class="icon icon-shanchu mr-2"></text>清除列表
			</view>

		</uni-popup>


	</view>
</template>

<script>
	import msgList from '@/components/msg/msg-list.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	let demo = [{
			avatar: '/static/default.jpg',
			userName: 'jk',
			update_time: '1587867197',
			data: '内内容内容内容内容内容内容内容内容内容内容内容容',
			noread: 20
		},
		{
			avatar: '/static/default.jpg',
			userName: 'jk',
			update_time: '1587867210',
			data: '内内容内容内容内容内容内容内容内容内容内容内容容',
			noread: 20
		}, {
			avatar: '/static/default.jpg',
			userName: 'jk',
			update_time: '1587867220',
			data: '内内容内容内容内容内容内容内容内容内容内容内容容',
			noread: 20
		}, {
			avatar: '/static/default.jpg',
			userName: 'jk',
			update_time: '1587867230',
			data: '内内容内容内容内容内容内容内容内容内容内容内容容',
			noread: 20
		}, {
			avatar: '/static/default.jpg',
			userName: 'jk',
			update_time: '1587867240',
			data: '内内容内容内容内容内容内容内容内容内容内容内容容',
			noread: 20
		}, {
			avatar: '/static/default.jpg',
			userName: 'jk',
			update_time: '1587867250',
			data: '内内容内容内容内容内容内容内容内容内容内容内容容',
			noread: 20
		}
	]
	export default {
		components: {
			msgList,
			uniPopup
		},
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.list = demo
		},
		// 监听原生导航栏按钮事件
		onNavigationBarButtonTap(e) {
			console.log(e)
			switch (e.index) {
				case 0: //左边
					this.$refs.popup.close()
					this.navigateTo({
						url:"../user-list/user-list"
					})
					break;
				case 1: //右边
				this.checkLogin(()=>{
						this.$refs.popup.open()
				})
				
					break;
			}

		},
		// 监听下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				this.list = demo
				// 停止下拉刷新
				uni.stopPullDownRefresh()
			}, 2000)
		},
		methods: {
			popupEvent(e){
				switch (e){
					case 'friend':
					uni.navigateTo({
						url:'../search/search?type=user'
					})
					console.log('添加好友')
						break;
					case 'clear':
					console.log('清除列表')
						break;
				}
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>

</style>
