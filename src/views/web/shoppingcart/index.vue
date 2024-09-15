<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/05 21:29:56
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <CommonPage>
    <template #action>
      <NButton type="primary" @click="modifiedHandleAdd()" v-permission="'AddUser'">
        <i class="i-material-symbols:add mr-4 text-18" />
        新增书籍
      </NButton>
    </template>

    <MeCrud ref="$table" v-model:query-items="queryItems" :scroll-x="1200" :columns="columns" :get-data="fetchData">
      <MeQueryItem label="书籍" :label-width="50">
        <n-input v-model:value="queryItems.categoryName" type="text" placeholder="请输入书籍" clearable />
      </MeQueryItem>

    </MeCrud>

    <MeModal ref="modalRef" width="520px">
      <n-form ref="modalFormRef" label-placement="left" label-align="left" :label-width="80" :model="modalForm"
        :disabled="modalAction === 'view'">
        <n-form-item label="标题" path="booksTitle" :rule="{
          required: true,
          message: '请输入标题',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.booksTitle" />
        </n-form-item>


        <n-form-item label="作者" path="booksAuthor" :rule="{
          required: true,
          message: '请输入作者',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.booksAuthor" />
        </n-form-item>

        <n-form-item label="出版社" path="publisher" :rule="{
          required: true,
          message: '请输入出版社',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.publisher" />
        </n-form-item>


        <n-form-item label="出版日期" path="publicationDate" :rule="{
          required: true,
          message: '请输入出版日期',
          trigger: ['clearable', 'blur'],
        }">
          <n-input v-model:value="modalForm.publicationDate" type="date" />
          <!-- <n-date-picker v-model:value="modalForm.publicationDate" type="date" clearable /> -->
        </n-form-item>


        <n-form-item>
          <MeQueryItem label="书籍类别" :label-width="80">
            <n-select v-model:value="modalForm.categoryId" clearable :options="categoryIds" />
          </MeQueryItem>
        </n-form-item>


        <n-form-item label="描述" path="description" :rule="{
          required: true,
          message: '请输入描述',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.description" />
        </n-form-item>

        <n-form-item label="数量" path="quantity" :rule="{
          // required: true,
          message: '请输入数量',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.quantity" />
        </n-form-item>

        <n-form-item label="单价" path="available" :rule="{
          // required: true,
          message: '请输入单价',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.available" />
        </n-form-item>

        <n-form-item label="存放位置" path="location" :rule="{
          // required: true,
          message: '请输入存放位置',
          trigger: ['input', 'blur'],
        }">
          <n-input v-model:value="modalForm.location" />
        </n-form-item>

        <n-form-item label="图片" path="imageUrl" :rule="{}">
          <n-upload ref="uploadRef" list-type="image-card" action="https://your-upload-url" :custom-request="Upload"
            :max="1" :file-list="fileList" :show-file-list="true" :on-remove="handleRemove">
            <template #placeholder>
              上传图片
            </template>
          </n-upload>
        </n-form-item>










      </n-form>
      <n-alert v-if="modalAction === 'add'" type="warning" closable>
        详细信息需由用户本人补充修改
      </n-alert>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { NAvatar, NButton, NSwitch, NTag, useMessage } from 'naive-ui'
import api from './api'
import { formatDateTime } from '@/utils'
import { MeCrud, MeModal, MeQueryItem } from '@/components'
import { useCrud } from '@/composables'

// defineOptions({ name: 'UserMgt' })

const $table = ref(null)
/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})




// const roles = ref([])

// // api.getAllRoles().then(({ data = [] }) => (roles.value = data)) // 获取数据列表

// api.boots().then(({ data = [] }) => (roles.value = data)) // 获取数据列表
// // console.log("roles", roles);


// // 初始化 userId 变量
// var userId  = null;

// // 调用 API 并处理返回的数据
// api.getUser().then(({ data = [] }) => {
//   userId = data.id;
//   // console.log(userId);

//   // userId = data;
//   // 打印 userId 的值
//   // console.log("userId:", userId);  // 打印整个 ref 对象
//   // console.log("value:", userId.value.id);  // 打印 ref 对象的值
// }).catch(error => {
//   console.error("获取用户数据失败:", error);
// });


// 初始化 userId 变量
const userId = ref([]);

