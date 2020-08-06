<template>
	<view>
		<!-- 帖子  -->
		<common-list :item="info" isdetail @doShare="doShare" @follow="follow" @doSupport="doSupport">
			<view class="">
				{{info.content}}
				<view class="">
					<image v-for="(item,index) in info.images" :key="index" :src="item.url" mode="widthFix" class="w-100" @click="preview(index)"></image>
				</view>
			</view>
		</common-list>
		<divider></divider>
		<!-- 评论列表 -->
		<view class="p-2 font-md font-weight-bold">
			最新评论 {{comments.length}}
		</view>

		<view class="px-2">
			<view class="uni-comment-list" v-for="(item,index) in comments" :key="index">
				<view v-if="item.fid" style="width: 60rpx;"></view>
				<view class="flex w-100" :class="item.fid ? 'bg-light rounded p-2' : ''">
					<view class="uni-comment-face">
						<image :src="item.userpic" class="rounded-circle" mode="widthFix"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>{{item.username}}</text>
						</view>
						<view class="uni-comment-content" @click="reply(item.id)">{{item.data}}</view>
						<view class="uni-comment-date">
							<view>{{item.time}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 占位 -->
		<view style="height: 100rpx;">
		</view>
		<!-- 底部评论 -->
		<bottom-input @submit="submit"></bottom-input>
		<!-- 分享 -->
		<more-share ref="share"></more-share>


	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
	import moreShare from '@/components/common/more-share.vue'
	import $T from '@/common/time.js'

	export default {
		components: {
			commonList,
			bottomInput,
			moreShare
		},
		data() {
			return {
				
				info: {
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
					share_num: 0,
					content: '地我是标题我是地我是标题我是地我是标题我是标题我是标题煞地我是标题我是标题我是标题煞地我是标题我是标题我是标题煞地我是标题我是标题我是标题煞地我是标题我是标题我是标题煞标题我是标题煞标题我是标题煞',
					images: [{
							url: "https://edu-image.nosdn.127.net/43defb95dd2e460e8b7329d77be9bb0a?imageView&thumbnail=120y120&quality=100"
						},
						{
							url: "http://image.finance.china.cn/picupload/2011/1216/12_25103623_20111216165107.jpg"
						}
					]
				},
				comments: [{
					userpic: 'https://edu-image.nosdn.127.net/43defb95dd2e460e8b7329d77be9bb0a',
					username: 'lly',
					data: '少时诵诗书',
					time: 1570783530
				}]
			}
		},
		computed: {
			imagesList() {
				return this.info.images.map(item => item.url)
			}
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			this.$refs.share.open({
				shareText:'分享文本',
			
				href: "https://uniapp.dcloud.io",
				image: 'https://edu-image.nosdn.127.net/43defb95dd2e460e8b7329d77be9bb0a'
			})
		},
		onBackPress() {
			this.$refs.share.close()
		},
		onLoad(e) {
			if (e.detail) {
				// 初始化
				this.__init(JSON.parse(e.detail))
				// console.log(e.detail)
			}

		},
		methods: {

			// 初始化
			__init(data) {
				uni.setNavigationBarTitle({
					title: data.title
				})
				// 请求api
			},
			// 分享
			doShare() {
					this.$refs.share.open()
			},
			// 评论
			doComment() {

			},
			// 关注操作
			follow(index) {
				console.log('关注', index)
				this.info.isFollow = true
			},
			// 顶踩操作
			doSupport(e) {
				console.log(e)
				console.log(this.info)
				if (this.info.support.type === e.type) {
					return uni.showToast({
						title: "你已经操作过了",
						icon: 'none'
					})
				}
				let msg = e.type === 'support' ? '顶' : '踩'
				// 判断之前是否操作过
				if (this.info.support.type === '') {
					this.info.support.type = e.type
					this.info.support[e.type + '_count']++
				} else if (this.info.support.type === 'support' && e.type === 'unsupport') {
					// 之前顶了现在操作是踩
					this.info.support.unsupport_count++
					this.info.support.support_count--
				} else if (this.info.support.type === 'unsupport' && e.type === 'support') {
					// 之前踩了现在操作是顶
					this.info.support.unsupport_count--
					this.info.support.support_count++
				}
				this.info.support.type = e.type

				// this.$set(this.list, e.index, item)
				uni.showToast({
					title: msg
				})

			},
			// 预览图片
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.imagesList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})
			},
			submit(content) {},
			reply() {}
		}
	}
</script>

<style>

</style>
