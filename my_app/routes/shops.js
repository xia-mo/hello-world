// 门店集合（shops）
var express = require('express');
var router = express.Router();

const { addShops, getShopsByPage, deletes,getShops,upData } = require("../server/shopsServer");

//新增门店
router.post('/addShops', async (req, res, next) => {
    const data = await addShops(req.body);
    res.send(data);
    console.log(data)
});

//获取门店
router.get('/getShops', async (req, res, next) => {
    const data = await getShops(req.query);
    res.send(data);
});

//修改门店
router.post('/upData', async (req, res, next) => {
    const data = await upData(req.body);
    res.send(data);
});

//删除
router.post('/deletes', async (req, res, next) => {
    const data = await deletes(req.body);
    res.send(data);
});

//分页获取
router.get('/getShopsByPage', async (req, res, next) => {
    const data = await getShopsByPage(req.query);
    res.send(data);
});

module.exports = router;