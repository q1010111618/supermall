<template>
  <div class="cart-list">
    <li v-for="(item,index) in cartList" :key="index">{{item}}</li>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    computed:{
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>

</style>
