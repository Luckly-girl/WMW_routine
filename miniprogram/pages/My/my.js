// miniprogram/pages/My/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myList: app.globalData.myList,
    userInfo:{},
  },
  //点击跳转订单列表
  goDetial: function (event) {
    // console.log(event.currentTarget.dataset.index);
    let index = event.currentTarget.dataset.index;
    let formdata = this.data.myList[index]
    // console.log(formdata,123123)
    wx.navigateTo({
      url: '../order/orderDetial/orderDetial?name=' + formdata.name + '&path=' + formdata.path + '&id=' + formdata.id
    })
  },
  // 显示弹窗 
  handleSubmit: function () {
    // console.log(wx.getStorageSync('token'))
    if(wx.getStorageSync('token')){
      
    }else{
      this.popup.showPopup();
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
  //关于我们
  aboutHandle() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  //受骗消息更新
  newsHandle() {
    wx.navigateTo({
      url: '../news/news',
    })
  },

  //通知
  noticeHandle() {
    wx.navigateTo({
      url: '../noticeNews/noticeNews',
    })
  },
  //维权进度查询
  statusHandle() {
    wx.navigateTo({
      url: '../order/orderDetial/orderDetial',
    })
  },
  //反馈建议
  adviceHandle() {
    wx.navigateTo({
      url: "../advice/advice",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              // console.log(res.userInfo);
              wx.setStorageSync('userInfo', res.userInfo);
              that.setData({
                userInfo:res.userInfo
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
    // console.log(app.globalData)
    this.setData({
      userInfo:app.globalData.userInfo
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