// 收货地址集合（ addresses ）
var express = require('express');
var router = express.Router();

const {addAddresses, getAddresses,} = require("../server/addressesServer");

//新增
router.post('/addAddresses', async (req, res, next) => {
    console.log(req.body);
    const data = await addAddresses(req.body);
    res.send(data);
});


//获取
router.get('/getAddresses', async (req, res, next) => {
    const data = await getAddresses(req.query);
    res.send(data);
});

module.exports = router;