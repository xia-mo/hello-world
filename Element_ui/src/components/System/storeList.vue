<template>
  <div>
    <div class="left">
      <el-table :data="tableData" style="width: 100%" max-height="550">
        <el-table-column fixed prop="shopId.name" label="门店名称" width="200"></el-table-column>
        <el-table-column prop="status" label="申请状态" width="90"></el-table-column>
        <el-table-column prop="shopId.address" label="门店地址" width="220"></el-table-column>
        <el-table-column prop="shopId.telephone" label="门店电话" width="130"></el-table-column>
        <el-table-column prop="shopId.date" label="创建日期" width="220"></el-table-column>
        <el-table-column prop="shopId.type" label="宠物类型" width="100"></el-table-column>
        <el-table-column prop="shopId.desc" label="门店介绍" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope" style="text-align: center;">
            <el-button
              @click.native.prevent="getData(scope.$index, tableData[scope.$index].shopId)"
              type="text"
              size="small"
              style="text-align: center;"
              @click="dialogTableVisible = true"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right">
      <el-dialog title="修改门店" :visible.sync="dialogTableVisible">
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
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                style="width: 100%;"
              ></el-date-picker>
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
            <el-button type="primary" @click="upData(form)">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      form: {
        _id: "",
        name: "",
        address: "",
        telephone: "",
        date: "",
        type: [],
        desc: ""
      },
      status: "",
      type: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      adminId: localStorage.getItem("adminId").split('"')[1],
    };
  },
  created() {
    this.getStore();
  },
  methods: {
    getData(index, rows) {
      this.form = rows;
    },
    upData(rows) {
      // this.tableData = this.tableData.map(item => {
      //   if (item.num == this.form.num) {
      //     return { ...this.form };
      //   }
      //   return item;
      // });

      const {
        _id,
        num,
        name,
        address,
        telephone,
        date,
        type,
        status,
        desc
      } = rows;
      axios
        .post("shops/upData", {
          _id,
          num,
          name,
          address,
          telephone,
          date,
          type,
          status,
          desc
        })
        .then(res => {
          this.getStore();
        });
    },
    getStore() {
      axios
        .post("apply/getApply", {
          adminId: this.adminId,
          type: "新门店申请"
        })
        .then(res => {
          this.tableData = res.data;
        });
    }
  }
};
</script>

<style>
.left {
  float: left;
  margin: 20px auto 0 auto;
  height: 100%;
}
.right {
  float: right;
  width: 40%;
  height: 30%;
}
.cell {
  text-align: center;
}
</style>
