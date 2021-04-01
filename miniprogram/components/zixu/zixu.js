// components/d.js
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
    flag: false
  },
  created() {
    setTimeout(()=>{
      if (wx.getStorageSync('token')) {
        this.setData({
          flag: true
        })
      } else {
        this.setData({
          flag: false
        })
      }
    },500)
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goRoom() {
      console.log('000')
    },
    // handleConsult() {
    //   let that = this;
    //   // console.log(22222)
    //   if (wx.getStorageSync('token')) {
    //     that.setData({
    //       flag: true
    //     })
    //   } else {
    //     that.popup.showPopup();
    //   }
    // }
  }
})
