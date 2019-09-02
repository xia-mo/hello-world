<template>
  <div style="margin-top: 20px;">
    <el-table :data="tableData" style="width: 100%" max-height="550">
      <el-table-column fixed prop="name" label="门店名称" width="150"></el-table-column>

      <el-table-column prop="address" label="门店地址" width="220"></el-table-column>
      <el-table-column prop="telephone" label="门店电话" width="150"></el-table-column>
      <el-table-column prop="date" label="创建日期" width="220"></el-table-column>
      <el-table-column prop="type" label="宠物类型" width="150"></el-table-column>
      <el-table-column prop="desc" label="门店介绍" width="220"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getStore();
  },
  methods: {
    getStore() {
      axios
        .get("shops/getShops")
        .then(res => {
          this.tableData = res.data;
        });
    }
  }
};
</script>

<style>
.cell {
  text-align: center;
}
</style>
