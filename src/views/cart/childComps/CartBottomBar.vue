<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "@/components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return "￥"+this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue+item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item=>item.checked).length
      },
      isSelectAll(){
        //let ifSelect=!(this.$store.state.cartList.filter(item=>item.checked).length)
        if(this.$store.state.cartList.length==0)return false
        let ifSelect=!this.$store.state.cartList.find(item=>!item.checked)
        console.log("ifSelect:",ifSelect)
        return ifSelect
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){//全部选中
          this.$store.state.cartList.forEach(item=>item.checked=false)
        }else{
          this.$store.state.cartList.forEach(item=>item.checked=true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    line-height: 40px;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 70px;
  }
  .check-button{
    width:20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price{margin-left: 10px;flex: 1}

  .calculate{
    width:90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
