// import Vue from 'vue'
// import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export function request(configs) {
  const instance = new axios.create({
    baseURL: 'https://cs.lightliang.top/',
    // baseURL: 'http://192.168.0.7:8000/',
    timeout: 5000
  });
  
  // 请求拦截器
  instance.interceptors.request.use(config => {
    // 拦截后需要将拦截下来的请求数据返回发送
    // console.log(config)
    return config;
  }, err => {
    console.log(err)
  })
  
  // 相应拦截器
  instance.interceptors.response.use(res => {
    // 拦截后需要将拦截下来处理成的结果返回
    // console.log(res.data);
    return res.data
  }, err => {
    console.log(err)
  })
  return instance(configs)
}
