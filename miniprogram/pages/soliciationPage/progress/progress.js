// pages/soliciationPage/progress/progress.js
import { User } from '../../../api/url'
let user = new User()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  created() {
    this.wx_collect()
  },
  /**
   * 组件的初始数据
   */
  data: {
    activityList:[]
  },
created(){
  this.wx_collect()
},
  /**
   * 组件的方法列表
   */
  methods: {
    wx_collect() {
      user.wxollect({
      }).then(res => {
        if (res.success == true) {
          console.log(res.data,111)
          this.setData({
            activityList: res.data
          })
        }
      })
    }
  }
})
