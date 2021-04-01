// pages/noticeNews/noticeNews.js
import { User } from '../../api/url.js'
let user = new User()
var WxParse = require('../../wxParse/wxParse');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
  },

  wx_about() {
    let that = this
    user.wxAbout('2').then(res => {
      if (res.success == true) {
        var result = JSON.parse(res.message)
        // console.log(result)
        that.setData({
          result:result
        })
        var list = []
        for (var i = 0; i < result.length; i++) {
          list.push(result[i].noticeMessage)
        }
        // console.log(list)
        for(var i=0;i<list.length;i++){
          WxParse.wxParse('content'+i, 'html', list[i], that);
          if(i===list.length-1){
            WxParse.wxParseTemArray('list', 'content', list.length, that)
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.wx_about()
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