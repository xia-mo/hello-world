<template>
  <div style="width:60%;height:100%;margin: 20px 0 0 50px;">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="门店名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="门店地址">
        <el-input v-model="form.address" placeholder="请输入门店详细地址"></el-input>
      </el-form-item>
      <el-form-item label="门店电话">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="宠物类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="犬" name="type"></el-checkbox>
          <el-checkbox label="猫" name="type"></el-checkbox>
          <el-checkbox label="鼠" name="type"></el-checkbox>
          <el-checkbox label="羊" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="门店介绍">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//申请新门店
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: "",
        address: "",
        telephone: "",
        date: "",
        type: [],
        desc: "",
        adminId: localStorage.getItem("adminId").split('"')[1]
      },
      index: 0
    };
  },
  methods: {
    onSubmit() {
      const { name, address, telephone, date, type, desc, adminId } = this.form;
      if (
        name !== "" &&
        address !== "" &&
        telephone !== "" &&
        date !== "" &&
        type !== [] &&
        desc !== ""
      ) {
        axios
          .post("shops/addShops", {
            name,
            address,
            telephone,
            date,
            type,
            desc,
            adminId
          })
          .then(res => {
            if (res.data[0]) {
              this.postApply(res.data[1]);
            }
          });
      } else {
        alert("信息未填写完")
      }
    },
    postApply(_id) {
      axios
        .post("apply/addApply", {
          type: "新门店申请",
          status: 1,
          adminId: this.form.adminId,
          shopId: _id
        })
        .then(res => {
          // console.log(res.data);
          if (res.data) {
            alert("申请已提交")
          }
        });
    }
  }
};
</script>

<style>
</style>
