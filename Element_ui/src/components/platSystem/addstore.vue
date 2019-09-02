<template>
  <div>
    <div style="margin-top: 20px;">
      <el-table :data="applyData.apply" style="width: 100%;" max-height="400" class="table">
        <el-table-column prop="adminId.account" label="门店员账号" width="320"></el-table-column>
        <el-table-column prop="shopId.name" label="门店名称" width="320"></el-table-column>
        <el-table-column fixed="right" label="操作" width="320">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(applyData.apply[scope.$index]._id)"
              type="text"
              size="small"
            >通过</el-button>
            <el-button
              @click.native.prevent="deleteRowOff(applyData.apply[scope.$index]._id)"
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
        :current-page="~~applyData.currentPage"
        :page-sizes="[6, 7, 8]"
        :page-size="~~applyData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="applyData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
//新增门店管理
import axios from "axios";
export default {
  created() {
    this.getApplyByPage();
  },
  methods: {
    deleteRow(applyId) {
      axios
        .post("/apply/revise", {
          status: 2, // 申请状态（ 1 申请中/ 2 已通过/ 3 未通过）
          applyId: applyId
        })
        .then(res => {
          this.getApplyByPage();
        });
    },
    deleteRowOff(applyId) {
      axios
        .post("/apply/revise", {
          status: 3, // 申请状态（ 1 申请中/ 2 已通过/ 3 未通过）
          applyId: applyId
        })
        .then(res => {
          // this.deleteApply(applyId);
          this.getApplyByPage();
        });
    },
    handleSizeChange(val) {
      this.applyData.pageSize = val;
      this.getApplyByPage();
    },
    handleCurrentChange(val) {
      this.applyData.currentPage = val;
      this.getApplyByPage();
    },
    getApplyByPage() {
      //分页获取数据
      axios
        .get("/apply/getApplyByPage", {
          params: {
            currentPage: this.applyData.currentPage,
            pageSize: this.applyData.pageSize,
            status: 1,
            type: "新门店申请"
          }
        })
        .then(res => {
          this.applyData = res.data;
        });
    }
  },

  data() {
    return {
      applyData: {
        currentPage: 1, // 当前页
        pageSize: 6, // 每页显示条数
        totalPages: 0, // 总页数
        totalCount: 0, // 总条数
        length: 0,
        apply: [] // 门店数据
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
