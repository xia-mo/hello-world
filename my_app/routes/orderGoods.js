// 订单商品（orderGoods）
var express = require('express');
var router = express.Router();

const {addOrderGoods, getOrderGoods,} = require("../server/orderGoodsServer");

//新增
router.post('/addOrderGoods', async (req, res, next) => {
    const data = await addOrderGoods(req.body);
    res.send(data);
});


//获取
router.get('/getOrderGoods', async (req, res, next) => {
    const data = await getOrderGoods(req.query);
    res.send(data);
});

module.exports = router;