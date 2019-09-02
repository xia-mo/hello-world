// 商品集合（goods）
var express = require('express');
var router = express.Router();
const { addGoods, getGoods, delGoods, queryGoods, queryGood, modGoods, queryGoodsByPage, getGoodsByPage, addGoodstoShops } = require("../server/goodsServer");

//新增
router.post('/addGoods', async (req, res, next) => {
    const data = await addGoods(req.body);
    res.send(data);
});

//获取
router.get('/getGoods', async (req, res, next) => {
    const data = await getGoods(req.query);
    res.send(data);
});

// 分页获取列表
router.get('/getGoodsByPage', async (req, res, next) => {
    const data = await getGoodsByPage(req.query);
    res.send(data);
});

//删除
router.delete('/:_id', async (req, res, next) => {
    const data = await delGoods({ _id: req.params._id });
    res.send(data);
})
//查询
router.get("/queryGoods", async (req, res, next) => {
    const data = await queryGoods(req.query);
    res.send(data);
})
//修改
router.put("/", async (req, res, next) => {
    console.log("1-1", req.body)
    const data = await modGoods(req.body);
    res.send(data);
})

//分页查询
router.get("/queryGoodsByPage", async (req, res, next) => {
    const data = await queryGoodsByPage(req.query);
    res.send(data);
})

//用户搜索
router.get("/queryGood", async (req, res, next) => {
    const data = await queryGood(req.query);
    res.send(data);
})



//将商品新增到门店
router.post('/addGoodstoShops', async (req, res, next) => {
    const data = await addGoodstoShops(req.query);
    res.send(data);
});


module.exports = router;