// pages/grade/add/add.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'grade',
    dataset: {//通用表单区域初始化数据
      'standardType':{
        imgSrc:'/images/火龙果.png',
        text:'等级类别*',
        inputType:'multiselector',
        inputPlaceHolder:'请选择等级类别',
        unitInput:false,
        unitInputType:'',
        name:'standardType',
        initPickerText:'',
        value:'',
        canBeEmpty:false
      },
      'fruitmeasure':{
        name:'fruitmeasure',
        imgSrc:'/images/size.png',
        text:'果径/重量*',
        inputType:'input',
        inputPlaceHolder:'请输入果径/重量',
        unitInput:false,
        value: '',
        canBeEmpty:false,
        initPickerText:''
      },
      'leaf': {
        imgSrc: '/images/leaf.png',
        text: '叶子',
        inputType: 'input',
        inputPlaceHolder: '请输入叶子要求',
        unitInput: false,
        unitInputType: '',
        name: 'leaf',
        value: '',
        canBeEmpty:true,
        initPickerText:''
      },
      'color': {
        imgSrc: '/images/color.png',
        text: '成色',
        inputType: 'input',
        inputPlaceHolder: '请输入成色要求',
        unitInput: false,
        unitInputType: '',
        name: 'color',
        value: '',
        canBeEmpty:true,
        initPickerText:''
      },
      'skin': {
        imgSrc: '/images/果面.png',
        text: '果面',
        inputType: 'input',
        inputPlaceHolder: '请输入果面要求',
        unitInput: false,
        unitInputType: '',
        name: 'skin',
        value: '',
        canBeEmpty:true,
        initPickerText:''
      }
    },
    formSections: [//通用表单区域配置数据
    ],
    otherFormSections: [//定制表单区域配置
    ],
    customedFormSectionItem: {//定制表单区域通用配置
      imgSrc: '/images/火龙果.png',
      text: '品种',
      tpl: {
        type: "请选择品种",
        totalAmount: "",
        growingArea: "",
        growingAreaUnit: "请选择面积单位",
        unit: '棵'
      }
    },
    pickerRange: {
      farms: [],
      species: [],
      areaUnits: [],
      grade: [
        ['红肉', '白肉', '燕窝果'],
        ['一级', '二级', '三级'],
        ['大果', '中果', '小果']
      ]
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
    if (name == 'standardType') {
      var typeIdx, classIdx, sizeIdx, type, fruitclass, fruitsize;
      typeIdx = e.detail.value[0];
      classIdx = e.detail.value[1];
      sizeIdx = e.detail.value[2];
      type = this.data.pickerRange.grade[0][typeIdx];
      fruitclass = this.data.pickerRange.grade[1][classIdx];
      fruitsize = this.data.pickerRange.grade[2][sizeIdx];
      value = type + ' ' + fruitclass + ' ' + fruitsize;
    }
    switch (key) {
      case 'standardType':
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
      case 'fruitmeasure':
      case 'color':
      case 'leaf':
      case 'skin':
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
  onAddItemFormSubmit:function(e){
    var keys,page;
    page = this;
    keys = { 'standardType': 'standardType','fruitmeasure':'fruitmeasure' };
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      page.submitAddForm();
    }
  },
/**
* 函数名：submitAddForm
* **/
  submitAddForm: function () {
    var dataset, standardTypeArr, type, fruitclass, fruitsize, fruitmeasure, leaf, color, skin, grade, data, page;
    page = this;
    data = {};
    grade = {};
    dataset = this.data.dataset;

    standardTypeArr = dataset.standardType.value.split(' ');
    grade.type = standardTypeArr[0];
    grade.fruitclass = standardTypeArr[1];
    grade.fruitsize = standardTypeArr[2];

    grade.fruitmeasure = dataset.fruitmeasure.value;
    grade.color = dataset.color.value;
    grade.skin = dataset.skin.value;
    grade.leaf = dataset.leaf.value;
    grade.status = false;
    grade.ref = false;
    grade.approval = true;
    grade.show = true;    

    data.collectionName = 'grades';
    data.data = grade;

    util.operation.database.add(data, page, 'navigateBack');
  
  }
})