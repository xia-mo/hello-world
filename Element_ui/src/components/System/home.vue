<template>
  <div id="bgImage">
    <el-carousel indicator-position="outside" class="ell">
      <el-carousel-item v-for="item in image" :key="item.id">
        <img :src="item.url" alt="" class="img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
	data(){
		return{
			image:[
		{id:0,url:require("../../assets/home7.jpg")},
		{id:1,url:require("../../assets/home3.jpg")},
		{id:2,url:require("../../assets/home5.jpg")}
			]
		}
	}
};
</script>

<style>
#bgImage {
  width: 100%;
  height:600px;
}
.img,.el-carousel__container{
   width: 99%;
   height: 560px;
}

</style>
