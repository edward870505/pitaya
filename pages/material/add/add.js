// pages/material/add/add.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'material',
    action:'addMaterial',
    dataset: {//通用表单区域初始化数据
      'type': {
        imgSrc: '/images/form_label_imgs/type-1.png',
        text: '物资类型*',
        inputType: 'materialpicker',
        inputPlaceHolder: '请选择物资类型',
        initPickerText: '',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        name: 'type'
      },
      'name': {
        imgSrc: '/images/form_label_imgs/name.png',
        text: '名称*',
        inputType: 'input',
        inputPlaceHolder: '请输入物资名称',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'name'
      },
      'specification': {
        imgSrc: '/images/form_label_imgs/品牌.png',
        text: '品牌型号',
        inputType: 'input',
        inputPlaceHolder: '请输品牌型号',
        unitInput: false,
        unitInputType: '',
        initPickerText: '',
        value: '',
        canBeEmpty: false,
        name: 'specification'
      },
      'mainUnit': {
        imgSrc: '/images/form_label_imgs/计量单位.png',
        text: '主单位',
        inputType: 'commonpicker',
        inputPlaceHolder: '请选择主单位',
        unitInput: false,
        unitInputType: '',
        initPickerText: '',
        value: '',
        canBeEmpty: false,
        name: 'mainUnit',
        rangeKey:'amountUnit',
        range_key:'cn'
      },
      'subUnit': {
        imgSrc: '/images/form_label_imgs/计量单位.png',
        text: '副单位',
        inputType: 'commonpicker',
        inputPlaceHolder: '请选择副单位',
        unitInput: false,
        unitInputType: '',
        initPickerText: '',
        value: '',
        canBeEmpty: false,
        name: 'subUnit',
        rangeKey: 'amountUnit',
        range_key:'cn'
      }
    },
    formSections: [//通用表单区域配置数据
    ],
    otherFormSections: [//定制表单区域配置
    ],
    pickerRange: {
      type: [],
      amountUnit:[]
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

    /*初始化筛选框Range*/
    page.data.pickerRange.type.push('父类');

    appInstance.dbData.parent_materials.forEach(function (item, index) {
      page.data.pickerRange.type.push(item.name);
    });

    appInstance.initDataBase('units','amountUnit',page);

    this.setData({
      ['pickerRange.type']: this.data.pickerRange.type
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
    if(name == 'mainUnit' || name == 'subUnit'){
      value  = this.data.pickerRange.amountUnit[pickerValueIdx].cn;
    }
    switch (key) {
      case 'type':
      case 'mainUnit':
      case 'subUnit':
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
      case 'specification':
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
    keys = { 'type': 'type', 'name': 'name'};
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      page.submitAddForm();
    }
  },
  /**
  * 函数名：submitAddForm
  * **/
  submitAddForm: function () {
    var dataset, type, name, specification, material, data, page;
    page = this;
    data = {};
    material = {};
    dataset = this.data.dataset;
    type = dataset.type.value;
    material.name = dataset.name.value;
    material.specification = dataset.specification.value;
    material.type = dataset.type.value;
    material.mainUnit = dataset.mainUnit.value;
    material.subUnit = dataset.subUnit.value;
    material.status = false;
    material.ref = false;
    material.approval = true;
    material.show = true;
    data.data = material;

    if(type=='父类'){
      data.collectionName = 'parent_materials';
      wx.cloud.callFunction({
        name:'query',
        data:{
          collectionName:'parent_materials',
          keys:{
            name:material.name
          }
        },
        success:function(res){
          if(res.result.data.length>0){
            wx.showToast({
              title: '相同父类物资已存在',
              icon:'none'
            })
          }else{
            util.operation.database.add(data, page, 'navigateBackParentMaterial');
          }
        }
      });
      
    }else{
      if(material.subUnit=='' || material.mainUnit==''||material.specification == ''){
        wx.showToast({
          title: '品牌型号、主单位、副单位必填',
          icon:'none'
        });
        return;
      }
      data.collectionName = 'sub_materials';
      util.operation.database.add(data, page, 'navigateBack');
    }

    
    

  }
})