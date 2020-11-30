import {ADD_COUNTER,ADD_TO_CART} from "./mutation-type";

export default {
  addCart(context,payload){
    return new Promise((resolve) => {
      //payload新添加的商品
      /*let oldProduct=null
      for(let item of state.cartList){
        if(item.iid==payload.iid){
          oldProduct==item
        }
      }*/
      //1.查找之前数组中是否有对应商品
      //console.log("选中的商品：",payload)

      let product=context.state.cartList.find(item=>item.iid==payload.iid)

      //2.判断oldProduct
      if(product){//数量+1
        //product.count+=1
        context.commit(ADD_COUNTER,product)
        resolve('当前的商品数量+1')
      }else{
        payload.count=1
        context.commit(ADD_TO_CART,payload)
        //context.state.cartList.push(payload)
        resolve('添加新的商品')
      }
      //console.log("context",context.state.cartList)
    })
  },
}
