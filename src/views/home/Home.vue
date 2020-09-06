<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" class="tab-control"
      @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";



  export default {
    name: "Home",
    components: {
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl
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
        currentType:'pop'
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
    methods:{
      /**
       * 时间监听相关的方法
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
        console.log(index)
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
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
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
</style>
