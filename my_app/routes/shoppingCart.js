// 购物车集合（shoppingCart）
var express = require('express');
var router = express.Router();

const { addShoppingCart, deletes, getShoppingCart, revise, validate } = require("../server/shoppingCartServer");

// 新增
router.post('/addShoppingCart', async (req, res, next) => {
    console.log(req.body);
    const data = await addShoppingCart(req.body);
    res.send(data);
});

//删除
router.post('/deletes', async (req, res, next) => {
    const data = await deletes(req.body);
    res.send(data);
});

//全部获取
router.get('/getShoppingCart', async (req, res, next) => {
    const data = await getShoppingCart(req.query);
    res.send(data);
});

// 修改
router.post('/revise', async (req, res, next) => {
    const data = await revise(req.body);
    res.send(data);
});

// 验证是否已经存在
router.get("/validate", async (req, res, next) => {
    const data = await validate(req.query);
    res.send(data);
})
module.exports = router;
