<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true" @clickRight="openAddInput">
			<view class="w-100 flex justify-center align-center">

				<view class="mx-1" :class="tabIndex===index?'font-lg text-main':'font-md text-light-muted'" v-for="(item,index) in tabBars"
				 :key="index" @click="changeTab(index)">{{item.name}}</view>
			</view>
			<text slot="right" class="icon icon-fatie_icon"></text>
		</uni-nav-bar>
		<!-- 列表 -->
		<swiper :style="'height:'+scrollH+'px'" :duration="1000" :current="tabIndex" @change="onChangeTab">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y :style="'height:'+scrollH+'px'" @scrolltolower="loadmoreEvent">
					<template v-if="list.length>0">
						<block v-for="(item,index) in list" :key="index">
							<!-- 列表 -->
							<common-list :item="item" :index="index" @doSupport="doSupport"></common-list>
							<!-- 分割线 -->
							<divider />
						</block>
						<!-- 上拉加载更多 -->
						<load-more :loadmore="loadmore"></load-more>
					</template>
				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item>
				<scroll-view scroll-y :style="'height:'+scrollH+'px'">
					<!-- 热门分类 -->
					<hot-cate :hotCate="hotCate"></hot-cate>
					<!-- 搜索框 -->
					<view class="p-2">
						<view class="bg-light rounded flex align-center justify-center text-secondary" @click="openSearch">
							<text class="icon icon-sousuo mr-2"></text> 搜索话题
						</view>
					</view>
					<!-- 轮播图 -->
					<swiper class="p-2 pb-2" :indicator-dots="true" :duration="1000" :autoplay="true" interval="3000">
						<swiper-item>
							<image src="../../static/demo/banner1.jpg" style="height: 300rpx;" class="w-100 rounded"></image>
						</swiper-item>
					</swiper>
					<divider></divider>
					<!-- 最近更新 -->
					<view class="p-2 font-md">最近更新</view>
					<!-- 话题列表组件 -->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item="item"></topic-list>
					</block>

				</scroll-view>
			</swiper-item>
		</swiper>

		<!-- 列表 -->
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load-more.vue'
	import hotCate from '@/components/news/hot-cate.vue'
	import topicList from '@/components/news/topic-list.vue'

	const demo = [{
		userName: '昵称',
		userpic: '../../static/default.jpg',
		newstime: '2020-12-12 下午 04:30',
		isFollow: true,
		title: "我是标题",
		titlepic: "../../static/demo/datapic/21.jpg",
		support: {
			type: "",
			support_count: 0,
			unsupport_count: 0
		},
		comment_count: 2,
		share_num: 2
	}, {
		userName: '昵称',
		userpic: '../../static/default.jpg',
		newstime: '2020-12-12 下午 04:30',
		isFollow: true,
		title: "我是标题",
		titlepic: "",
		support: {
			type: "",
			support_count: 0,
			unsupport_count: 0
		},
		comment_count: 0,
		share_num: 0
	}, {
		userName: '昵称',
		userpic: '../../static/default.jpg',
		newstime: '2020-12-12 下午 04:30',
		isFollow: true,
		title: "我是标题",
		titlepic: "../../static/demo/datapic/21.jpg",
		support: {
			type: "",
			support_count: 0,
			unsupport_count: 0
		},
		comment_count: 2,
		share_num: 2
	}]

	export default {
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList
		},
		data() {
			return {
				scrollH: 600,
				tabBars: [{
						name: '关注'
					},
					{
						name: '话题'
					}
				],
				hotCate: [{
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
				tabIndex: 0,
				list: [],
				// 1上拉加载更多 2 加载中 3没有更多了
				loadmore: '上拉加载更多',
				topicList: [{
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
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})
			this.list = demo
		},
		methods: {
			openSearch(){
				uni.navigateTo({
					url:'../search/search?type=topic'
				})
			},
			// 上拉加载更多
			loadmoreEvent() {
				// 判断是否处于可加载状态（上拉加载更多）
				if (this.loadmore !== '上拉加载更多') return;
				// 设置加载中
				this.loadmore = '加载中...'
				setTimeout(() => {
					this.list = [...this.list, ...this.list]
					this.loadmore = '上拉加载更多'
				}, 2000)
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
			},
			// 打开发布页
			openAddInput() {
				this.navigateTo({
					url: '../add-input/add-input'
				})
			},
			// 顶踩操作
			doSupport(e) {
				console.log(e)
				// 拿到当前对象
				let item = this.list[e.index]
				let msg = e.type === 'support' ? '顶' : '踩'
				if (item.support.type === '') {
					item.support.type = e.type
					item.support[e.type + '_count']++
				} else if (item.support.type === 'support' && e.type === 'unsupport') {
					// 之前顶了现在操作是踩
					item.support.unsupport_count++
					item.support.support_count--
				} else if (item.support.type === 'unsupport' && e.type === 'support') {
					// 之前踩了现在操作是顶
					item.support.unsupport_count--
					item.support.support_count++
				}
				item.support.type = e.type
				// this.$set(this.list, e.index, item)
				uni.showToast({
					title: msg
				})

			}
		}
	}
</script>

<style>

</style>
