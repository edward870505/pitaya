// pages/farm/add/add.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'farm',
    dataset: {//通用表单区域初始化数据
      'placeOfOrigin': {
        imgSrc: '/images/区域排序1.png',
        text: '所属地*',
        inputType: 'placepicker',
        inputPlaceHolder: '请选择流农场所属地',
        initPickerText: '',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        name: 'placeOfOrigin'
      },
      'company': {
        imgSrc: '/images/公司名称.png',
        text: '所属公司*',
        inputType: 'companypicker',
        inputPlaceHolder: '请选择所属公司',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'company'
      },
      'name': {
        imgSrc: '/images/form_label_imgs/currency.png',
        text: '名称*',
        inputType: 'input',
        inputPlaceHolder: '请输入农场名称',
        unitInput: false,
        unitInputType: '',
        initPickerText: '',
        value: '',
        canBeEmpty: true,
        name: 'name'
      }
    },
    formSections: [//通用表单区域配置数据
    ],
    otherFormSections: [//定制表单区域配置
    ],
    pickerRange: {
      placeOfOrigin: ['平顺省'],
      companies:['越南总公司']
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
    if (name == 'placeOfOrigin') {
      value = this.data.pickerRange.placeOfOrigin[pickerValueIdx];
    }
    if (name == 'company') {
      value = this.data.pickerRange.companies[pickerValueIdx];
    }
    switch (key) {
      case 'placeOfOrigin':
      case 'company':
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
    keys = { 'placeOfOrigin': 'placeOfOrigin', 'name': 'name','company':'company' };
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      page.submitAddForm();
    }
  },
  /**
  * 函数名：submitAddForm
  * **/
  submitAddForm: function () {
    var dataset, farm, data, page;
    page = this;
    data = {};
    farm = {};
    dataset = this.data.dataset;

    farm.placeOfOrigin = dataset.placeOfOrigin.value;
    farm.company = dataset.company.value;
    farm.name = dataset.name.value;
    farm.status = false;
    farm.ref = false;
    farm.approval = true;
    farm.show = true;

    data.collectionName = 'farms';
    data.data = farm;

    wx.cloud.callFunction({
      name: 'query',
      data: {
        collectionName: 'farms',
        keys: {
          placeOfOrigin: farm.placeOfOrigin,
          company: farm.company,
          name:farm.name
        }
      },
      success(res) {
        if (res.result.data.length > 0) {
          wx.showToast({
            title: '已存在相同农场',
            icon: 'none'
          });
        } else {
          util.operation.database.add(data, page, 'navigateBack');
        }
      }
    });
  }

})