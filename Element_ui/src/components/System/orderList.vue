<template>
  <div style="text-align:center">
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="userId.username" label="用户" width="250"></el-table-column>
      <el-table-column prop="orderGoodsId.goodId.name" label="宠物" width="200"></el-table-column>
      <el-table-column prop="orderGoodsId.count" label="数量" width="200"></el-table-column>
      <el-table-column prop="state" label="状态" width="200"></el-table-column>
      <el-table-column prop="time" label="下单时间" width="200"></el-table-column>
      <el-table-column label="操作" width="200">
        <template prop="_id" slot-scope="scope">
          <el-button type="text" @click="open(scope.row._id)">删 除</el-button>
          <el-button type="text" @click="change1(scope.row)">修 改</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form :label-position="labelPosition" label-width="80px">
              <el-form-item label="订单状态">
                <el-select v-model="state" placeholder="待付款">
                  <el-option value="待付款">待付款</el-option>
                  <el-option value="待发货">待发货</el-option>
                  <el-option value="待收货">待收货</el-option>
                  <el-option value="待评价">待评价</el-option>
                  <el-option value="退换货">退换货</el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="change(scope.row._id)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 3, 5, 10]"
      :page-size="pageSize"
      layout=" total,sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      goodsList: [],
      state: "",
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      total: 0,
      dialogVisible: false,
      labelPosition: "right",
      localId: " "
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      let currentPage1 = this.currentPage;
      this.getOrdersBypage(this.pageSize, currentPage1);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      let pageSize1 = this.pageSize;
      this.getOrdersBypage(pageSize1, this.currentPage);
    },

    getOrdersBypage(pageSize, currentPage) {
      //获取分页数据
      axios
        .get("/orders/getOrdersByPage", {
          params: { pageSize, currentPage }
        })
        .then(res => {
          // console.log(res.data);
          this.goodsList = res.data.pageMsg;
          this.totalCount = res.data.totalCount;
          this.totalPages = res.data.totalPages;
        });
    },

    remove(id) {
      //删除订单
      // console.log(id);
      axios.delete(`/orders/${id}`).then(res => {
        this.getOrdersBypage();
      });
    },
    change() {
      //点击确认修改订单
      // console.log(this.localId);
      this.dialogVisible = false;
      let time = new Date();
      axios
        .post("/orders/changeOrders", {
          _id: this.localId,
          state: this.state,
          // time: time
        })
        .then(res => {
          this.getOrdersBypage();
        });
    },

    change1(data) {
      //点击修改按钮弹出框
      this.dialogVisible = true;
      this.localId = data._id;
      this.state = data.state;

    },

    open1() {
      //修改订单信息弹窗
      this.$confirm(
        "检测到未保存的内容，是否在离开页面前保存修改？",
        "确认信息",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "保存",
          cancelButtonText: "放弃修改"
        }
      )
        .then(() => {
          this.$message({
            type: "info",
            message: "保存修改"
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面"
          });
        });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    open(id) {
      //删除提示
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        this.remove(id);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    }
  },

  created() {
    this.getOrdersBypage();
  },

};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
