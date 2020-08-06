<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-with-animation :scroll-into-view="scrollInto" scroll-x class="scroll-row border-bottom border-light-secondary"
		 style="height: 100rpx;">
			<view class="scroll-row-item px-3 py-2 font-md " v-for="(item,index) in tabBars" :key="index" :id="'tab'+index"
			 :class="tabIndex===index?'text-main font-lg font-weight-bold':''" @click="changeTab(index)">{{item.name}}</view>
		</scroll-view>
		<swiper :style="'height:'+scrollH+'px'" :duration="1000" :current="tabIndex" @change="onChangeTab">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y :style="'height:'+scrollH+'px'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length>0">
						<block v-for="(item2,index2) in item.list" :key="index2">
							<!-- 列表 -->
							<common-list :item="item2" :index="index2" @follow="follow" @doSupport="doSupport"></common-list>
							<!-- 分割线 -->
							<divider />
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
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load-more.vue'
	const demo = [{
		userName: '昵称',
		userpic: '../../static/default.jpg',
		newstime: '2020-12-12 下午 04:30',
		isFollow: false,
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
		isFollow: false,
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
		isFollow: false,
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
			commonList,
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
				url: "../search/search?type=post"
			})
		},
		// 监听点击导航按钮点击事件
		onNavigationBarButtonTap() {
			this.navigateTo({
				url: "../add-input/add-input"
			})
			// uni.navigateTo()
		},
		onLoad() {
			console.log(this.$C.webUrl)
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
			},
			// 关注操作
			follow(index) {
				console.log('关注', index)
				let item = this.newsList[this.tabIndex]
				item.list[index].isFollow = true
				uni.showToast({
					title: '关注成功'
				})
			},
			// 顶踩操作
			doSupport(e) {
				console.log(e)
				// 拿到当前对象
				let list = this.newsList[this.tabIndex].list
				let item = list[e.index]
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
