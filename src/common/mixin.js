import utils from "./utils";

export const itemListenerMixin={
  data(){
    return {
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted(){
    //防抖，减少短时间内的重复频繁调用
    this.newRefresh=utils.debounce(this.$refs.scroll.refresh,300)

    this.itemImgListener=()=>{
      this.newRefresh()
    }

    //1.监听item中图片加载完成
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}
