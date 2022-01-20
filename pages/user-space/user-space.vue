<template>
	<view>
		<!-- 头部 -->
		<view class="flex align-center p-3 border-bottom border-light-secondary" style="height: 240rpx;">
			<image src="../../static/default.jpg" class="rounded-circle" style="width: 180rpx;height: 180rpx;" mode=""></image>
			<view class="pl-3 flex flex-column flex-1">
				<view class="flex align-center ">
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">获赞</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">关注</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
				</view>
				<view class="flex align-center justify-center">
					<button type="primary" size="mini" style="width: 400rpx;" class="bg-main w-100">关注</button>
				</view>
			</view>
		</view>
		<!-- tab -->
		<view class="flex align-center " style="height: 100rpx;">
			<view class="flex-1 flex align-center justify-center " :class="tabIndex===index?'font-lg font-weight-bold text-main':'font-md'"
			 v-for="(item,index) in tabBars" :key="index" @click="changeTab(index)">{{item.name}} <text class="ml-2" v-if="item.num>0">{{item.num}}</text>
			</view>
		</view>
		<!-- 列表 -->
		<template v-if="tabIndex === 0">
			<view class="animated fast fadeIn">
				<view class="p-3 border-bottom">
					<view class="font-md">账号信息</view>
					<view class="font">账号年龄：12个月</view>
					<view class="font">账号ID：1</view>
				</view>
				<view class="p-3 border-bottom">
					<view class="font-md">个人信息</view>
					<view class="font">星座：天蝎座</view>
					<view class="font">职业：IT</view>
					<view class="font">故乡：I中国</view>
					<view class="font">情感：未婚</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="animated fast fadeIn">
				<!-- 列表 -->
				<common-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list>
				<!-- 分割线 -->
				<divider />
				<!-- 上拉加载更多 -->
				<load-more :loadmore="loadText"></load-more>
			</view>
		</template>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view class="flex align-center justify-center border-bottom p-2 font-md " hover-class="bg-light" @click="popupEvent('friend')">
				<text class="icon icon-sousuo mr-2"></text>加入黑名单
			</view>
			<view class="flex align-center justify-center border-bottom p-2 font-md"  hover-class="bg-light" @click="popupEvent('clear')">
				<text class="icon icon-shanchu mr-2"></text>聊天
			</view>
		
		</uni-popup>

	</view>
</template>

<script>
	import loadMore from '@/components/common/load-more.vue'
	import commonList from '@/components/common/common-list.vue'
		import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
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
			loadMore,
			commonList,
			uniPopup
		},
		data() {
			return {
				scrollH: 600,
				tabIndex: 0,
				tabBars: [{
						name: "主页",
						loadmore: '上拉加载更多'
					},
					{
						name: "帖子",
						// 1上拉加载更多 2 加载中 3没有更多了
						loadmore: '上拉加载更多',
						list: demo
					}, {
						name: "动态",
						// 1上拉加载更多 2 加载中 3没有更多了
						loadmore: '上拉加载更多',
						list: demo
					}
				]
			}
		},
		computed: {
			list() {
				return this.tabBars[this.tabIndex].list
			},
			loadText() {
				return this.tabBars[this.tabIndex].loadmore
			}
		},
		// 监听原生导航栏按钮事件
		onNavigationBarButtonTap(e) {
			this.$refs.popup.open()
		},
		onBackPress(){
				this.$refs.popup.close()
		},
		onLoad() {
			
		},
		methods: {
		
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
			// 关注操作
			follow(index) {
				console.log('关注', index)
				let item = this.tabBars[this.tabIndex].list[index]
				item.isFollow = true
				uni.showToast({
					title: '关注成功'
				})
			},
			// 顶踩操作
			doSupport(e) {
				console.log(e)
				// 拿到当前对象
				let list = this.tabBars[this.tabIndex].list
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

			},
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
			popupEvent(e){
				switch (e){
					case 'friend':
					// uni.navigateTo({
					// 	url:'../search/search?type=user'
					// })
					console.log('加入黑名单')
						break;
					case 'clear':
					console.log('聊天')
						break;
				}
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>

</style>
