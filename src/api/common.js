/**
 * @parameter
 * @description 通用接口
 * @author Feng.xiuting
 * @date 2020-10-20
 */

import request from '@/utils/request'

//字典表
export function queryDicList(data) {
  return request({
    url: '/xnrh-yhzx/api/common/queryDicList',
    method: 'post',
    data
  })
}

//专业列表
export function queryProfessionDataList(data) {
  return request({
    url: '/xnrh-zczl/api/selfchcek/queryProfessionDataList',
    method: 'post',
    data
  })
}

//文件上传
export function uploadNew(data) {
  return request({
    url: '/xnrh-zczl/api/common/uploadnew',
    method: 'post',
    data
  })
}

//系统角色列表查询接口
export function queryDicRoleList(data) {
  return request({
    url: '/xnrh-yhzx/api/common/queryDicRoleList',
    method: 'post',
    data
  })
}


// 行政区划
export function getAreaInfo(data) {
  return request({
    url: '/xnrh-yhzx/api/dic/queryAreaInfo',
    method: 'post',
    data
  })
}

// 查询系统类型
export function getSystemType(data) {
  return request({
    url: '/xnrh-yhzx/api/role/systemType',
    method: 'post',
    data
  })
}
