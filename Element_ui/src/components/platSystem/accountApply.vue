<template>
  <div>
    <div style="margin-top: 20px;">
      <el-table :data="adminsData.admins" style="width: 100%;" max-height="400" class="table">
        <el-table-column prop="account" label="门店员账号" width="320"></el-table-column>
        <el-table-column prop="name" label="门店员名称" width="320"></el-table-column>
        <el-table-column fixed="right" label="操作" width="320">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(adminsData.admins[scope.$index]._id)"
              type="text"
              size="small"
            >通过</el-button>
            <el-button
              @click.native.prevent="deleteRowOff(adminsData.admins[scope.$index]._id)"
              type="text"
              size="small"
            >不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="~~adminsData.currentPage"
        :page-sizes="[6, 7, 8]"
        :page-size="~~adminsData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="adminsData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
//账号申请
import axios from "axios";
export default {
  created() {
    this.getAdminsByPage();
  },
  methods: {
    deleteRow(adminsId) {
      axios
        .post("/admins/revise", {
          status: "已通过", // 申请状态（ 1 申请中/ 2 已通过/ 3 未通过）
          adminsId: adminsId
        })
        .then(res => {
          if (res.data) {
            this.getAdminsByPage();
          }
        });
    },
    deleteRowOff(adminsId) {
      axios
        .post("/admins/revise", {
          status: "未通过", // 申请状态（ 1 申请中/ 2 已通过/ 3 未通过）
          adminsId: adminsId
        })
        .then(res => {
          this.getAdminsByPage();
        });
    },
    handleSizeChange(val) {
      this.adminsData.pageSize = val;
      this.getAdminsByPage();
    },
    handleCurrentChange(val) {
      this.adminsData.currentPage = val;
      this.getAdminsByPage();
    },
    getAdminsByPage() {
      //分页获取数据
      axios
        .get("/admins/getAdminsByPage", {
          params: {
            currentPage: this.adminsData.currentPage,
            pageSize: this.adminsData.pageSize,
            position: "门店管理员",
            status: "申请中"
          }
        })
        .then(res => {
          this.adminsData = res.data;
        });
    }
  },

  data() {
    return {
      adminsData: {
        currentPage: 1, // 当前页
        pageSize: 6, // 每页显示条数
        totalPages: 0, // 总页数
        totalCount: 0, // 总条数
        length: 0,
        admins: [] // 门店数据
      }
    };
  }
};
</script>
<style>
.block {
  margin-top: 30px;
  text-align: center;
}
.cell {
  text-align: center;
}
</style>
