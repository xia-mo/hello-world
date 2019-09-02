
var express = require('express');
var router = express.Router();

const {allotGoodstoShops} = require("../server/allotsServer");

//将商品新增到门店
router.post('/allotGoodstoShops', async (req, res, next) => {
    const data = await allotGoodstoShops(req.body);
    res.send(data);  
});


module.exports = router;