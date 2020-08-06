<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-with-animation :scroll-into-view="scrollInto" scroll-x class="scroll-row border-bottom border-light-secondary"
		 style="height: 100rpx;">
			<view class="scroll-row-item px-3 py-2 font-md " v-for="(item,index) in tabBars" :key="index" :id="'tab'+index"
			 :class="tabIndex===index?'text-main font-lg font-weight-bold':''" @click="changeTab(index)">{{item.name}}</view>
		</scroll-view>
		<swiper :style="'height:'+scrollH+'px'" :duration="1000" :current="tabIndex" @change="onChangeTab" >
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y :style="'height:'+scrollH+'px'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length>0">
						<block v-for="(item,index) in item.list" :key="index">
							<!-- 列表 -->
							<topic-list :item="item" :index="index" ></topic-list>
							<!-- 分割线 -->
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


		</block>
	</view>
</template>

<script>
	import topicList from '@/components/news/topic-list.vue'
	
	import loadMore from '@/components/common/load-more.vue'
	const demo = [{
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					},
					{
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}
				]
	export default {
		components: {
			topicList,
			loadMore
		},
		data() {
			return {
				scrollH: 600,
				scrollInto: '',
				tabIndex: 0,
				tabBars: [{
						name: '关注'
					},
					{
						name: '推荐'
					},
					{
						name: '体育'
					},
					{
						name: '热点'
					},
					{
						name: '财经'
					},
					{
						name: '娱乐'
					},
					{
						name: '军事'
					},
					{
						name: '历史'
					},
					{
						name: '本地'
					}
				],
				newsList: []
			}
		},
		// 监听点击导航栏搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: "../search/search?type=topic"
			})
		},
		
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(101)
				}
			})
			this.getData()
		},
		methods: {
			// 上拉加载更多
			loadmore(index) {
				// 获取当前列表
				let item = this.newsList[index]
				// 判断是否处于可加载状态（上拉加载更多）
				if (item.loadmore !== '上拉加载更多') return;
				this.newsList[index].loadmore = '加载中...'
				setTimeout(() => {
					item.list = [...item.list, ...item.list]
					item.loadmore = '上拉加载更多'
				}, 2000)
			},
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
			// 监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			// 切换选项
			changeTab(index) {
				if (this.tabIndex === index) {
					return
				}
				this.tabIndex = index
				this.scrollInto = 'tab' + index
			}
			
			
		}
	}
</script>

<style>

</style>
