<template>
  <tab-bar>
    <tab-bar-item path="/home" >
      <!--路径别名，在webpack.base.conf.js里resolve配置
        配置完了之后js可以直接使用别名，但是元素的src要使用~前缀 -->
      <img src="@/assets/img/tabbar/home.png" slot="item-icon">
      <img src="@/assets/img/tabbar/home_active.png" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" >
      <img src="@/assets/img/tabbar/type.png" slot="item-icon">
      <img src="@/assets/img/tabbar/type_active.png" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img src="@/assets/img/tabbar/shopcar.png" slot="item-icon">
      <img src="@/assets/img/tabbar/shopcar_active.png" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="profile" >
      <img src="@/assets/img/tabbar/person.png" slot="item-icon">
      <img src="@/assets/img/tabbar/person_active.png" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tab-bar-item>
    <!--<div class="tab-bar-item">
      <img src="./assets/img/tabbar/home.png">
      首页
    </div>
    <div class="tab-bar-item">
      <img src="./assets/img/tabbar/type.png">
      分类
    </div>
    <div class="tab-bar-item">
      <img src="./assets/img/tabbar/type.png">
      购物车
    </div>
    <div class="tab-bar-item">
      <img src="./assets/img/tabbar/type.png">
      我的
    </div>-->
  </tab-bar>
</template>

<script>
  import TabBar from '@/components/common/tabbar/TabBar'
  import TabBarItem from "@/components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBarItem,
      TabBar
    }
  }
</script>

<style scoped>

</style>
