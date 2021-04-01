// miniprogram/pages/programme/programme.js
import { User } from '../../api/url.js';
import { Fetch } from '../../api/my';
var WxParse = require('../../wxParse/wxParse');
let user = new User()
let fetch = new Fetch()
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexId: 1,
    imgLis: [],
    imgs: [],
    imgurl: [],
    size: '',
    notice: false,
    order: '订单对象',
    price: '',
    id: '',
    programmeList: [],
    agreementList: [],
    teamName: "",
    userName: "",
    phoneNum: "",
    amount: '',
    pass: "",
    lossesDescImg: ''
  },
  handleConsult() {
    let that = this;
    // console.log(22222)
    if (wx.getStorageSync('token')) {
    } else {
      that.popup.showPopup();
    }
  },
  onTabItemTap() {
    let that = this
    if (!wx.getStorageSync('userInfo')) {
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
  nameClick: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  phoneClick: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  teamClick: function (e) {
    this.setData({
      teamName: e.detail.value
    })
  },
  amountClick(e) {
    this.setData({
      amount: e.detail.value
    })
  },
  passClick(e) {
    this.setData({
      pass: e.detail.value
    })
  },
  paChange(event) {
    let index = event.currentTarget.dataset.index;
    // console.log(index)
    let that = this;
    that.setData({
      indexId: index,
      id: that.data.programmeList[index - 1].id,
      price: that.data.programmeList[index - 1].price
    })
    // console.log(this.data.id, this.data.price)
  },
  // 选择图片
  saveImg() {
    let that = this;
    var pics = [];
    let imgLis = that.data.imgLis;
    if (imgLis.length < 5) {
      wx.chooseImage({
        count: 5,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          var imgs = res.tempFilePaths;
          // console.log(imgs, 222)
          for (var i = 0; i < imgs.length; i++) {
            pics.push(imgs[i])
            // console.log(pics,1111)
          }
          that.setData({
            imgs: imgs
          })
          res.tempFiles.forEach(el => {
            that.setData({
              size: el.size
            })
          })
          that.uploadimg({
            url: 'https://kzcm.utools.club/front/order/upload', //这里是你图片上传的接口
            path: pics, //这里是选取的图片的地址数组
            // picArr: arr // 增加一个存返回对象得属性
          });
        }
      })
    } else {
      wx.showToast({
        title: '上传图片不能大于5张!',
        icon: 'none'
      })
    }
  },
  //多张图片上传
  uploadimg: function (data) {
    // console.log(data)
    wx.showLoading({
      title: '上传中...',
      mask: true,
    })
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    if (that.data.size <= 2000000) {
      wx.uploadFile({
        url: data.url,
        filePath: data.path[i],
        timeout: 30000,
        name: 'file',
        header: {
          'Content-Type': 'multipart/form-data',
          'token': wx.getStorageSync("token"),  //如果需要token的话要传
        },
        formData: {
          'user': 'test'
        },
        success: (res) => {
          success++;
          var str = JSON.parse(res.data).data //返回的结果，可能不同项目结果不一样
          // console.log(str)
          if (str.url.length === that.data.imgs.length) {
            // for (var i = 0; i < that.data.imgs.length; i++) {
            //   that.data.imgurl.push(str.url[0])
            //   console.log(that.data.imgurl)
            // }
            wx.showToast({
              title: '上传成功',
            })
          }
          else {
            wx.showToast({
              title: '上传失败，请重新上传',
              icon: 'none'
            })
          }
          // console.log(str,99)
          var pic_name = str.imgServer + str.url[0];
          var imgLis = that.data.imgLis;
          imgLis.push(pic_name)
          // console.log(str)
          that.setData({
            imgLis: imgLis,
            lossesDescImg: that.data.imgurl.join(';')
          })
          // console.log(that.data.lossesDescImg)
        },
        fail: (res) => {
          fail++;
          wx.showToast({
            title: '上传失败，请重新上传',
            icon: 'none'
          })
          // console.log('fail:' + i + "fail:" + fail);
        },
        complete: () => {
          i++;
          if (i == data.path.length) { //当图片传完时，停止调用     
            // console.log('执行完毕');
            // console.log('成功：' + success + " 失败：" + fail);
            var myEventDetail = {
              picsList: that.data.imgLis
            } // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            that.triggerEvent('myevent', myEventDetail, myEventOption)//结果返回调用的页面
          } else { //若图片还没有传完，则继续调用函数
            data.i = i;
            data.success = success;
            data.fail = fail;
            that.uploadimg(data);//递归，回调自己
          }
        }
      });
    } else {
      wx.showToast({
        title: '上传图片不能大于2M!',  //标题
        icon: 'none'       //图标 none不使用图标，详情看官方文档
      })
    }
  },
  // 删除图片
  deteleImg(event) {
    let index = event.currentTarget.dataset.index;
    let imgLis = this.data.imgLis;
    imgLis.splice(index, 1);
    this.setData({
      imgLis: imgLis
    })
  },
  // 大图预览
  lookImg(event) {
    let current = event.currentTarget.dataset.src;
    let imgLis = this.data.imgLis;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgLis // 需要预览的图片http链接列表
    })
  },
  // 协议须知
  noticeTap() {
    let that = this;
    that.setData({
      notice: !that.data.notice
    })
  },
  // 提交
  submit() {
    var userName = this.data.userName
    var phoneNum = this.data.phoneNum
    var teamName = this.data.teamName
    var amonut = this.data.amount
    var pass = this.data.pass
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;

    if (userName == '' || phoneNum == '' || teamName == '' || amonut == '' || pass == '') {
      wx.showToast({
        title: '请先完善信息',
        icon: "none"
      })
    }
    else if (!myreg.test(this.data.phoneNum)) {
      wx.showToast({
        title: '手机号码格式不对',
        icon: "none"
      })
    }
    else if (this.data.notice == false) {
      wx.showToast({
        title: '请勾选用户服务协议',
        icon: "none"
      })
    }
    else {
      user.wxSerOrder({
        order: this.data.order,
        amount: this.data.price,
        lossesDesc: this.data.pass,
        lossesMoney: this.data.amount,
        lossesName: this.data.userName,
        lossesPhone: this.data.phoneNum,
        lossesPlatName: this.data.teamName,
        lossesDescImg: this.data.lossesDescImg,
        payType: '1',
        solutionId: this.data.id
      }).then(res => {
        if (res.success == true) {
          // console.log(res, 555)
          let orderNo = res.data.orderNo
          let orderAmount = res.data.orderAmount
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
                  //   url: '../order/paySuccess/paySuccess?orderNo=' + orderNo + '&orderAmount=' + orderAmount,
                  // })
                  wx.showToast({
                    title: '支付成功',
                    duration: 1500,
                    success: function () {
                      setTimeout(function () {
                        wx.reLaunch({
                          url: '../programme/programme',
                        })
                      }, 1000);
                    }
                  })
                },
                fail(res) {
                  wx.showToast({
                    title: '已取消',
                    icon: "none",
                    duration: 1500,
                    success: function () {
                      setTimeout(function () {
                        wx.reLaunch({
                          url: '../programme/programme',
                        })
                      }, 1000);
                    }
                  })
                }
              })
            }
          })
        }
        // console.log(JSON.parse(res.message))
      })
    }
  },
  //阅览协议须知
  toAgreement(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let list = JSON.stringify(that.data.agreementList[index - 1])
    wx.navigateTo({
      url: '../progrPage/agreement/agreement?list=' + list,
    })
  },
  //获取方案服务
  wx_Server() {
    let that = this
    // console.log(type)
    user.wxServer("1").then((res) => {
      if (res.success == true) {
        var programmeList = JSON.parse(res.message)
        console.log(programmeList)
        var list = []
        for (var i = 0; i < programmeList.length; i++) {
          list.push(programmeList[i].content.replace(/img/g, 'image'))
        }
        console.log(list)
        for (var i = 0; i < list.length; i++) {
          WxParse.wxParse('content' + i, 'html', list[i], that);
          if (i === list.length - 1) {
            WxParse.wxParseTemArray('list', 'content', list.length, that)
          }
        }
        var agreementList = []
        for (var i = 0; i < programmeList.length; i++) {
          agreementList.push(programmeList[i].agreement)
        }
        that.setData({
          programmeList: programmeList,
          agreementList: agreementList,
          id: programmeList[0].id,
          price: programmeList[0].price
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.wx_Server();

    // console.log(22222)
    // if (wx.getStorageSync('token')) {
    //   that.setData({
    //     flag: true
    //   })
    // } else {
    //   that.popup.showPopup();
    // }
    that.popup = that.selectComponent("#popup");
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