<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control"
                   @tabClick="tabClick"></tab-control>
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
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";



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
      BackTop
    },
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

        backTopShow:true
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
      //防抖，减少短时间内的重复频繁调用
      let refresh=this.debounce(this.$refs.scroll.refresh,200)

      //3.监听item中图片加载完成
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      })
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      //防抖，减少短时间内的重复动作
      debounce(func,delay){
        let timer=null

        return function (...args){
          if(timer)clearTimeout(timer)

          timer=setTimeout(()=>{
            func.apply(this,args)
          },delay)
        }
      },
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
        console.log(index)
      },
      //回到頂部
      backClick(){
        this.$refs.scroll.scrollTo(0,0)//0,0回到顶部
      },
      //滚动监听
      contentScroll(position){
        //console.log("y:",position.y)
        this.backTopShow=(-position.y)>1000//动态显示回到顶部按钮
      },
      //加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
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
          console.log("商品数据：",res);
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
    /*padding-top: 44px;*/
    height:calc(100vh - 93px);
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control{
    position: sticky;/*新属性，会随滚动定位在某个地方置顶顶部*/
    top: 43px;
    z-index: 99;
    background-color: white;
  }

  .content{
    height:100%;
    overflow: hidden;
    margin-top: 44px;
  }
</style>
