// pages/warehouse/alterout/alterout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warehouse:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var warehouseId,page,warehouse;
    
    page = this;
    warehouseId = options.data;

    wx.cloud.callFunction({
      name: 'query',
      data: {
        collectionName: 'warehouses',
        keys: {
          _id: warehouseId
        }
      },
      success(res) {
        console.log(res)
        warehouse = res.result.data[0];
        page.setData({
          warehouse: warehouse
        });
      }
    });

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

  },
  /**
   * 
   * **/
  onAddBtnTap: function (e) {
    var url,data;
    data = this.data.warehouse._id;
    url = '/pages/warehouse/in/in?data='+data;
    wx.navigateTo({
      url: url,
    })
  }
})