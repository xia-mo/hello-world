<template>
	<view>
		<view class="block">
			<view class="content">
				<view class="orderinfo">
					<view class="row">
						<view class="nominal">订单名称:</view>
						<view class="text">{{ orderName }}</view>
					</view>
					<view class="row">
						<view class="nominal">订单金额:</view>
						<view class="text">{{ amount }}元</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">选择支付方式</view>
			<view class="content">
				<view class="pay-list">
					<view class="row" @tap="paytype = 'alipay'">
						<view class="left"><image src="/static/img/alipay.png"></image></view>
						<view class="center">支付宝支付</view>
						<view class="right"><radio :checked="paytype == 'alipay'" color="#f06c7a" /></view>
					</view>
					<view class="row" @tap="paytype = 'wxpay'">
						<view class="left"><image src="/static/img/wxpay.png"></image></view>
						<view class="center">微信支付</view>
						<view class="right"><radio :checked="paytype == 'wxpay'" color="#f06c7a" /></view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" @tap="doDeposit">立即支付</view>
			<view class="tis">
				点击立即支付，即代表您同意
				<view class="terms">《条款协议》</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			amount: 0,
			orderId: '',
			orderName: '',
			paytype: 'alipay' //支付类型
		};
	},
	onLoad(e) {
		this.amount = (~~e.amount).toFixed(2);
		console.log(this.amount);
		uni.getStorage({
			key: 'paymentOrder',
			success: e => {
				if (e.data.length > 1) {
					this.orderName = '多商品合并支付';
				} else {
					this.orderName = e.data[0].name;
				}
				uni.removeStorage({
					key: 'paymentOrder'
				});
			}
		});
	},
	methods: {
		orderForm(){
			const paymentO = uni.getStorageSync('paymentO');//待付款
			const goodId = uni.getStorageSync('buylist');
			if (paymentO.length!==0) {
				for (let i = 0; i < paymentO.length; i++) {
					this.Alter(paymentO[i]);
				}
			} else{
				console.log(goodId);
				for (let i = 0; i < goodId.length; i++) {
					this.addOrderGoods(goodId[i]);
				}
			}	
		},
		Alter(id){//修改付款状态
			uni.request({
				url: 'http://localhost:3001/orders/changeOrders', //地址。
				method: 'POST',
				data: {
					_id: id,
					state: '已付款' // 订单状态
				},
				success: res => {
					console.log(res.data);
					if (res.data) {
						uni.removeStorageSync('paymentO');
					}
				}
			});
		},
		addOrderGoods(goodId) {// 订单商品
			if (goodId) {
				// 上传服务器。
				uni.request({
					url: 'http://localhost:3001/orderGoods/addOrderGoods', //地址。
					method: 'POST',
					data: {
						goodId: goodId.id,
						count: goodId.number
					},
					success: res => {
						console.log(res.data);
						if (res.data[0]) {
							this.Delete(goodId._iD);
							this.addOrders(res.data[1]);
						}
					}
				});
			}
		},
		Delete(id){//购买付款后，删除购物车数据
			uni.request({
				url: 'http://localhost:3001/shoppingCart/deletes', //地址。
				method: 'POST',
				data: {
					_id: id
				},
				success: res => {
					console.log(res.data);
				}
			});
		},
		addOrders(orderGoodsId) {// 新增订单
			const userId = uni.getStorageSync('userID');
			let time = new Date();
			if (orderGoodsId) {
				uni.request({
					url: 'http://localhost:3001/orders/addOrders', //地址。
					method: 'POST',
					data: {
						userId: userId[0]._id,
						orderGoodsId: orderGoodsId,
						time: time.toLocaleDateString() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds(), // 下单时间
						state: '已付款' // 订单状态（待发货/待收货/待评价...）
					},
					success: res => {
						console.log(res.data);
						if (res.data[0]) {
							this.addAddresses();
						}
					}
				});
			}
		},
		addAddresses() {// 收货地址
			const address = uni.getStorageSync('address');
			const site = address.address.region.label + ',' + address.address.detailed;
			const userId = uni.getStorageSync('userID');
			let time = new Date();
			if (userId) {
				uni.request({
					url: 'http://localhost:3001/addresses/addAddresses', //地址。
					method: 'POST',
					data: {
						userId: userId[0]._id,
						name: userId[0].name, // 收件人名称
						phone: userId[0].phone, // 收件人联系电话
						address: site // 收件人地址
					},
					success: res => {
						console.log(res.data);
					}
				});
			}
		},
		doDeposit() {
			//模板模拟支付，实际应用请调起微信/支付宝
			uni.showLoading({
				title: '支付中...'
			});
			setTimeout(() => {
				uni.hideLoading();
				uni.showToast({
					title: '支付成功'
				});
				this.orderForm();
				setTimeout(() => {
					uni.redirectTo({
						url: '../../pay/success/success?amount=' + this.amount
					});
				}, 300);
			}, 700);
		}
	}
};
</script>

<style lang="scss">
.block {
	width: 94%;
	padding: 0 3% 40upx 3%;
	.title {
		width: 100%;
		font-size: 34upx;
	}
	.content {
		.orderinfo {
			width: 100%;
			border-bottom: solid 1upx #eee;
			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;
				.nominal {
					flex-shrink: 0;
					font-size: 32upx;
					color: #7d7d7d;
				}
				.text {
					width: 70%;
					margin-left: 10upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 32upx;
				}
			}
		}
		.pay-list {
			width: 100%;
			border-bottom: solid 1upx #eee;
			.row {
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;
				.left {
					width: 100upx;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					image {
						width: 80upx;
						height: 80upx;
					}
				}
				.center {
					width: 100%;
					font-size: 30upx;
				}
				.right {
					width: 100upx;
					flex-shrink: 0;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
}
.pay {
	margin-top: 20upx;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	.btn {
		width: 70%;
		height: 80upx;
		border-radius: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		background-color: #398bfb;
		box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.2);
	}
	.tis {
		margin-top: 10upx;
		width: 100%;
		font-size: 24upx;
		display: flex;
		justify-content: center;
		align-items: baseline;
		color: #999;
		.terms {
			color: #5a9ef7;
		}
	}
}
</style>
