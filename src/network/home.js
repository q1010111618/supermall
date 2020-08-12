import {request} from "./reqeust";

export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}
