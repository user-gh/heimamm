import request from '@/utilis/request'

export function getTop(){
   return request({
       url:'/data/title',
       method:'post'
   })
}

export function statistics(){
   return request({
       url:'/data/statistics',
       method:'post'
   })
}