// 优先执行
const fetchData = async () => {
  try {

    var userIdList = null;
    // const booksData = ref([]);
    // 调用 API 并处理返回的数据
    await api.getUser().then(({ data = [] }) => {
      userId.value = data;
      userIdList = data.id

      // api.bootsUserIdList(userIdList).then(res => {
      //   console.log(res);
      //   booksData.value = res.data

      // })


      // // 打印 userId 的值
      // console.log("userId:", userId);  // 打印整个 ref 对象
      // console.log("value:", userId.value.id);  // 打印 ref 对象的值
    }).catch(error => {
      console.error("获取用户数据失败:", error);
    });

    // 然后调用 api.boots
    const booksData = await api.bootsUserIdList(userIdList);
    // console.log('书籍数据:', booksData);
    return booksData;
  } catch (error) {
    // console.error('请求失败:', error);
    return [];
  }
};




// 定义 ref 变量来保存类别选项
const categoryIds = ref([]);

// 类别选项 API 调用
api.categoryboots().then(res => {
  console.log("res", res);
  // 将数据转换为 n-select 需要的格式
  categoryIds.value = res.data.map(item => ({
    label: item.categoryName,
    value: item.categoryId
  }));

  // console.log("categoryIds", categoryIds.value);
});


const modifiedHandleAdd = async () => {
  // 确保 userId 已被正确设置
  if (userId.value.id) {
    modalForm.userId = userId.value.id;
  }
  // console.log("userId.value.id", userId.value.id);
  // 调用 handleAdd 函数来执行默认的新增逻辑
  await handleAdd(modalForm); // 确保 handleAdd 函数接受 modalForm 作为参数并处理

  $table.value?.handleSearch()
}



const {
  modalRef,
  modalFormRef,
  modalForm,
  modalAction,
  handleAdd,
  handleDelete,
  handleOpen,
  handleSave,
  handleEdit,
} = useCrud({
  name: '书籍',
  initForm: { enable: true },
  doCreate: api.create,
  doDelete: api.delete,
  doUpdate: api.update,
  refresh: () => $table.value?.handleSearch(), // 刷新数据
})



const columns = [
  { title: '序号', key: 'index', width: 100, align: 'center', render: (row, index) => index + 1 },
  { title: '标题', key: 'booksTitle', ellipsis: { tooltip: true } },
  { title: '作者', key: 'booksAuthor', ellipsis: { tooltip: true } },
  { title: '出版商', key: 'publisher', ellipsis: { tooltip: true } },
  { title: '出版日期', key: 'publicationDate', ellipsis: { tooltip: true } },
  {
    title: '书籍类别',
    key: 'categoryId',
    ellipsis: { tooltip: true },
    render: (row) => {
      const category = categoryIds.value.find(item => item.value === row.categoryId);
      return category ? category.label : '未知类别'; // 根据 categoryId 显示类别名称
    }
  },
  { title: '描述', key: 'description', ellipsis: { tooltip: true } },
  { title: '数量', key: 'quantity', ellipsis: { tooltip: true } },
  { title: '单价', key: 'available', ellipsis: { tooltip: true } },
  { title: '存放位置', key: 'location', ellipsis: { tooltip: true } },  // 去掉了多余的空格
  {
    title: '图书图片',
    key: 'imageUrl',
    render: (row) => {
      return h('img', {
        src: row.imageUrl || 'path/to/default/image.png',
        alt: '图书图片',
        style: { width: '50px', height: '50px' }
      });
    },
  }
  ,
  // {
  //   title: '操作',
  //   key: 'actions',
  //   width: 320,
  //   align: 'right',
  //   fixed: 'right',
  //   hideInExcel: true,
  //   render(row) {
  //     return [
  //       h(
  //         NButton,
  //         {
  //           size: 'small',
  //           type: 'primary',
  //           style: 'margin-left: 12px;',
  //           disabled: row.code === 'SUPER_ADMIN',
  //           onClick: () => handleEdit(row),
  //         },
  //         {
  //           default: () => '添加购物车',
  //           icon: () => h('i', { class: "i-gravity-ui:bookmark-fill w-1em h-1em" }),
  //         },
  //       ),
  //     ]
  //   },
  // },
  {
    title: '操作',
    key: 'actions',
    width: 320,
    align: 'right',
    fixed: 'right',
    hideInExcel: true,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 12px;',
            disabled: row.code === 'SUPER_ADMIN',
            onClick: () => handleAddToCart(row),
          },
          {
            default: () => '添加购物车',
            icon: () => h('i', { class: 'i-gravity-ui:bookmark-fill w-1em h-1em' }),
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'info',
            style: 'margin-left: 12px;',
            disabled: row.code === 'SUPER_ADMIN',
            onClick: () => addbooks(row),
          },
          {
            default: () => '借阅书籍',
            icon: () => h('i', { class: 'i-gravity-ui:bookmark-fill w-1em h-1em' }),
          }
        ),
      ];
    },
  },
]
const message = useMessage();

