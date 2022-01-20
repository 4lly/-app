<template>
	<view>
		<uni-list-item title="头像" @click="changeAvatarUrl">
			<view slot="right" class="flex align-center">
				<image :src="user.avatarUrl?user.avatarUrl:'/static/default.jpg'" style="height: 100rpx;width: 100rpx;border-radius: 50%;"
				 mode="aspectFill"></image>
				<text class="icon icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="昵称">
			<view slot="right" class="flex align-center">
				<input type="text" class="uni-input text-right" v-model="nickName" />
				<text class="icon icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="性别" @click="changeSex">
			<view slot="right" class="flex align-center">
				<text>{{sexText}}</text>
				<text class="icon icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="onDateChange">
			<uni-list-item title="生日">
				<view slot="right" class="flex align-center">
					<text>{{birthday}}</text>
					<text class="icon icon-bianji1 ml-2"></text>
				</view>
			</uni-list-item>
		</picker>
		<uni-list-item title="情感" @click='changeEmotion'>
			<view slot="right" class="flex align-center">
				<text>{{emotionText}}</text>
				<text class="icon icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="职业" @click='changeJob'>
			<view slot="right" class="flex align-center">
				<text>{{job}}</text>
				<text class="icon icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="家乡" @click="showCityPicker">
			<view slot="right" class="flex align-center">
				<text>{{pickerText}}</text>
				<text class="icon icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx; border: 0;" type="primary" @click="submit">完成</button>

			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm"></mpvue-city-picker>

		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import mpvueCityPicker from '@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue'
	const sexArry = ['保密', '男', '女']
	const emotionArray = ['保密', '已婚', '未婚']
	const jobArray = ['IT', '教师', '农民']
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			uniListItem,
			mpvueCityPicker
		},
		data() {
			return {
				nickName: '昵称',
				sex: 0,
				emotion: 0,
				job: '保密',
				birthday: '2012-12-12',
				themeColor: '#007AFF',
				pickerValueDefault: [0, 0, 1],
				pickerText: '未知'
			}
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
				return true
			}
		},
		computed: {
			...mapState(['user']),
			sexText() {
				return sexArry[this.sex]
			},
			emotionText() {
				return emotionArray[this.emotion]
			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onShow(){
			this.__init()
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 修改生日
			onDateChange(e) {
				this.$nextTick(() => {
					this.birthday = e.detail.value
				})
			},
			// 修改头像
			changeAvatarUrl() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						console.log(res);
						// 数据修改后重新渲染页面
						// this.$nextTick(() => {
						let avatarUrl = res.tempFilePaths[0]
						this.$store.commit('editUserInfo', {
							key: 'avatarUrl',
							value: avatarUrl
						})
						console.log(this.user)
						uni.showToast({
							title: '修改头像成功'
						})
						// })

					}
				});
			},
			// 修改性别
			changeSex() {
				uni.showActionSheet({
					itemList: sexArry,
					success: res => {
						this.$nextTick(() => {
							this.sex = res.tapIndex
						})
					}
				});
			},
			// 修改情感
			changeEmotion() {
				uni.showActionSheet({
					itemList: emotionArray,
					success: res => {
						this.$nextTick(() => {
							this.emotion = res.tapIndex
						})
					}
				});
			},
			// 修改职业
			changeJob() {
				uni.showActionSheet({
					itemList: jobArray,
					success: res => {
						this.$nextTick(() => {
							this.job = jobArray[res.tapIndex]
						})
					}
				});

			},
			showCityPicker() {
				this.$refs.mpvueCityPicker.show()
			},
			// 三级联动
			onConfirm(e) {
				console.log(e)
				this.$nextTick(() => {
					this.pickerText = e.label
					this.pickerValueDefault = e.value
				})
			},
			__init(){
				let userinfo = this.user.userinfo
				this.nickName = this.user.nickName
				this.birthday= userinfo.birthday,
				this.sex= userinfo.sex,
				this.job= userinfo.job,
				this.emotion= userinfo.emotion,
				this.pickerText= userinfo.pickerText
				this.pickerValueDefault = userinfo.pickerValueDefault
			},
			submit() {
				let info = {
					birthday: this.birthday,
					sex: this.sex,
					job: this.job,
					emotion: this.emotion,
					pickerText: this.pickerText,
					pickerValueDefault:this.pickerValueDefault
				}
				this.$store.commit('editUserInfo', {
					key: 'nickName',
					value: this.nickName
				})
				this.$store.commit('editUserInfo', {
					key: 'userinfo',
					value: info
				})
				uni.showToast({
					title: '修改资料成功'
				})
			}
		}
	}
</script>

<style>

</style>
