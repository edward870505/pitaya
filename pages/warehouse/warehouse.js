// pages/warehouse/warehouse.js
var util = require('../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'warehouse',
    operations: [
      {
        imgSrc: '/images/add_btn.png',
        text: '新增仓库',
        action: 'add'
      }
    ],
    itemImgSrc: '/images/warehouse1.png',
    childrenWarehouseImg:'/images/warehouse2.png',
    filterData: {
      initText: '请选择仓库等级',
      text: '',
      imgSrc: '/images/仓库.png',//筛选框右侧图标,
      range: ['全部','一级仓','二级仓','三级仓']
    },
    dataset:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page;
    //页面实例
    page = this;
    //初始化用户数据
    this.setData({
      user: appInstance.userData
    });

    //初始化筛选框数据
    /*初始化筛选框文本*/


    this.setData({
      ['filterData.text']: this.data.filterData.initText,
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
    var queryData,//<Object>查询操作参数设置
        page;//<Object>存储页面实例

    queryData = {};

    //存储页面实例
    page = this;


    //数据库查询操作参数设置
    queryData.collectionName = 'warehouses';
    util.operation.database.query('renderBasicinfoIndexPage', queryData, page);
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
  /***
   * 
   * 
  */
  onOperationItemTap: function (e) {
    var action, url;
    action = e.currentTarget.dataset.action;
    url = '../warehouse/' + action + '/' + action;
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 函数名:onSwitchChanged
   * 功能：响应switch组件状态改变的事件处理函数
   * 参数：e<Object>：事件对象
   * 返回值:undefined
   * 实现过程：
   * 1.读取switch的data-index属性，根据index获取对应记录的docid值，用以识别用户点击的是哪个记录的switch
   * 2.根据switch的value值判断记录是被停用还是启用
   * 3.如果是停用，则直接修改数据库对应记录的status值后更新页面实例的dataset；如果是启用，则先判断是否需要对启用的记录
   *   进行重复性验证，若有则调用重复性验证函数，若无则直接修改数据库后更新页面实例的dataset对应记录的status值
   * **/
  onSwitchValueChanged: function (e) {
    util.operation.page.onSwitchValueChanged(e, this, { repeated: false }, {}, {}, 'warehouses');
  },

  /**
   * 
   * **/
  onWarehousePickerValueChanged: function (e) {
    console.log(e);
    var fatherIndex,childrenIndex,operationId,childrenId,warehouseId,data,url;
    operationId = e.detail.value;
    fatherIndex = e.currentTarget.dataset.fatherIndex;
    childrenIndex = e.currentTarget.dataset.childrenIndex;
    
    operationId = e.detail.value;
    warehouseId = e.currentTarget.dataset.id;
    data = warehouseId;
    switch (operationId) {

      case '0':
        wx.showToast({
          title: '库存报表查询功能正在完善',
          icon:'none'
        });
        return;

      break;

      case '1':
        url = '/pages/warehouse/alterin/alterin?data=' + data;
        break;


      case '2':
        url = '/pages/warehouse/alterout/alterout?data=' + data;
      break;

      case '3':
        wx.showToast({
          title: '暂时不能删除仓库',
          icon: 'none'
        });
        return;
      break;
    }
    wx.navigateTo({
      url: url
    });
  },
  /**
   * 
   * **/
  onRootWarehousePickerValueChanged:function(e){
    var warehouseIdx,warehouse,operationId,data,url,warehouseId;
    operationId = e.detail.value;
    warehouseIdx = e.currentTarget.dataset.index;
    warehouse = this.data.dataset[warehouseIdx];
    warehouseId = warehouse._id;
    data = warehouseId;
    switch(operationId){

      case '0':
        wx.showToast({
          title: '库存报表查询功能正在完善',
          icon: 'none'
        });
        return;


      break;

      case '1':
        url = '/pages/warehouse/alterin/alterin?data=' + data;
        wx.navigateTo({
          url: url
        });
      break;

      case '2':
        url = '/pages/warehouse/alterout/alterout?data=' + data;
        wx.navigateTo({
          url: url
        });
      break;

      case '3':
        wx.showToast({
          title: '暂时不能删除仓库',
          icon:'none'
        });
      break;
    }

    console.log(warehouse);
  },

  /**
   * 函数名：onFilterValueChanged
   * 功能：根据filter picker值的变化显示相关记录
   * 参数：
   * 返回值：
   * 
   * **/
  onFilterValueChanged: function (e) {
    util.operation.page.onFilterValueChanged(e, this);
  },
  /**
  * 
  **/
  onDeleteBtnTap: function (e) {
    var index, status, ref, itemData, url, page, docid, data, validation, docid;
    data = {};
    validation = {};
    page = this;
    index = e.currentTarget.dataset.index;
    status = this.data.dataset[index].status;
    ref = this.data.dataset[index].ref;
    docid = this.data.dataset[index]._id;
    validation.on = status;
    validation.ref = ref;
    data.collectionName = 'warehouses';
    data.index = index;
    data.docid = docid;
    util.operation.page.onDeleteBtnTap(e, page, validation, data);
  },
})