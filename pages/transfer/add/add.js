// pages/transfer/add/add.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'transfer',
    dataset: {//通用表单区域初始化数据
      'transfer': {
        imgSrc: '/images/form_label_imgs/type-1.png',
        text: '转换种类*',
        inputType: 'transferPicker',
        inputPlaceHolder: '请选择转换种类',
        initPickerText: '',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        name: 'transfer'
      },
      'origin': {
        imgSrc: '/images/form_label_imgs/计量单位.png',
        text: '源单位*',
        inputType: 'unitPicker',
        inputPlaceHolder: '请选择源单位',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'origin'
      },
      'amount': {
        imgSrc: '/images/数字.png',
        text: '数量*',
        inputType: 'number',
        inputPlaceHolder: '请输入数量单位',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'amount'
      },
      'target': {
        imgSrc: '/images/form_label_imgs/计量单位.png',
        text: '目标单位*',
        inputType: 'unitPicker',
        inputPlaceHolder: '请选择目标单位',
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
      transfers:[],
      units:[]
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

    appInstance.dbData.transferTypes.forEach(function(item,index){
      page.data.pickerRange.transfers.push(item);
    });

    appInstance.dbData.units.forEach(function (item, index) {
      page.data.pickerRange.units.push(item.cn);
    });

    this.setData({
      'pickerRange':this.data.pickerRange
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
    if (name == 'origin' || name=='target') {
      value = this.data.pickerRange.units[pickerValueIdx];
    }
    if (name == 'transfer') {
      value = this.data.pickerRange.transfers[pickerValueIdx];
    }
    switch (key) {
      case 'origin':
      case 'target':
      case 'transfer':
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
      case 'amount':
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
    keys = { 'transfer': 'transfer', 'orgin': 'origin' ,'amount':'amount','target':'target'};
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      page.submitAddForm();
    }
  },
  /**
  * 函数名：submitAddForm
  * **/
  submitAddForm: function () {
    var dataset, transfer, data, page;
    page = this;
    data = {};
    transfer = {};
    dataset = this.data.dataset;

    transfer.transfer = dataset.transfer.value;
    transfer.origin = dataset.origin.value;
    transfer.amount = dataset.amount.value;
    transfer.target = dataset.target.value;
    transfer.status = false;
    transfer.ref = false;
    transfer.approval = true;
    transfer.show = true;

    data.collectionName = 'transfers';
    data.data = transfer;

    util.operation.database.add(data, page, 'navigateBack');

  }
})