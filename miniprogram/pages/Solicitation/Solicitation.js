// miniprogram/pages/Solicitation/Solicitation.js
import { User } from '../../api/url'
let user = new User()
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalName: "征集活动",
    modalList: [
      '征集活动', '实时进展'
    ],
    activityList: [{
      zk: false
    }],
    list: [{
      id: "",
      name: '征集活动已发布'
    },
    {
      id: "",
      name: '受害者集结,持续征集中'
    }, {
      id: "",
      name: '平台线索信息收集中'
    }],
    flag: true,
  },
  modalChange(event) {
    this.setData({
      modalName: event.currentTarget.dataset.name
    })
  },
  showJd(event) {
    // console.log(event.currentTarget.dataset.index);
    let index = event.currentTarget.dataset.index;
    let activityList = this.data.activityList;
    activityList[index].zk = !activityList[index].zk;
    this.setData({
      activityList: activityList
    })
  },
  wx_collect() {
    user.wxollect({
    }).then(res => {
      if (res.success == true) {
        console.log(res.data)
        this.setData({
          activityList: res.data,
        })
      }
    })
  },
  handleConsult(e) {
    let that = this;
    let index = e.currentTarget.dataset.index
    let id = that.data.activityList[index].id
    if (wx.getStorageSync('token')) {
      user.wxJoin(id).then((res) => {
        if (res.success == true) {
          console.log(res, 11)
          wx.showToast({
            title: '加入成功',
            icon: 'none'
          })
        }else {
          wx.showToast({
            title: '请勿重复加入',
            icon: 'none'
          })
        }
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
    let that = this
    that.wx_collect()
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
    let that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
    that.popup = that.selectComponent("#popup");
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