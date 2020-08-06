<template>
	<view>
		<!-- tab -->
		<view class="flex align-center " style="height: 100rpx;">
			<view class="flex-1 flex align-center justify-center " :class="tabIndex===index?'font-lg font-weight-bold text-main':'font-md'"
			 v-for="(item,index) in tabBars" :key="index" @click="changeTab(index)">{{item.name}} <text class="ml-2" v-if="item.num>0">{{item.num}}</text>
			</view>
		</view>
		<!-- 列表 -->
		<swiper :style="'height:'+scrollH+'px'" :duration="1000" :current="tabIndex" @change="onChangeTab">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y :style="'height:'+scrollH+'px'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length>0">
						<block v-for="(item2,index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<user-list :item="item2" :index="index2"></user-list>
						</block>
						<!-- 上拉加载更多 -->
						<load-more :loadmore="item.loadmore"></load-more>
					</template>
					<template v-else>
						<!-- 什么都没有 -->
						<no-thing />
					</template>

				</scroll-view>
			</swiper-item>

		</swiper>

	</view>
</template>

<script>
	import loadMore from '@/components/common/load-more.vue'
	import userList from '@/components/user-list/user-list.vue'
	const demo = [{
		avatar: '/static/default.jpg',
		userName: 'jk',
		sex: 1,
		age: 24,
		isFollow: true
	}, {
		avatar: '/static/default.jpg',
		userName: 'lly',
		sex: 2,
		age: 22,
		isFollow: false
	}]
	export default {
		components: {
			loadMore,
			userList
		},
		data() {
			return {
				scrollH: 600,
				tabIndex: 0,
				tabBars: [{
						name: "互关",
						num: 0
					},
					{
						name: "关注",
						num: 1
					}, {
						name: "粉丝",
						num: 30
					}
				],
				newsList: []
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(100)
				}
			})
			// 更具选项获取数据
			this.getData()
		},

		// 监听点击输入框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: "../search/search?type=user"
			})
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			})
		},
		methods: {
			// 获取数据
			getData() {
				let arr = []
				// 生成列表模板
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						// 1上拉加载更多 2 加载中 3没有更多了
						loadmore: '上拉加载更多',
						list: []
					}
					if (i < 2) {
						obj.list = demo
					}
					arr.push(obj)
				}
				this.newsList = arr
			},
			// 切换选项
			changeTab(index) {
				if (this.tabIndex === index) {
					return
				}
				this.tabIndex = index
			},
			// 监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
		}
	}
</script>

<style>

</style>
