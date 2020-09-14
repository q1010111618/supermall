<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad: {
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,//3的话监听实时滚动
        pullUpLoad:this.pullUpLoad,
        click:true,//为了控制除button的其他元素的点击事件
      })

      //实时滚动监听事件
      this.scroll.on('scroll',(position)=>{
        this.$emit("scroll",position)//暴露事件
      })

      //监听上拉事件
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll&&this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll&&this.scroll.finishPullUp()
      },

      refresh(){
        console.log("---")
        this.scroll&&this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
