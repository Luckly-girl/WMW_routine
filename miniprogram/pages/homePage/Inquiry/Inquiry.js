// pages/homePage/Inquiry/Inquiry.js
import { User } from '../../../api/url';
let user = new User();
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
    show1: false,
    phone: "",
    order: '订单对象',
    price: '',
    id: '',
    content:'',
    InquiryList: []
  },
  created() {
    this.wx_server()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    wx_server() {
      let that=this
      user.wxServer('2').then(res => {
        if (res.success == true) {
          let InquiryList = JSON.parse(res.message);
          console.log(InquiryList)
          InquiryList.forEach(val=>{
            that.setData({
              price:val.price,
              id:val.id,
              content:val.content,
              InquiryList: InquiryList
            })
          })
          console.log(that.data.price,that.data.id)
        }
      })
    },
    Inquiry() {
      this.setData({
        show1: true
      })
    },
    phoneinput(e) {
      let that=this
      that.setData({
        phone: e.detail.value
      })
      console.log(that.data.phone)
    },
    submit() {
      const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (this.data.phone == '') {
        wx.showToast({
          title: '手机号码不能为空',
          icon: "none"
        })
      } else if (!myreg.test(this.data.phone)) {
        wx.showToast({
          title: '手机号码格式不对',
          icon: "none"
        })
      } else {
        this.setData({
          show1: false
        })
        user.wxSerOrder({
          order: this.data.order,
          amount: this.data.price,
          lossesDesc: this.data.content,
          lossesMoney: this.data.price,
          lossesName: '电话服务',
          lossesPhone: this.data.phone,
          lossesPlatName: '电话服务',
          payType: '1',
          solutionId: this.data.id
        }).then(res => {
          if (res.success == true) {
            wx.showToast({
              title: "提交成功"
            })
          }
          // console.log(JSON.parse(res.message))
        })
      }
    }
  }
})
