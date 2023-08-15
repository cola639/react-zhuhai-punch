import request from 'utils/request'

export function getTencentGeocoder(lat: number, lng: number, appkey: string) {
  return request({
    baseURL: process.env.REACT_APP_TENCENT_MAP,
    url: '/ws/geocoder/v1',
    method: 'get',
    params: {
      location: `${lat},${lng}`,
      key: appkey
    }
  })
}
