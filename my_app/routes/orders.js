// 订单集合（orders）
var express = require('express');
var router = express.Router();

const {addOrders, getOrders,getOrdersByPage,delOrders,changeOrders,alterOrders} = require("../server/ordersServer");

// 新增订单
router.post('/addOrders', async (req, res, next) => {
    const data = await addOrders(req.body);
    res.send(data);
});

//删除订单

//修改付款状态
router.post('/alterOrders', async (req, res) => {
    res.send(await alterOrders(req.body));
});


//后台系统删除订单数据
router.delete('/:_id',async (req, res, next) => {
    const data = await delOrders({_id:req.params._id});
    res.send(data);
})

//后台修改订单信息

router.post('/changeOrders', async (req, res) => {
    res.send(await changeOrders(req.body));
});


// 分页获取用户数据
router.get('/getOrdersByPage', async (req, res, next) => {
    const data = await getOrdersByPage(req.query);
    res.send(data);
});

//获取
router.post('/getOrders', async (req, res, next) => {
    const data = await getOrders(req.body);
    res.send(data);
});

module.exports = router;