// 购物车数据
const cart = ref([]);


// 添加到购物车的处理函数
function handleAddToCart(product) {
  // console.log("product", product);


  if (product.quantity - 1 >= 0) {


    form = product
    // 更新书籍列表数量
    var form = {
      id: product.id,
      userId: product.userId,
      booksTitle: product.booksTitle,
      booksAuthor: product.booksAuthor,
      publisher: product.publisher,
      publicationDate: product.publicationDate,
      categoryId: product.categoryId,
      description: product.description,
      // 数量
      quantity: product.quantity - 1,
      available: product.available,
      location: product.location,
    }


    var i = 1;
    // 第一次添加购物车
    var Vartform = {
      userId: product.userId,
      bookId: product.id,
      booksTitle: product.booksTitle,
      booksAuthor: product.booksAuthor,
      publisher: product.publisher,
      publicationDate: product.publicationDate,
      categoryId: product.categoryId,
      description: product.description,
      // 数量
      quantity: i,
      // 单价
      price: product.available,
      // totalPrice: product.available * 1,
    }





    api.update(form).then(res => {
      // console.log("res12312", res);
      // console.log("product", product);
      $table.value?.handleSearch() // 刷新数据

      // 根据书籍的id查询购物车列表
      api.catbooks(product.id).then(res => {
        console.log("res", res);
        // console.log("购物车列表", res.data.bookId);



        // 判断 res.data 是否等于空
        console.log("res.data", res.data);

        if (res.data) {

          var Vartformtow = {
            userId: product.userId,
            bookId: product.id,
            booksTitle: product.booksTitle,
            booksAuthor: product.booksAuthor,
            publisher: product.publisher,
            publicationDate: product.publicationDate,
            categoryId: product.categoryId,
            description: product.description,
            // 数量
            quantity: res.data.quantity + 1,
            // 单价
            price: product.available,
            // totalPrice: product.available * 1,
          }


          // 第二次添加购物车表单
          // message.success("1");
          // 购物车已有商品
          console.log("购物车已有商品", Vartformtow);

          api.updateShopping(Vartformtow).then(res => {
            console.log("res", res);


          })


        } else {
          // 第一次添加购物车
          console.log("添加购物车", Vartform);

          api.create(Vartform).then(res => {
            console.log("res", res);
          });
          // message.success("2");
        }


      })


      // api.create().then(res => {
      //   console.log(res);

      // })


    });

    message.success("添加购物车成功");


  }
  else {
    message.warning("库存不足");
  }









  console.log("form", form);




  // 检查商品是否已经在购物车中
  const existingProduct = cart.value.find(item => item.productId === product.productId);

  console.log("existingProduct", existingProduct);

  // if (existingProduct) {
  //   if (existingProduct.quantity < product.stock) {
  //     // 更新购物车中的数量
  //     existingProduct.quantity += 1;
  //     // 更新表格数据中的库存
  //     const tableProduct = tableData.value.find(item => item.productId === product.productId);
  //     if (tableProduct) tableProduct.stock -= 1;
  //   } else {
  //     // 提示用户库存不足
  //     alert('库存不足');
  //   }
  // } else {
  //   if (product.stock > 0) {
  //     // 添加新商品到购物车
  //     cart.value.push({
  //       ...product,
  //       quantity: 1
  //     });
  //     // 更新表格数据中的库存
  //     const tableProduct = tableData.value.find(item => item.productId === product.productId);
  //     if (tableProduct) tableProduct.stock -= 1;
  //   } else {
  //     // 提示用户库存不足
  //     alert('库存不足');
  //   }
  // }

  // // 这里可以添加其他逻辑，如提示用户商品已添加到购物车
  // console.log('购物车内容:', cart.value);
  // console.log('表格数据:', tableData.value);
}




// 借阅书籍信息

function addbooks(row) {
  const dataform = {
    form: {
      userId: row.userId,
      bookId: row.id,
    }
  };

  // console.log("表单信息", dataform.value.form);

  console.log("借阅的书籍数据", row);

  // if(){

  // }


  api.addwmsborrowedbooksbootId(row.id).then(req => {
    console.log("reqaawd", req.data);

    if (req.data === null) {
      api.addwmsborrowedbooks(dataform.form).then(res => {
        console.log("res",res);
        message.success("借书成功");
      })
    }
    else {
      message.error("您已借阅该书籍");
    }
  })




}



</script>
