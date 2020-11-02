import request from '@/utils/request'

//注册
export function register(data) {
  return request({
    url: '/xnrh-yhzx/api/user/register',
    method: 'post',
    data
  })
}
