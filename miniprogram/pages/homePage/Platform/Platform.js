// pages/homePage/Platform/Platform.js
import { User } from '../../../api/url.js'
let user = new User()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    plat: '黑平台查询',
    platName: '',
    platUrl: '',
    guideMember: '',
    guideType: '',
    remark: '',
    pfList: []
  },

  created() {
    // this.toptDetail()
    this.wx_analyse()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    teamNameClick(e) {
      // console.log(e.detail.value)
      let that = this
      that.setData({
        platName: e.detail.value
      })
    },
    teamLinkClick(e) {
      let that = this
      that.setData({
        platUrl: e.detail.value
      })
    },
    teamRoomClick(e) {
      let that = this
      that.setData({
        guideMember: e.detail.value
      })
    },
    teamTeachClick(e) {
      let that = this
      that.setData({
        guideType: e.detail.value
      })
    },
    teamInfoClick(e) {
      let that = this
      that.setData({
        remark: e.detail.value
      })
    },
    //黑平台查询
    toptDetail() {
      // console.log(e, 99)
      let that = this
      user.wxQuery({
        plat: that.data.plat,
        platName: that.data.platName,
        platUrl: that.data.platUrl,
        guideMember: that.data.guideMember,
        guideType: that.data.guideType,
        remark: that.data.remark,
      }).then(res => {
        if (res.success == true) {
          console.log(JSON.parse(res.message))
          wx.navigateTo({
            url: '../../homePage/ptDetails/ptDetails',
          })
        } else {
          wx.showToast({
            title: '未查询到信息',
            icon: "none"
          })
        }
      })
    },

    //获取黑平台分析信息
    wx_analyse() {
      user.wxAnalyse({
      }).then(res => {
        if (res.success == true) {
          // console.log(JSON.parse(res.message))
          this.setData({
            pfList: JSON.parse(res.message)
          })
        }
      })
    }
  }
})
