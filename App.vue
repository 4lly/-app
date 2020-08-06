<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 检测更新
				// 网络监听
			uni.getNetworkType({
				success: (res) => {
					console.log(res)
					if(res.networkType==='none'){
						uni.showToast({
							title:'当前处于断网状态',
							icon:'none'
						})
					}
				}
			})
			uni.onNetworkStatusChange(res=>{
				console.log(res)
				if(res.networkType==='none'){
					uni.showToast({
						title:'当前处于断网状态',
						icon:'none'
					})
				}
			})
		
			// 初始化数据
			this.$store.dispatch('initUser')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			// 视频或者音乐停止播放
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	/*每个页面公共icon */
	@import './common/icon.css';
	/*每个页面公共动画库 */
	@import './common/animate.css';
	/*自定义样式库 */
	@import './common/free.css';
	/*本项目公共样式库 */
	@import './common/common.css';
</style>
