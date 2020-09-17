export default {
  //防抖，减少短时间内的重复动作
  debounce(func,delay){
    let timer=null

    return function (...args){
      if(timer)clearTimeout(timer)

      timer=setTimeout(()=>{
        func.apply(this,args)
      },delay)
    }
  }
}
