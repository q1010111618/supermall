import axios from 'axios'


export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  //2.axios的拦截器
  //请求拦截
  /*instance.interceptors.request.use(config=>{
    console.log(config);
    return config
  },err=>{
    console.log(err);
  })
  //响应拦截
  instance.interceptors.response.use(res=>{
    console.log(res);
  },err=>{
    console.log(err)
  })*/

  //发送真正的网络请求,axios本身就是promise类型
  return instance(config)
}


