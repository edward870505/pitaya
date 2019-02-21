// pages/exchangerate/add/add.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'exchangerate',
    dataset: {//通用表单区域初始化数据
      'origin': {
        imgSrc: '/images/form_label_imgs/currency.png',
        text: '原币种*',
        inputType: 'picker',
        inputPlaceHolder: '请选择原币种',
        initPickerText: '',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        name: 'origin'
      },
      'rate': {
        imgSrc: '/images/form_label_imgs/exchange.png',
        text: '汇率*',
        inputType: 'number',
        inputPlaceHolder: '请输入汇率',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'rate'
      },
      'target': {
        imgSrc: '/images/form_label_imgs/currency.png',
        text: '目标币种*',
        inputType: 'picker',
        inputPlaceHolder: '请选择目标币种',
        unitInput: false,
        unitInputType: '',
        initPickerText: '',
        value: '',
        canBeEmpty: true,
        name: 'target'
      }
    },
    formSections: [//通用表单区域配置数据
    ],
    otherFormSections: [//定制表单区域配置
    ],
    pickerRange: {
      type: ['人民币', '美金','越南盾']
    },
    user: {//用户数据
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page;

    page = this;
    var that = this;

    //初始化用户数据
    this.setData({
      user: appInstance.userData
    });

    //渲染表单通用区域
    util.operation.page.renderAddPageFormSections(this);
    console.log(this.data.formSections);

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
* 函数名：onPickerValueChanged
* **/
  onPickerValueChanged: function (e) {
    var index, key, name, value, dataSetNames, data, pickerValueIdx;
    data = {};
    dataSetNames = [];
    key = e.currentTarget.dataset.key;
    name = e.currentTarget.dataset.name;
    index = e.currentTarget.dataset.index;
    pickerValueIdx = e.detail.value;
    if (name == 'origin'||name=='target') {
      value = this.data.pickerRange.type[pickerValueIdx];
    }
    switch (key) {
      case 'origin':
      case 'target':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        break;
    }
    data.dataSetNames = dataSetNames;
    data.dataSetKey = key;
    data.sectionIndex = index;
    data.dataSetName = name;
    data.value = value;
    data.itemName = this.data.itemName;
    util.operation.form.onAddPickerValueChanged(data, this);
  },
  /**
  * 函数名:onInputBlur
  * **/
  onInputBlur: function (e) {
    var index, key, value, name, dataSetNames, data;
    data = {};
    index = e.currentTarget.dataset.index;
    key = e.currentTarget.dataset.key;
    name = e.currentTarget.dataset.name;
    dataSetNames = [];
    switch (key) {
      case 'rate':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        value = e.detail.value;
        break;
    }

    data.dataSetNames = dataSetNames;
    data.dataSetKey = key;
    data.sectionIndex = index;
    data.dataSetName = name;
    data.value = value;
    data.itemName = this.data.itemName;
    util.operation.form.onAddInputBlur(data, this);
  },
  /**函数：onAddItemFormSubmit
   * 功能：响应表单提交事件，
   * 
  * **/
  onAddItemFormSubmit: function (e) {
    var keys, page;
    page = this;
    keys = { 'origin': 'origin', 'target': 'target','rate':'rate' };
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      page.submitAddForm();
    }
  },
  /**
  * 函数名：submitAddForm
  * **/
  submitAddForm: function () {
    var dataset, origin, target, rate, exchangerate, data, page;
    page = this;
    data = {};
    exchangerate = {};
    dataset = this.data.dataset;

    exchangerate.origin = dataset.origin.value;
    exchangerate.target = dataset.target.value;
    if (exchangerate.origin == exchangerate.target){
      wx.showToast({
        title: '原币种与目标币种不能相同',
        icon:'none'
      });
      return;
    }
    exchangerate.rate = dataset.rate.value;
    exchangerate.status = false;
    exchangerate.ref = false;
    exchangerate.show = true;
    exchangerate.approval = true;

    data.collectionName = 'exchangerates';
    data.data = exchangerate;

    util.operation.database.add(data, page, 'navigateBack');

  }
})