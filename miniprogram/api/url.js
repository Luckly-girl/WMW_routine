
import { HTTP } from './base.js'

class User extends HTTP {

  // 登录
  wxLogin(data) {
    return this.request({
      url: '/front/member/loginAuth',
      method: 'POST',
      data: data
    })
  }
  //轮播图
  wxSwiper() {
    return this.request({
      url: '/front/site/getBanner',
      method: 'get'
    })
  }
  //首页咨询动态展示
  wxConsult() {
    return this.request({
      url: '/front/site/searchConsultLog',
      method: 'get'
    })
  }
  //获取投资陷进盘
  wxInvest() {
    return this.request({
      url: '/front/site/trapMsg',
      method: 'get'
    })
  }
  //方案服务,专业咨询
  wxServer(type) {
    return this.request({
      url: '/front/site/scheme/' + type,
      method: 'get'
    })
  }
  //方案服务生成订单
  wxSerOrder(data) {
    return this.request({
      url: '/front/order/createOrder',
      method: 'post',
      data: data
    })
  }
  //获取征集活动信息
  wxollect() {
    return this.request({
      url: '/front/site/activity',
      method: 'get'
    })
  }
  //征集活动加入
  wxJoin(activityId) {
    return this.request({
      url: '/front/member/addActivity?activityId=' + activityId,
      method: 'get'
    })
  }
  //黑平台查询
  wxQuery(data) {
    return this.request({
      url: '/front/site/searchPlat',
      method: 'post',
      data: data
    })
  }
  //黑平台线索分析展示
  wxAnalyse() {
    return this.request({
      url: '/front/site/showPlat',
      method: 'get'
    })
  }
  //法律法规,服务介绍
  wxlawIntroduce(type) {
    return this.request({
      url: '/front/site/textMsg/' + type,
      method: 'get'
    })
  }
  wxAbout(type) {
    return this.request({
      url: '/front/site/searchNotice/' + type,
      method: 'get'
    })
  }
}

export { User }