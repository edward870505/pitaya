// pages/farming/add/add.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'farming',
    dataset: {//通用表单区域初始化数据
      'type': {
        imgSrc: '/images/form_label_imgs/type-1.png',
        text: '*农事类型',
        inputType: 'picker',
        inputPlaceHolder: '请选择农事类型',
        initPickerText: '',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        name: 'type'
      },
      'name': {
        imgSrc: '/images/form_label_imgs/name.png',
        text: '*农事名称',
        inputType: 'input',
        inputPlaceHolder: '请输入农事名称',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'name'
      },
      'desc': {
        imgSrc: '/images/form_label_imgs/content-2.png',
        text: '农事内容',
        inputType: 'textarea',
        inputPlaceHolder: '请输入农事内容',
        unitInput: false,
        unitInputType: '',
        initPickerText: '',
        value: '',
        canBeEmpty: true,
        name: 'desc'
      }
    },
    formSections: [//通用表单区域配置数据
    ],
    otherFormSections: [//定制表单区域配置
    ],
    pickerRange: {
      type: ['产出型', '非产出型']
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
    if (name == 'type') {
      value = this.data.pickerRange.type[pickerValueIdx];
    }
    switch (key) {
      case 'type':
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
      case 'name':
      case 'desc':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        value = e.detail.value.trim();
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
    keys = { 'type': 'type', 'name': 'name' };
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      page.submitAddForm();
    }
  },
  /**
  * 函数名：submitAddForm
  * **/
  submitAddForm: function () {
    var dataset, type, name, desc, farming, data, page;
    page = this;
    data = {};
    farming = {};
    dataset = this.data.dataset;

    farming.type = dataset.type.value;
    farming.name = dataset.name.value;
    farming.desc = dataset.desc.value;
    farming.status = false;
    farming.ref = false;
    farming.approval = true;
    farming.show = true;

    data.collectionName = 'farmings';
    data.data = farming;

    util.operation.database.add(data, page, 'navigateBack');

  }
})