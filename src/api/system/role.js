import request from '@/utils/request'

// 查询用户列表
export function getList(data) {
  return request({
    url: '/xnrh-yhzx/api/user/queryUserInfoList',
    method: 'post',
    data
  })
}

// 新增用户
export function addItem(data) {
  return request({
    url: '/xnrh-yhzx/api/user/add',
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

// 查看用户
export function getUser(data) {
  return request({
    url: '/xnrh-yhzx/api/user/getUser',
    method: 'post',
    data
  })
}
// 编辑
export function upUser(data) {
  return request({
    url: '/xnrh-yhzx/api/user/upUser',
    method: 'post',
    data
  })
}
