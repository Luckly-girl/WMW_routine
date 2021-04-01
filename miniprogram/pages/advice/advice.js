// pages/advice/advice.js
const app = getApp();
import { Fetch } from '../../api/my';
let fetch = new Fetch();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adviceList: [
      { id: 0, name: "建议" },
      { id: 1, name: "反馈" },
      { id: 2, name: "投诉" }
    ],
    selectId: 0,
    content: "",
    username: "",
    phoneNum: "",
    show1:false
  },
  contentClick: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  nameClick: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  phoneNumClick: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  clickOne(event) {
    let index = event.currentTarget.dataset.index;
    // console.log(index,8888)
    this.setData({
      selectId: index
    })
  },
  submitHandle() {
    var content = this.data.content
    var username = this.data.username
    var phoneNum = this.data.phoneNum
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if(wx.getStorageSync('token')){
      if (content ==''||username==''||phoneNum=='') {
        wx.showToast({
          icon:"none",
          title: '请先完善信息'
        })
        return false
      } else if(!myreg.test(this.data.phoneNum)){
        wx.showToast({
          title: '手机号码格式不对',
          icon:"none"
        })
      }else{
        this.add_Feedback()
      }
    } else {
      this.popup.showPopup();
    }
  },
  add_Feedback(){
    let data = {
      "contactWay": this.data.phoneNum,
      "feedbackContent": this.data.content,
      "feedbackType": Number(this.data.selectId)+1,
      "username": this.data.username
    }
    fetch.addFeedback(data).then( res => {
      if( res.success == true){
        this.setData({
          phoneNum:"",
          content:"",
          username:"",
          show1:true
        })
        wx.showToast({
          title: '成功',
        })
        
      }
    })
  },
   //取消事件
   _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    wx.showToast({
      title: '提交成功',
    })
    this.popup.hidePopup();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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