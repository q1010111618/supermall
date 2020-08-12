<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommond-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 10px solid #eee;
  }
  .recommond-item{
    flex: 1;
    width: 25%;
    padding: 5px;
    text-align: center;
  }
  .recommond-item img{
    width: 100%;
    margin-bottom: 5px;
  }
</style>
