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


  // read: async (params = {}) => {
  //   console.log("params", params);
  //   try {
  //     const response = await request.get('/wms/category/categories', { params });
  //     console.log("response", response);
  //     // 返回数据时，确保格式正确
  //     return response.data; // 确保返回的数据格式正确
  //   } catch (error) {
  //     console.error("API request failed:", error);
  //     return { total: 0, items: [] }; // 处理错误并返回一个默认值
  //   }
  // },


  // 根据用户ID获取借阅书籍列表
  getBorrowedBooksByUserIdAndBookId: (data) => {
    console.log("请求数据：", data);

    // 进行数据验证（可选）
    if (!data.userId) {
      console.error("错误：userId 都是必需的");
      return Promise.reject(new Error("userId 都是必需的"));
    }

    // 发起 POST 请求
    return request.get(`/wms/borrowedBooks/borrowuserId/${data.userId}`)
      .then(response => {
        console.log("响应数据：", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("请求错误：", error);
        throw new Error("获取借阅书籍列表失败");
      });
  },












  // books:(params = {}) => request.get('/wms/books/List'),

  categoryboots: (params = {}) => request.get('/wms/category/list'), // 获取书籍类别的数据

  // boots: (params = {}) => request.get('/wms/borrowedBooks/list'), // 获取借阅书籍列表数据


  // bootsUserId: (params = {}) => request.get(`/wms/books/user/${userId}`), // 获取书籍数据

  bootsUserIdList: userIdList => {
    // console.log("请求的用户 ID:", userIdList);
    return request.get(`/wms/books/user/${userIdList}`);
  }, // 获取当前登录用户信息


  // readboot: (params = {}) => request.get('/wms/category', { params }),
  // update: data => {
  //   console.log('Data to be sent:', data); // 打印 data 数据
  //   return request.patch(`/wms/books/${data.id}`, data);
  // },

  // delete: id => {
  //   console.log("id", id);
  //   return request.delete(`/wms/books/${id}`);
  // },


  getAllRoles: () => request.get('/role?enable=1'),


  // 获取当前用户id


  bootsUserId: (params = {}) => request.get('/wms/books/getCurrentUserId'), // 获取书籍数据

  // 获取用户信息
  getUser: () => request.get('/user/detail'),
}
