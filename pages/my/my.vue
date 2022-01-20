<template>
	<view>
		<!-- 个人信息 -->
		<template v-if="!loginStatus">
			<!-- 未登录 -->
			<view class="flex align-center justify-center font py-2">
				登录社区，体验更多功能
			</view>
			<other-login></other-login>
			<navigator url="../login/login" class=" flex align-center justify-center font py-2 text-secondary ">
				账号/邮箱/手机号登录 <text class="icon icon-jinru ml-1 "></text>
			</navigator>
			
		</template>
		<!-- 已登录 -->
		<template v-else>
			<view class="flex align-center p-2 " hover-class="bg-light" @click="open" >
				<image :src="user.avatarUrl?user.avatarUrl:'/static/default.jpg'" mode="widthFix" style="width: 100rpx;height: 100rpx;" class="rounded-circle mr-2"></image>
				<view class="flex flex-column flex-1">
					<text class="font-lg font-weight-bold text-dark">{{user.nickName?user.nickName:'昵称'}}</text>
					<text class="font text-muted">总帖子10 今日发帖1</text>
				</view>
				<text class="icon icon-jinru"></text>
			</view>
		</template>
		
<!-- 数据 -->
		<view class="flex align-center px-3 py-2">
			<view class="flex-1 flex flex-column align-center justify-center" v-for="(item,index) in myData" :key="index">
				<text class="font-lg font-weight-bold">{{item.num}}</text>
				<text class="font text-muted">{{item.name}}</text>
			</view>
		</view>
		<!-- 广告业 -->
		<view class="px-3 py-2">
			<image src="../../static/demo/banner1.jpg" style="height: 170rpx;" class="w-100 rounded" mode="aspectFill"></image>
		</view>
		<!-- list 操作列表 -->
		<uni-list-item title="浏览历史" showExtraIcon>
			<text class="icon icon-liulan" slot="icon"></text>
		</uni-list-item>
		<uni-list-item title="社区认证" showExtraIcon>
			<text class="icon icon-huiyuanvip" slot="icon"></text>
		</uni-list-item>
		<uni-list-item title="审核帖子" showExtraIcon>
			<text class="icon icon-keyboard" slot="icon"></text>
		</uni-list-item>
		<uni-list-item title="邀请好友" showExtraIcon @click="share">
			<text class="icon icon-fenxiang" slot="icon"></text>
		</uni-list-item>
		<template v-if="shareStatus">
			<share-card :shares="shares" @share="share"></share-card>
		</template>
	</view>
</template>
<script>
	import otherLogin from '@/components/common/other-login.vue'
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import shareCard from '@/components/share-card/share-card.vue'
	import {mapState} from 'vuex'
export default {
	components:{
		uniListItem,
		otherLogin,
		shareCard
	},
	data() {
		return {
			shares:[
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589544229011&di=f8ab67b91bd5a1b9676e70555ff40894&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201603%2F01%2F20160301150332_wCkYM.thumb.700_0.jpeg',
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589544229008&di=0b05f639d0ed45d5d00c76b18c04bb91&imgtype=0&src=http%3A%2F%2Fpic.soutu123.com%2Fback_pic%2F04%2F05%2F59%2F25580d91c912af1.jpg%2521%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue'
			],
			shareStatus:false,
			myData: [{ name: '帖子', num: 1 }, { name: '动态', num: 6 }, { name: '评论', num: 1 }, { name: '粉丝', num: 0 }]
		};
	},
	computed:{
		...mapState(['loginStatus','user'])
	},
	onNavigationBarButtonTap(){
		this.navigateTo({
				url:'../user-set/user-set'
		})
		
	},
	
	methods: {
		open(){
			// uni.navigateTo({
			// 	url:'../user-set/user-set'
			// })
		},
		share(){
			this.shareStatus = !this.shareStatus
		}
	}
};
</script>

<style></style>
