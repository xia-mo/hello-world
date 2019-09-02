// 申请集合 apply
var express = require('express');
var router = express.Router();

const { addApply, getApplyByPage, revise, deletes, getApply, queryApply } = require("../server/applyServer");

//新增申请
router.post('/addApply', async (req, res, next) => {
    console.log(req.body);
    const data = await addApply(req.body);
    res.send(data);
});

//全部获取申请
router.post('/getApply', async (req, res, next) => {
    const data = await getApply(req.body);
    res.send(data);
});

//删除
router.post('/deletes', async (req, res, next) => {
    const data = await deletes(req.body);
    res.send(data);
});

//获取
router.get('/getApplyByPage', async (req, res, next) => {
    const data = await getApplyByPage(req.query);
    res.send(data);
});

//修改申请状态
router.post('/revise', async (req, res, next) => {
    const data = await revise(req.body);
    res.send(data);
});

//查询申请是否存在
router.post('/queryApply', async (req, res, next) => {
    const data = await queryApply(req.body);
    res.send(data);
});

module.exports = router;