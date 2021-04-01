// const baseURL = 'http://192.168.0.138:7071';  //本地测试-钟
const baseURL = 'http://192.168.0.199:7071';  // 本地测试-超
// const baseURL = 'https://kzcm.utools.club'        // 测试域名
// const baseURL = 'https://jyxk.bxyun.cn'          // 正式域名
class HTTP {
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data, method) {
    let urlApi = url.split('/');
    let token;
    if (urlApi[urlApi.length - 1] != 'log       in') {
      token = wx.getStorageSync('token')
    }
    wx.request({
      url: baseURL + url,
      method: method,
      data: data,
      header: {
        // 'content-type': 'application/json',
        token
      },

      success: (res) => {
        let message = res.data.message;
        if (message == '未登录或未授权') {
          this._showToast('未登录或未授权')
        } else {
          resolve(res.data);
        }
      },
      fail: (err) => {
        reject()
        this._showToast('请求出错，请稍后重试')
      }
    })
  }

  _showToast(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP, baseURL }