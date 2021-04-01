// pages/homePage/servic/servic.js
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
    servicList: []
  },
  created() {
    this.wx_lawIntroduce()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toFwzs(event) {
      let id = event.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../../homePage/serDetial/serDetial?id=' + id,
      })
    },
    wx_lawIntroduce() {
      user.wxlawIntroduce('2').then(res => {
        if (res.success == true) {
          // console.log(JSON.parse(res.message))
          this.setData({
            servicList: JSON.parse(res.message)
          })
        }
      })
    }
  }
})
