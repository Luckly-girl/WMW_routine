// pages/homePage/law/law.js
import {User} from '../../../api/url.js'
let user=new User()
var WxParse = require('../../../wxParse/wxParse');
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
    layList:[]
  },
created(){
  this.wx_lawIntroduce()
},
  /**
   * 组件的方法列表
   */
  methods: {
    toFwzs(event){
      let id = event.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../../homePage/fwzsDetails/fwzsDetails?id='+id,
      })
    },
    wx_lawIntroduce(){
      let that=this
      user.wxlawIntroduce('1').then(res=>{
        if(res.success==true){
          // console.log(JSON.parse(res.message),777)
          var layList = JSON.parse(res.message)
          // console.log(result)
          that.setData({
            layList:layList
          })
          var list = []
          for (var i = 0; i < layList.length; i++) {
            list.push(layList[i].content)
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
    }
  }
})
