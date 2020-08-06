<template>
	<view>
		<topic-info :info="info"></topic-info>
		<divider></divider>
		<view class="p-2 flex align-center border-bottom " hover-class="bg-light" v-for="(item,index) in hotList" :key="index">
			<text class="icon icon-xihuan text-main"></text>
			<text class="text-dark font text-ellipsis">{{item.title}}</text>
		</view>
		<divider></divider>
		<!-- tab -->
		<view class="flex align-center ">
			<view class="flex-1 flex align-center justify-center " :class="tabIndex===index?'font-lg font-weight-bold text-main':'font-md'"
			 v-for="(item,index) in tabBars" :key="index" @click="changeTab(index)">{{item.name}}
			</view>
		</view>
		<!-- 列表 -->
		<template v-if="listData.length>0">
			<block v-for="(item,index) in listData" :key="index">
				<common-list :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list>
				<!-- 分割线 -->
				<divider />
				<!-- 上拉加载组件 -->
				<load-more :loadmore="loadtext"></load-more>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		

	</view>
</template>

<script>
	import topicInfo from '../../components/topic-detail/topic-info.vue'
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
			topicInfo,
			commonList,
			loadMore
		},
		data() {
			return {
				info: {},
				hotList: [{
						title: "【新人必读】uni-app实战第二季商城类项目开发"
					},
					{
						title: "【新人必读】uni-app实战第三季商城类项目开发"
					}
				],
				// 默认列表
				list1: [],
				loadtext1: '上拉加载更多',
				// 最新列表
				list2: [],
				loadtext2: '上拉加载更多',
				tabIndex: 0,
				tabBars: [{
						name: "默认"
					},
					{
						name: "最新"
					}

				]
			}
		},
		computed: {
			// 当前列表数据
			listData() {
				// if (this.tabIndex === 0) {
				// 	return this.list1
				// }
				// return this.list2
				return this['list' + (this.tabIndex + 1)]
			},
			// 当前上拉加载
			loadtext() {
				return this['loadtext' + (this.tabIndex + 1)]
			}
		},
		// 触地事件
		onReachBottom() {
			console.log('上拉加载更多')
			this.loadmore()
		},
		onLoad(e) {
			if (e.detail) {
				this.info = JSON.parse(e.detail)
			}
			this.list1 = demo
			// this.list2 = demo
		},
		methods: {
			// 上拉加载更多
			loadmore() {
				// 拿到当前列表
				let index = this.tabIndex
				// 判断是否处于可加载状态
				if (this.loadtext !== '上拉加载更多') return
				// 设置上拉加载状态处于加载中
				this['loadtext' + (index + 1)] = '加载中'
				setTimeout(() => {
					this['list' + (index + 1)] = [...this['list' + (index + 1)], ...this['list' + (index + 1)]]
					this['loadtext' + (index + 1)] = '上拉加载更多'
					console.log(this['list' + (index + 1)])
				}, 2000)
			},
			// 关注操作
			follow(index) {
				console.log('关注', index)
				this.list1[index].isFollow = true
				uni.showToast({
					title: '关注成功'
				})
			},
			// 顶踩操作
			doSupport(e) {
				console.log(e)
				// 拿到当前对象
				let item = this.list1[e.index]
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
			// 切换选项
			changeTab(index) {
				if (this.tabIndex === index) {
					return
				}
				this.tabIndex = index
			}
		}
	}
</script>

<style>
	.filter {
		filter: blur(10px);
	}
</style>
