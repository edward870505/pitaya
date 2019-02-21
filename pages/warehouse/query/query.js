// pages/warehouse/query/query.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warehouse_name:'',
    scrollTop:'',
    warehouse:{
      name:'',
      materials:[

      ],
      in_record:{
        "fertilzer":""
      },
      out_record:{

      }
    },
    warehouse:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name,warehouse;
    warehouse = JSON.parse(options.data);
    this.setData({
      warehouse:warehouse
    });
    console.log(warehouse);
   
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
  /*
  
  */
  onListScroll:function(e){
    console.log(e);
    var scrollTop;
    scrollTop = e.detail.scrollTop;
    this.setData({scrollTop:scrollTop});

  },
  /*
  
  
  */
  onMaterialItemTap:function(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/warehouse/query/detail/detail',
    })
  }
})