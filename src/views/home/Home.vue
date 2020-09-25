<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>

    <!--组件监听需要使用native-->
    <back-top @click.native="backClick" v-show="backTopShow"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "@/components/common/navbar/NavBar";
  import Scroll from "@/components/common/scroll/Scroll";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getHomeMultidata,getHomeGoods} from "@/network/home";
  import {backTopMixin, itemListenerMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      Scroll,
      TabControl,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false,

        saveY:0,
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {

    },

    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1.保存Y值
      this.saveY=this.$refs.scroll.getScrollY()

      //2.取消全局时间的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      /**
       * 事件监听相关的方法
       */

      tabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break;
          case 1:
            this.currentType='new'
            break;
          case 2:
            this.currentType='sell'
            break;
        }
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl.currentIndex=index;
      },
      //滚动监听
      contentScroll(position){
        //console.log("y:",position.y)
        //this.backTopShow=(-position.y)>1000//动态显示回到顶部按钮
        this.listenShowBackTop(position)

        //决定tabControl是否吸顶（position:fixed)
        this.isTabFixed=-position.y>this.tabOffsetTop

      },
      //加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      //监听图片是否加载完毕确定高度
      swiperImageLoad(){
        //2.获取tabControl的offsetTop
        //所有的组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
        console.log("tabOffset:",this.tabOffsetTop)
      },

      /*
       * 網絡請求相關的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          console.log("数据请求返回：", res);
          //this.result=res;
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list
        }).catch(err => {
          console.log(err);
        })
      },
      getHomeGoods(type){
        let page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          //console.log("商品数据：",res);
          //...会解析数组
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page+=1
          //this.goods[type].list.splice(res.data.list)

          console.log("商品显示数据：",this.goods)

          this.$refs.scroll.finishPullUp()//结束上拉事件
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*position: relative;*/
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }


</style>
