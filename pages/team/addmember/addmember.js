// pages/team/addmember/addmember.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'addteam',
    dataset: {//通用表单区域初始化数据
      'name': {
        imgSrc: '/images/name1.png',
        text: '姓名*',
        inputType: 'input',
        inputPlaceHolder: '请输入姓名',
        initPickerText: '',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        name: 'name'
      },
      'age': {
        imgSrc: '/images/数字.png',
        text: '年龄',
        inputType: 'number',
        inputPlaceHolder: '请输入年龄',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'age'
      },
      'sex': {
        imgSrc: '/images/性别.png',
        text: '性别：',
        inputType: 'sexpicker',
        inputPlaceHolder: '请选择性别',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'sex'
      },
      'desc': {
        imgSrc: '/images/form_label_imgs/content-2.png',
        text: '备注',
        inputType: 'textarea',
        inputPlaceHolder: '请输入备注',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'desc'
      },
    },
    formSections: [//通用表单区域配置数据
    ],
    pickerRange: {
      type: ['男','女']
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

    this.data.appInstance = appInstance;
    
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
    if (name == 'sex') {
      value = this.data.pickerRange.type[pickerValueIdx];
    }
    switch (key) {
      case 'sex':
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
      case 'age':
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
    keys = { 'name': 'name' };
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      page.submitAddForm();
    }
  },
  /**
  * 函数名：submitAddForm
  * **/
  submitAddForm: function () {
    var dataset, member, data, page;
    page = this;
    data = {};
    member = {};
    dataset = this.data.dataset;

    member.name = dataset.name.value;
    member.age= dataset.age.value;
    member.sex = dataset.sex.value;
    member.desc = dataset.desc.value;
    member.teamIds = [];

    member.status = false;
    member.ref = false;
    member.approval = true;

    data.collectionName = 'team_members';
    data.data = member;

    util.operation.database.add(data, page, 'navigateBackTeamMembers');

  }
  
})