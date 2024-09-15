/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:29:51
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { request } from '@/utils'

export default {

  // create: data => {
  //   console.log("data", data);

  //   request.post('/wms/shoppingCart/addCart', data);
  // },


  read: async (params = {}) => {
    console.log("params", params);
    try {
      const response = await request.get('/wms/category/categories', { params });
      console.log("response", response);
      // 返回数据时，确保格式正确
      return response.data; // 确保返回的数据格式正确
    } catch (error) {
      console.error("API request failed:", error);
      return { total: 0, items: [] }; // 处理错误并返回一个默认值
    }
  },


  // books:(params = {}) => request.get('/wms/books/List'),

  categoryboots: (params = {}) => request.get('/wms/category/list'), // 获取书籍类别的数据


  // boots: (params = {}) => request.get('/wms/books/List'), // 获取书籍数据
  // boots: (params = {}) => request.get('/wms/shoppingCart/getCartList'), // 获取书籍数据

  bootsUserIdList: userIdList => {
    // console.log("请求的用户 ID:", userIdList);
    return request.get(`/wms/shoppingCart/user/${userIdList}`);
  },



  // readboot: (params = {}) => request.get('/wms/category', { params }),
  // update: data => {
  //   console.log('Data to be sent:', data); // 打印 data 数据
  //   return request.patch(`/wms/books/${data.id}`, data);
  // },

  
  // 删除
  delete: id => {
    console.log("id", id);
    return request.delete(`/wms/books/${id}`);
  },


  getAllRoles: () => request.get('/role?enable=1'),


  // 获取当前用户id
  bootsUserId: (params = {}) => request.get('/wms/books/getCurrentUserId'), // 获取书籍数据

  // 获取用户信息
  getUser: () => request.get('/user/detail'),







}
