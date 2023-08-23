import request from 'utils/request'

export function openIdLogin(params: any) {
  return request({
    url: '/punch/config/auth',
    method: 'get',
    params
  })
}

export function getRecord(params: any) {
  return request({
    url: '/punch/record',
    method: 'get',
    params
  })
}

export function getRecordHistory(params: any) {
  return request({
    url: '/punch/record/history',
    method: 'get',
    params
  })
}

export function punchRecord(data: any) {
  return request({
    url: '/punch/record/save',
    method: 'post',
    data
  })
}
