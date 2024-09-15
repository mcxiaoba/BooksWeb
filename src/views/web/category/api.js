/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:29:51
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { request } from '@/utils'

export default {
  create: data => request.post('/wms/category/add', data),


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


  boots: (params = {}) => request.get('/wms/category/list'),
  // readboot: (params = {}) => request.get('/wms/category', { params }),
  update: data => {
    console.log('Data to be sent:', data); // 打印 data 数据
    return request.patch(`/wms/category/${data.categoryId}`, data);
  },

  delete: id => {
    console.log("id", id);
    return request.delete(`/wms/category/${id}`);
  },


  getAllRoles: () => request.get('/role?enable=1'),
}
