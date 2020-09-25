import {ADD_COUNTER,ADD_TO_CART} from "./mutation-type";

export default {
  addCart(context,payload){
    //payload新添加的商品
    /*let oldProduct=null
    for(let item of state.cartList){
      if(item.iid==payload.iid){
        oldProduct==item
      }
    }*/
    //1.查找之前数组中是否有对应商品
    console.log("选中的商品：",payload)

    let product=context.state.cartList.find(item=>item.iid==payload.iid)

    //2.判断oldProduct
    if(product){
      //product.count+=1
      context.commit(ADD_COUNTER,product)
    }else{
      payload.count=1
      context.commit(ADD_TO_CART,payload)
      //context.state.cartList.push(payload)
    }
    console.log("context",context.state.cartList)
  },
}
