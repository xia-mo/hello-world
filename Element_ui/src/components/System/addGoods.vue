<template>
  <div style="overflow:auto;height:560px;margin:10px 0 0 20px">
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称" style="width:50%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" style="width:50%">
          <el-select v-model="form.classify" placeholder="请选择商品类型---">
            <el-option label="宠物" value="宠物"></el-option>
            <el-option label="服饰" value="服饰"></el-option>
            <el-option label="主粮" value="主粮"></el-option>
            <el-option label="零食" value="零食"></el-option>
            <el-option label="玩具" value="玩具"></el-option>
            <el-option label="日用" value="日用"></el-option>
            <el-option label="户外" value="户外"></el-option>
            <el-option label="宠物窝" value="宠物窝"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用宠物" style="width:50%">
          <el-select v-model="form.pet" placeholder="请选择宠物类型---">
            <el-option label="通用" value="通用"></el-option>
            <el-option label="狗" value="狗"></el-option>
            <el-option label="猫" value="猫"></el-option>
            <el-option label="鸟" value="鸟"></el-option>
            <el-option label="水禽" value="水禽"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" style="width:50%">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" style="width:50%">
          <el-input v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" style="width:50%">
          <el-input v-model="form.production"></el-input>
        </el-form-item>
        <el-form-item label="保质期" style="width:50%">
          <el-input v-model="form.shelfLife"></el-input>
        </el-form-item>
        <el-form-item label="商品产地" style="width:50%">
          <el-input v-model="form.producer"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" style="width:50%">
          <el-upload
            action="/upload"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-success="addressImages"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" style="width:50%">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addBtn">新增</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: "", // 名称
        classify: "", // 商品种类
        pet: "", // 适⽤用宠物（
        price: "", // 价格
        weight: "", // 重量量
        production: "", // ⽣生产⽇日期
        shelfLife: "", // 保质期
        producer: "", // 产地
        desc: "" // 商品描述
      },
      dialogImageUrl: "", //上传图片
      dialogVisible: false,
      form: {
        name: "",
        age: ""
      },
      images: [] // 商品图⽚片（列列表图/详情图...）
    };
  },
  methods: {
    addressImages(response, file, fileList) {
      //文件上传成功时触发的钩子
      // console.log(response, file, fileList);
      let imageUrl = "/upload/" + response;
      this.images.push(imageUrl);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      //文件列表移除文件时触发的钩子
      // for (let i = 0; i < this.images.length; i++) {
      // if (this.images[i] === file.url) {
      // this.images.splice(i, 1);
      // }
    },
    addBtn() {
      //新增商品
      const images = this.images;
      if (
        this.form.name !== "" &&
        this.form.classify !== "" &&
        this.form.pet !== "" &&
        this.form.weight !== "" &&
        this.form.price !== "" &&
        this.form.production !== "" &&
        this.form.shelfLife !== "" &&
        this.form.producer !== "" &&
        this.form.desc !== "" &&
        images !== []
      ) {
        axios
          .post("/goods/addGoods", {
            name: this.form.name,
            classify: this.form.classify,
            pet: this.form.pet,
            weight: this.form.weight,
            price: this.form.price,
            production: this.form.production,
            shelfLife: this.form.shelfLife,
            producer: this.form.producer,
            desc: this.form.desc,
            images,
            adminId: localStorage.getItem("adminId").split('"')[1]
          })
          .then(res => {
            if (res) {
              alert("新增成功");
              (this.form.name = ""),
                (this.form.classify = ""),
                (this.form.pet = ""),
                (this.form.weight = ""),
                (this.form.price = ""),
                (this.form.production = ""),
                (this.form.shelfLife = ""),
                (this.form.producer = ""),
                (this.form.desc = ""),
                (this.images = []);
            }
          });
      }else{
        alert("信息未填写完");
      }
    }
  }
};
</script>

<style>
el-form-item {
  width: 50%;
}
</style>
