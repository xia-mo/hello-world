<template>
  <div style="margin: 20px 0 0 20px;">
    <el-table :data="tableData" style="width: 100%" max-height="250">
      <el-table-column fixed prop="username" label="用户名" width="270"></el-table-column>
      <el-table-column prop="name" label="姓名" width="270"></el-table-column>
      <el-table-column prop="phone" label="联系电话" width="270"></el-table-column>
      <el-table-column prop="image" label="用户头像" width="280">
        
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created(){
    this.addUsers();
  },
  methods: {
    addUsers() {
      axios
        .get("/users/getUsers")
        .then(res => {
          this.tableData=res.data
        });
    },
  },
  data() {
    return {
      tableData: [],
    };
  }
};
</script>

<style>
.cell {
  text-align: center;
}
</style>
