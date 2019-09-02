<template>
	<view>
		<view v-if="showHeader" class="header" :style="{ position: headerPosition, top: headerTop, opacity: afterHeaderOpacity }">
			<!-- 定位城市 -->
			<view class="addr">
				<view class="icon location"></view>
				{{ city }}
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input placeholder="请输入商品的名字" placeholder-style="color:#c0c0c0;" @input="searchGood" v-model="inputSearch" />
				<view class="icon search"></view>
			</view>
			<!-- 右侧图标按钮 -->
			<view class="icon-btn">
				<view class="icon yuyin-home"></view>
				<view class="icon tongzhi" @tap="toMsg"></view>
			</view>
		</view>
		
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="goods in goodsList" :key="goods._id" @tap="toGoods(goods)">
					<image mode="widthFix" :src="'http://localhost:3001' + goods.images[0]"></image>
					<view class="name">{{ goods.name }}</view>
					<view class="info">
						<view class="price">{{ goods.price }}</view>
						<view class="slogan">12人付款</view>
					</view>
				</view>
			</view>
			<!-- <view class="loading-text">{{loadingText}}</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showHeader: true,
			city: '北京',
			inputSearch: '',
			goodsList: [],
			loadingText: '正在加载...',
			headerTop: '0px',
			headerPosition: 'fixed',
			orderbyList: [
				{ text: '销量', selected: true, orderbyicon: false, orderby: 0 },
				{ text: '价格', selected: false, orderbyicon: ['sheng', 'jiang'], orderby: 0 },
				{ text: '好评', selected: false, orderbyicon: false, orderby: 0 }
			],
			orderby: 'sheng'
		};
	},
	onLoad: function(option) {
		//兼容H5下排序栏位置
		// #ifdef H5
		//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
		let Timer = setInterval(() => {
			let uniHead = document.getElementsByTagName('uni-page-head');
			if (uniHead.length > 0) {
				this.headerTop = uniHead[0].offsetHeight + 'px';
				clearInterval(Timer); //清除定时器
			}
		}, 1);
		// #endif
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = 'fixed';
		} else {
			this.headerPosition = 'absolute';
		}
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		setTimeout(() => {
			this.reload();
			uni.stopPullDownRefresh();
		}, 1000);
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		uni.showToast({ title: '加载中' });
		let len = this.goodsList.length;
		if (len >= 2) {
			this.loadingText = '到底了';
			return false;
		} else {
			// this.loadingText="正在加载...";
		}
	},
	methods: {
		//商品跳转
		toGoods(item) {
			uni.navigateTo({
				url: '../goods?cid=' + encodeURIComponent(JSON.stringify(item)),
			});
		},
		//排序类型
		select(index) {
			let tmpTis = this.orderbyList[index].text + '排序 ';
			if (this.orderbyList[index].orderbyicon) {
				let type = this.orderbyList[index].orderby == 0 ? '升序' : '降序';
				if (this.orderbyList[index].selected) {
					type = this.orderbyList[index].orderby == 0 ? '降序' : '升序';
					this.orderbyList[index].orderby = this.orderbyList[index].orderby == 0 ? 1 : 0;
				}
				tmpTis += type;
			}
			this.orderbyList[index].selected = true;
			let len = this.orderbyList.length;
			for (let i = 0; i < len; i++) {
				if (i != index) {
					this.orderbyList[i].selected = false;
				}
			}
			uni.showToast({ title: tmpTis, icon: 'none' });
		},
		searchGood() {
			if (this.inputSearch != '') {
				uni.request({
					method: 'GET',
					url: 'http://localhost:3001/goods/queryGood',
					data: {
						name: this.inputSearch
					},
					success: res => {
						if (res.data) {
							this.goodsList = res.data;
						}
					}
				});
			} else {
				this.goodsList = '';
			}
		}
	}
};
</script>

<style lang="scss">
.header {
	width: 92%;
	padding: 0 4%;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #fff;

	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */

	.addr {
		width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		font-size: 28upx;
		.icon {
			height: 60upx;
			margin-right: 5upx;
			display: flex;
			align-items: center;
			font-size: 42upx;
			color: #ffc50a;
		}
	}
	.input-box {
		width: 100%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			padding-left: 28upx;
			height: 28upx;
			font-size: 28upx;
		}
	}
	.icon-btn {
		width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		.icon {
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 42upx;
		}
	}
}

.place {
	background-color: #ffffff;
	height: 100upx;
}
.goods-list {
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		width: 92%;
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product {
			width: 48%;
			border-radius: 20upx;
			background-color: #fff;
			margin: 0 0 15upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}
			.name {
				width: 92%;
				padding: 10upx 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 92%;
				padding: 10upx 4% 10upx 4%;

				.price {
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
				}
				.slogan {
					color: #807c87;
					font-size: 24upx;
				}
			}
		}
	}
}
</style>
