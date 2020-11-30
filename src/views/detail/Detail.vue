<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>

    <!--组件监听需要使用native-->
    <back-top @click.native="backClick" v-show="backTopShow"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@/network/detail";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";
  import {mapActions} from 'vuex'

  import utils from "../../common/utils";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        //newRefresh:null,
        themeTopYs:[],
        getThemeTopY:null,

        currentIndex:0,
      }
    },
    created() {
      this.iid = this.$route.params.iid

      //2.根据iid请求数据
      getDetail(this.iid).then(res => {
        console.log(res)
        let data = res.data.result
        //1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages
        console.log("images:", this.topImages)

        //2.商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        console.log("商品信息:", this.goods)

        //3.店铺信息
        this.shop = new Shop(data.shopInfo)
        console.log("店铺信息：", this.shop)

        //4.获取商品详细信息
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        console.log("参数信息：", this.paramInfo)

        //6.取出评论信息
        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
          console.log("评论信息：",this.commentInfo)
        }

      })

      //3.请求推荐数据
      getRecommend().then(res=>{
        this.recommends=res.data.data.list
        console.log("推荐信息：",this.recommends)
      })

      //4.给getThemeTopY赋值
      this.getThemeTopY=utils.debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)

        console.log("高度",this.themeTopYs)
      },200)
    },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      //4.监听图片完成
      imageLoad() {
        //this.newRefresh()
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },

      titleClick(index){
        //console.log("点击：",index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },

      //监听滚动
      contentScroll(position){
        //1.获取Y值
        let positionnY=-position.y

        //2.positionY和主题中值进行对比
        let length=this.themeTopYs.length
        for(let i=0;i<length-1;i++){
          //console.log("高度是否相等：",this.currentIndex!==i)
          if(this.currentIndex!=i&&(positionnY>=this.themeTopYs[i]&&positionnY<this.themeTopYs[i+1])){
            this.currentIndex=i;
            console.log("标签：",this.currentIndex)
            this.$refs.nav.currentIndex=this.currentIndex
          }

          /*if(this.currentIndex!==i&&((i<length-1&&positionnY>=this.themeTopYs[i]&&positionnY<this.themeTopYs[i+1])
            ||(i===length-1&&positionnY>=this.themeTopYs[i]))){
            this.currentIndex=i;
            console.log("标签：",this.currentIndex)
            this.$refs.nav.currentIndex=this.currentIndex
          }*/
        }

        //3.是否显示回到顶部
        this.listenShowBackTop(position)
      },
      //监听购物车按钮
      addToCart(){
        //1.获取购物车需要展示的信息
        let product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.realPrice
        product.iid=this.iid

        //2.将商品添加到购物车(因为使用了mapActions)
        this.addCart(product).then(res=>{
          this.$toast.show(res,2000)
          console.log(res)
        })
        /*this.$store.dispatch("addCart",product).then(res=>{
          console.log(res)
        })*/
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
