// pages/warehouse/out/out.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sections: [
      {
        imgSrc: '/images/进出仓.png',
        text: '出仓方式：',
        inputType: 'picker',
        inputPlaceHolder: '请选择出仓方式',
        unitInput: false,
        unitInputType: ''
      },
      {
        imgSrc: '/images/form_label_imgs/物资.png',
        text: '物资：',
        inputType: 'picker',
        inputPlaceHolder: '请选择出仓物资',
        unitInput: false,
        unitInputType: ''
      },
      {
        imgSrc: '/images/数字.png',
        text: '数量：',
        inputType: 'input',
        inputPlaceHolder: '请输入数量',
        unitInput: true,
        unitInputType: 'amount'
      },
      {
        imgSrc: '/images/转换.png',
        text: '转换：',
        inputType: 'picker',
        inputPlaceHolder: '请选择单位转换关系',
        unitInput: false,
        unitInputType: ''
      }

    ]
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