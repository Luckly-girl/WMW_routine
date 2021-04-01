// pages/order/orderDetial/orderDetial.js
let app = getApp();
import { Fetch } from '../../../api/my';
const fetch = new Fetch();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myList: app.globalData.myList,
    id: 3,
    orderList: [
      {
        tname: "全部",
        tid: 3
      }, {
        tname: "未付订单",
        tid: 0
      }, {
        tname: "已完成",
        tid: 1
      }
    ],
    orderDetails: [],
    newList: []
  },
  ptChange(event) {
    let tid = event.currentTarget.dataset.tid;
    // console.log(event.currentTarget.dataset.index)
    this.setData({
      id: tid
    });
    this.queryOrder()
  },
  queryOrder() {
    let that = this;
    // console.log(that.data.id)
    let status = that.data.id == 3 ? '' : that.data.id;
    // console.log(status)
    let data = {
      "limit": 10,
      "page": 1,
      "status": status
    }
    fetch.queryOrder(data).then(res => {
      that.setData({
        newList: res.data
      })
      console.log(res.data, 5555)
    })
  },
  checkDetial(e) {
    this.setData({
      orderDetails: JSON.stringify(e.currentTarget.dataset.data)
    })
    wx.navigateTo({
      url: '../noPayDetial/noPayDetial?orderDetails=' + this.data.orderDetails,
    })
  },
  goPay(e) {
    // console.log(e, 22)
    let that=this
    let orderNo = e.currentTarget.dataset.orderno
    let orderAmount = e.currentTarget.dataset.amount
    fetch.prePay(orderNo).then(res => {
      if (res.success == true) {
        let timestamp = new Date().getTime()
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) {
            // wx.navigateTo({
            //   url: '../paySuccess/paySuccess?orderNo=' + orderNo + '&orderAmount=' + orderAmount + '&orderDetails=' + that.data.orderDetails
            // })
            wx.showToast({
              title: '支付成功',
            })
            this.queryOrder()
          },
          fail(res) {
            wx.showToast({
              title: '已取消',
              icon: "none"
            })
          }
        })
      }
    })
  },
  pre_Pay(data) {
    console.log(data)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    this.setData({
      id: Number(options.id)
    });
    this.queryOrder()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})