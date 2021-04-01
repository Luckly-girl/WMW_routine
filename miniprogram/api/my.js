import { HTTP } from './base.js'

class Fetch extends HTTP {

  // 建议、反馈、投诉
  addFeedback(data) {
    return this.request({
      url: '/front/member/addFeedback',
      method: 'POST',
      data: data
    })
  }
  //查询用户订单
  queryOrder(data){
    return this.request({
      url:"/front/order/queryOrder",
      method:"POST",
      data
    })
  }
  ///front/order/prePay/{orderNo}
  prePay(data){
    return this.request({
      url:"/front/order/prePay/"+data,
      method:"get",
    })
  }

  //受骗消息
  searchNot(type){
    return this.request({
      url:"/front/site/searchNotice/"+type,
      method:"get",
    })
  }
}

export { Fetch }