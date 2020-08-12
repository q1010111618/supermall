<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--使用插槽的时候最好加上一层div-->
    <div v-if="!isActive"><slot name="item-icon" ></slot></div>
    <div v-else> <slot name="item-icon-active"></slot></div>

    <!--插槽不能设置样式，没有效果，所以加上div包裹-->
    <div :style="activeStyle">
      <slot name="item-text" ></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:"#00b8ff"
      }
    },
    data(){
      return {
        //isActive:true,
      }
    },
    computed:{
      isActive(){
        //判断活跃路由是否传进来的path
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    /*flex:1等间隔分布*/
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    margin-bottom: -2px;
  }

  /*.active{
    color: #00b8ff;
  }*/
</style>
