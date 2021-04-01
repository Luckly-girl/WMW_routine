// components/popup/popup.js
import { User } from '../../api/url';
let user = new User();
var app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '内容'
    },
    // 弹窗取消按钮文字
    btn_no: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    btn_ok: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true,
    loginData: {},
    code: "",
    contentText: "使用该功能需要您授权",
    show1: '1'
  },
  created() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          // console.log(wx.getStorageSync('userInfo','dd'))
          that.setData({
            contentText: "请登录",
            show1: "2",
            loginData: wx.getStorageSync('userInfo')
          })
        }
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    hidePopup: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    //展示弹框
    showPopup() {
      this.setData({
        flag: !this.data.flag
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _error() {
      //触发取消回调
      this.triggerEvent("error")
    },
    _success() {
      console.log('2222')
      let that = this;
      // 查看是否授权（获取用户信息）
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                // console.log(res);
                that.setData({
                  loginData: res
                })
                getApp().globalData.userInfo = res.userInfo;
                wx.setStorageSync('userInfo', res.userInfo);
                that.setData({
                  contentText: "请登录",
                  show1: "2",
                })
                wx.showToast({
                  title: '授权成功，请登录',
                 
                })
              }
            })
          } else {

          }
        }
      })
    },
    getPhoneNumber(e) {
        // console.log(e.detial,11111);
      //   console.log(e.detail.iv)
      // console.log(e.detail.encryptedData)
      let that = this;
      if (e.detail.errMsg == 'getPhoneNumber:ok') {
        that.wx_Login(that.data.loginData, e.detail)
        // console.log(that.data.loginData,123)
      } else {
        wx.showToast({
          title: e.detail.errMsg,
          icon: "none"
        })
      }
    },
    wx_Login(data, detail) {
      console.log(data,detail,5555)
      let that = this;
      wx.login({
        success(res) {
          //  console.log( res);
          let code = res.code;
          that.setData({
            contentText: "请登录",
            show1: "2",
            loginData: wx.getStorageSync('userInfo')
          })
          // console.log(that.data.loginData,8888)
          user.wxLogin({
            "code": code,
            "encryptedData": detail.encryptedData,
            "iv": detail.iv,
            "userInfo": {
              "city": that.data.loginData.city,
              "country": that.data.loginData.country,
              "gender": that.data.loginData.gender,
              "nickName": that.data.loginData.nickName,
              "province": that.data.loginData.province
            }
          }).then(res => {
            if (res.success == true) {
              wx.showToast({
                title: '登录成功',
              })
              wx.setStorageSync('token', res.message);
              that.triggerEvent("error")
              wx.reLaunch({
                url: '../My/my',
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: "none"
              })
            }
          })
        }
      })

    }
  }

})