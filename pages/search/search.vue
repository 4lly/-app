<template>
	<view>
		<template v-if="searchList.length===0">
			<!-- 搜索历史 -->
			<view class="py-2 font-md px-2">搜索历史</view>
			<view class="flex  flex-wrap">
				<view class="border rounded font text-light-muted mx-2 my-1 px-2 " v-for="(item,index) in list" :key="index"
				 hover-class="bg-light" @click="clickSearchHistory(item)">{{item}}</view>
			</view>
		</template>
		<template v-else>
			<!-- 数据列表 -->
			<block v-for="(item,index) in searchList" :key="index">
				<template v-if="type ==='post'">
					<common-list :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list>
					<divider />
				</template>
				<template v-if="type ==='user'">
					<user-list :item="item" :index="index"></user-list>
				</template>
				<template v-if="type ==='topic'">
					<topic-list :item="item" :index="index"></topic-list>
				</template>
			</block>
		</template>

	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	import userList from '@/components/user-list/user-list.vue'
	import topicList from '@/components/news/topic-list.vue'


	const demo1 = [{
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
	const demo2 = [{
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
	const demo3 = [{
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
			commonList,
			userList,
			topicList
		},
		data() {
			return {
				searchText: '',
				list: ['uni-app第二级商城实战', 'Vue实战教程', 'React系列'],
				searchList: [],
				type: 'post'
			}
		},
		onLoad(e) {
			console.log(e.type)
			if (e.type) {
				this.type = e.type
			}
			let pageTitle = '帖子'
			switch (e.type) {
				case 'user':
					pageTitle = '用户'
					break;
				case 'post':
					pageTitle = '帖子'
					break;
				case 'topic':
					pageTitle = '话题'
					break;
			}
			// 修改搜索占位符
			// #ifdef APP-PLUS
			let currentWebview = this.$scope.$getAppWebview();
			let tn = currentWebview.getStyle().titleNView
			tn.searchInput.placeholder = '搜索' + pageTitle
			currentWebview.setStyle({
				titleNView: tn
			})
			// #endif

		},
		// 监听导航输入
		onNavigationBarSearchInputChanged(e) {
			console.log(e.text)
			this.searchText = e.text
		},
		// 监听点击导航栏搜索按钮
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent()
			}
		},
		methods: {
			// 点击搜索历史
			clickSearchHistory(text) {
				this.searchText = text
				this.searchEvent()

			},
			// 搜索事件
			searchEvent() {
				// 收起键盘
				uni.hideKeyboard()
				// 处于loadding状态
				uni.showLoading({
					title: 'loadding...',
					mask: true
				})
				// 请求搜索
				setTimeout(() => {
					switch (this.type) {
						case 'post':
							this.searchList = demo1
							break;
						case 'topic':
							this.searchList = demo2
							break;
						case 'user':
							this.searchList = demo3
							break;
					}
					// 隐藏loadding状态
					uni.hideLoading()
				}, 3000)
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
