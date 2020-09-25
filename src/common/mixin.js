import utils from "./utils";
import BackTop from "@/components/content/backTop/BackTop";

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

export  const  backTopMixin={
  data(){
    return {
      backTopShow:true,
    }
  },
  components:{
    BackTop
  },
  methods:{
    //回到頂部
    backClick(){
      this.$refs.scroll.scrollTo(0,0)//0,0回到顶部
    },
    listenShowBackTop(position){
      this.backTopShow=(-position.y)>1000//动态显示回到顶部按钮
    }
  }
}
