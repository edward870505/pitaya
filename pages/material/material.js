// pages/material/material.js
var util = require('../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'material',
    itemImgSrc: '/images/material.png',
    filterData: {
      initText: '请选择物资类型',
      text: '',
      imgSrc: '/images/form_label_imgs/物资.png',//筛选框右侧图标,
      range: []
    },
    operations: [
      {
        imgSrc: '/images/add_btn.png',
        text: '新增物资',
        action: 'add'
      }
    ],
    dataset: []
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
    this.data.filterData.text = this.data.filterData.initText;
    /*初始化筛选框Range*/
    this.data.filterData.range.push('全部');
    appInstance.dbData.parent_materials.forEach(function (item, index) {
      page.data.filterData.range.push(item.name);
    });
    
    this.setData({
      ['filterData.text']: this.data.filterData.initText,
      ['filterData.range']: this.data.filterData.range
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
    queryData.collectionName = 'sub_materials';
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
  /**参数名:onOperationItemTap
  * 功能：操作按钮点击响应
  * 参数：e<事件对象>
  * **/
  onOperationItemTap: function (e) {
    var item, action, url;
    item = 'materials';
    //读取操作标记值
    action = e.currentTarget.dataset.action;
    //判断用户是否有'新增'权限
    if (!util.operation.authority.isOperationAllowed(item, this.data.user.authorities)) {
      return;
    }
    //根据操作标记值，拼接URL
    url = './' + action + '/' + action;
    //跳转到对应页面
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
    util.operation.page.onSwitchValueChanged(e, this, { repeated: false }, {}, {}, 'sub_materials');
  },
  /***
  * 
  */
  onAlterBtnTap: function (e) {
    var index, status, itemData, url, ref, validation, data, page;

    page = this;
    data = {};
    validation = {};
    index = e.currentTarget.dataset.index;
    status = this.data.dataset[index].status;
    ref = false;

    validation.on = status;
    validation.ref = ref;
    validation.repeated = false;

    data.collectionName = 'sub_materials';
    data.index = index;

    util.operation.page.onAlterBtnTap(e, page, validation, data);


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
    data.collectionName = 'sub_materials';
    data.index = index;
    data.docid = docid;
    util.operation.page.onDeleteBtnTap(e, page, validation, data);
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
  }
})