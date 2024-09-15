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

  //   request.post('/wms/books/add', data);
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


  // 根据id查询购物车列表
  catbooks: (params = {}) => {
    console.log("params", params);

    return request.get(`/wms/shoppingCart/getCartById/${params}`)
  },


  categoryboots: (params = {}) => request.get('/wms/category/list'), // 获取书籍类别的数据

  // 获取书籍数据
  // boots: (params = {}) => request.get('/wms/books/List'),
  // readboot: (params = {}) => request.get('/wms/category', { params }),

  bootsUserIdList: userIdList => {
    // console.log("请求的用户 ID:", userIdList);
    return request.get(`/wms/books/user/${userIdList}`);
  },


  // 添加借阅书籍
  addwmsborrowedbooks: data => {
    console.log("借阅书籍api返回信息", data);

    return request.post('/wms/borrowedBooks/borrow', data)
  },

  // 根据书籍id查询书籍是否存在
  addwmsborrowedbooksbootId: bootId => {
    console.log(bootId);

    return request.get(`/wms/borrowedBooks/borrow/${bootId}`)
  },



  // 修改书籍列表
  update: data => {
    console.log('Data to be sent:', data); // 打印 data 数据
    return request.patch(`/wms/books/${data.id}`, data);
  },


  // 更新购物车列表
  updateShopping: data => {
    console.log('Data to be sent:', data); // 打印 data 数据
    return request.put("/wms/shoppingCart/updateCart", data);
  },

  // 向书籍购物车添加书籍
  create: data => {
    console.log("data", data);

    request.post('/wms/shoppingCart/addCart', data);
  },

  // delete: id => {
  //   console.log("id", id);
  //   return request.delete(`/wms/books/${id}`);
  // },


  getAllRoles: () => request.get('/role?enable=1'),


  bootsUserId: (params = {}) => request.get('/wms/books/getCurrentUserId'), // 获取书籍数据

  // 获取用户信息
  getUser: () => request.get('/user/detail'),
}
