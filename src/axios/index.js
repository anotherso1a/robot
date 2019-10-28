/* eslint-disable */
import axios from 'axios';





function createInstance(axios) {
  //创建axios实例
  //请求头动态配置
  const instance = axios.create({
    baseURL: 'http://106.15.91.51/',
    // baseURL: 'http://openapi.tuling123.com/openapi/api/v2',
    timeout: 10000, // 超时
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // 添加请求拦截器
  instance.interceptors.request.use(
    function(config) {
      // 发送请求之前
      // console.log(router)
      return config
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    function(response) {
      console.log(response)
      // 对响应数据做点什么
      let data = response.data
      if (data.ret) {
        return Promise.reject(data)
      }
      return Promise.resolve(data.data)
    },
    function(error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
  return instance;
}

//初始化
function install(Vue) {
  let instance = createInstance(axios);
  //添加全局方法
  Vue.prototype.$axios = instance;
}

export default {
  install
};