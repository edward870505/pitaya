// pages/team/addteam/addteam.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'addteam',
    dataset: {//通用表单区域初始化数据
      'field': {
        imgSrc: '/images/field1.png',
        text: '地块*',
        inputType: 'farmpicker',
        inputPlaceHolder: '请选择农场',
        initPickerText: '请选择地块',
        unitInput: true,
        unitInputType: 'field',
        value: '',
        canBeEmpty: false,
        name: 'field',
        teamfield:''
      },
      'serial': {
        imgSrc: '/images/编号.png',
        text: '编号*',
        inputType: 'input',
        inputPlaceHolder: '请输入编号',
        initPickerText: '',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        name: 'serial'
      },
      'desc': {
        imgSrc: '/images/form_label_imgs/content-2.png',
        text: '备注',
        inputType: 'input',
        inputPlaceHolder: '请输入备注内容',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'desc'
      }
    },
    formSections: [//通用表单区域配置数据
    ],
    pickerRange: {
      type: [],
      farmsRange:[],
      fieldsRange:[]
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

    appInstance.dbData.farms.forEach(function(item,index){
      page.data.pickerRange.farmsRange.push(item.placeOfOrigin + ' ' +item.name);
    });

    this.setData({
      pickerRange:this.data.pickerRange
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
    var page,index, key, name, value, dataSetNames, data, pickerValueIdx;
    page = this;
    data = {};
    dataSetNames = [];
    key = e.currentTarget.dataset.key;
    name = e.currentTarget.dataset.name;
    index = e.currentTarget.dataset.index;
    pickerValueIdx = e.detail.value;
    if (name == 'field') {
      value = this.data.pickerRange.farmsRange[pickerValueIdx];
    }else if(name=='teamfield'){
      value = this.data.pickerRange.fieldsRange[pickerValueIdx];
      console.log(value);
    }
    if(name == 'field'){
      console.log(appInstance.dbData.fields)
      appInstance.dbData.fields.forEach(function(item,index){
        if(item.farm==value){
          if (page.data.pickerRange.fieldsRange.indexOf(item.farm)==-1){
            page.data.pickerRange.fieldsRange.push(item.serial);
          }
        }
      });

      this.setData({
        pickerRange:page.data.pickerRange
      });

      console.log(page.data.pickerRange);
    }
    switch (key) {
      case 'field':
      case 'teamfield':
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
      case 'serial':
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
    keys = { 'field':['field','teamfield'],'serial': 'serial'};
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      page.submitAddForm();
    }
  },
  /**
  * 函数名：submitAddForm
  * **/
  submitAddForm: function () {
    var dataset, team, data, page;
    page = this;
    data = {};
    team = {};
    dataset = this.data.dataset;

    team.farm = dataset.field.value;
    team.fieldSerial = dataset.field.teamfield;
    team.serial = dataset.serial.value;
    team.desc = dataset.desc.value;
    team.members = [];
    team.status = false;
    team.ref = false;
    team.approval = true;
    team.show = true;



    data.collectionName = 'teams';
    data.data = team;

    wx.cloud.callFunction({
      name: 'query',
      data: {
        collectionName: 'teams',
        keys: {
          serial: team.serial,
          field:team.field
        }
      },
      success(res) {
        if (res.result.data.length > 0) {
          wx.showToast({
            title: '已存在相同编码小组',
            icon: 'none'
          });
        } else {
          util.operation.database.add(data, page, 'navigateBack');
        }
      }
    });

  },

})