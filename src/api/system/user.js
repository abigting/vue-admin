import request from '@/utils/request'

// 查询用户列表
export function getList(data) {
  return request({
    url: '/xnrh-yhzx/api/user/queryUserInfoList',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteItem(data) {
  return request({
    url: '/xnrh-yhzx/api/user/delUser',
    method: 'post',
    data
  })
}

// // 重置用户
// export function reset(data) {
//   return request({
//     url: '/xnrh-yhzx/api/user/resetUser',
//     method: 'post',
//     data
//   })
// }

// 查看用户
export function getInfo(data) {
  return request({
    url: '/xnrh-yhzx/api/user/queryUserInfoByUserId',
    method: 'post',
    data
  })
}

// 编辑
export function editItem(data) {
  return request({
    url: '/xnrh-yhzx/api/user/updateUserBaseInfo',
    method: 'post',
    data
  })
}

