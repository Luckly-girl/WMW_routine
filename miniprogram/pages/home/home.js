// miniprogram/pages/home/home.js
import { timeago } from '../../utils/index';
import { User } from '../../api/url.js';
let user = new User()
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    imgUrl: "",
    flag: false,
    consultList: [],
    consultTime: '',
    ptList: app.globalData.ptList,
    newList: [
    ]
  },
  toPath(event) {
    // console.log(event.currentTarget.dataset.index);
    let index = event.currentTarget.dataset.index;
    let datas = this.data.ptList[index]
    console.log(datas);
    wx.navigateTo({
      url: '../homePage/homePt/homePt?name=' + datas.name + '&path=' + datas.path
    })
  },
  //获取轮播图
  wx_swiper() {
    let that = this;
    user.wxSwiper({
    }).then((res) => {
      if (res.success == true) {
        let imgList = JSON.parse(res.message)
        // console.log(that.data.imgListData, 1212)
        that.setData({
          imgUrl: JSON.parse(res.message)
        })
      }
      // console.log(JSON.parse(res.message),9999)
    })
  },
  //获取首页咨询信息
  wx_consult() {
    let that = this
    user.wxConsult({
    }).then((res) => {
      if (res.success == true) {
        let consultList = JSON.parse(res.message).records
        // console.log(JSON.parse(res.message).records)
        consultList.forEach(element => {
          element.consuls = timeago(element.consultTime)
        })
        // console.log(consultTime, 111)
        that.setData({
          consultList: consultList
        })
      }
    })
  },
  //获取投资陷阱信息
  wx_invest() {
    let that = this
    user.wxInvest({
    }).then(res => {
      if (res.success == true) {
        let newList = JSON.parse(res.message)
        that.setData({
          newList: newList
        })
        // console.log(newList)
      }

    })
  },
  handleConsult() {
    let that = this;
    // console.log(22222)
    if (wx.getStorageSync('token')) {
      that.setData({
        flag: true
      })
    } else {
      that.popup.showPopup();
    }
  },
  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = Date.now();
    let that = this
    timeago(that.data.consultTime);
    this.wx_swiper()
    this.wx_consult()
    this.wx_invest()
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // console.log(res.userInfo);
              wx.setStorageSync('userInfo', res.userInfo);
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.popup = this.selectComponent("#popup");
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