// pages/produceplan/alter/alter.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'producePlan',
    title: {
      imgSrc: '/images/node-2.png',//表单标题图片
      text: ''//表单标题文本
    },
    otherFormSectionItem: {//定制表单项目通用配置
      imgSrc: '/images/火龙果.png',//品种信息区域图片,
      text: '产量预测',//品种信息区域标签
    },
    formSections: [],//通用表单区域
    otherFormSections: [],//定制表单区域
    pickerRange: {
      
    },//筛选框单位range
    dataset: {},//记录数据
    user: {},//用户数据
    shownSections: {
      'finishedDatePlan': {
        label: '计划时间*',
        imgsrc: '/images/form_label_imgs/日历-1.png',
        inputType: 'datepicker',
        inputPlaceHolder: '',
        initPickerText: '',
        areaUnitInput: false,
        canBeEmpty: false,
        name: 'finishedDatePlan'
      },
      'finishedDate': {
        label: '完成时间',
        imgsrc: '/images/form_label_imgs/日历-1.png',
        inputType: 'datepicker',
        inputPlaceHolder: '请选择时间',
        initPickerText: '',
        areaUnitInput: false,
        canBeEmpty: true,
        name: 'finishedDate'
      },
      'desc': {
        label: '备注',
        imgsrc: '/images/form_label_imgs/content-2.png',
        inputType: 'textarea',
        inputPlaceHolder: '请输入备注',
        initPickerText: '',
        areaUnitInput: false,
        canBeEmpty: true,
        name: 'desc'
      }
    },
    sectionsOrder:[
      'finishedDatePlan',
      'finishedDate',
      'desc',
      'totalProduction',
      'amountUnit'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dataset, page;
    //页面实例
    page = this;
    //初始化用户数据
    this.setData({
      user: appInstance.userData
    });


    //初始化表单
    dataset = JSON.parse(options.dataset);
    this.data.dataset = dataset;


    //渲染标题
    var text;
    text = this.data.dataset.farm + ' '+ this.data.dataset.node;
    this.setData({
      ['title.text']: text
    });

    if (this.data.dataset.node=='摘果'){
      this.data.shownSections.totalProduction = {
            label: '总产量',
            imgsrc: '/images/production.png',
            inputType: 'disabledinput',
            inputPlaceHolder: '',
            initPickerText: '',
            areaUnitInput: false,
            canBeEmpty: true,
            name: 'totalProduction'
      };

      this.data.shownSections.amountUnit = {
        label: '产量单位',
        imgsrc: '/images/form_label_imgs/计量单位.png',
        inputType: 'disabledinput',
        inputPlaceHolder: '',
        initPickerText: '',
        areaUnitInput: false,
        canBeEmpty: true,
        name: 'amountUnit'
      }
    }

    //显示表单
    util.operation.page.renderBasicinfoAlterPage(dataset, page);
    //console.log(this.data.formSections);
    //console.log(this.data.dataset);

    
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
 * 函数名: onInputBlur
 * 
 * **/
  onInputBlur: function (e) {
    var index, key, name, value, dataSetNames, data;
    data = {};
    name = e.currentTarget.dataset.name;
    key = e.currentTarget.dataset.key;
    index = e.currentTarget.dataset.index;
    dataSetNames = [];
    switch (key) {
      case 'desc':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        value = e.detail.value;
      break;
    }

    data.dataSetNames = dataSetNames;
    data.dataSetKey = key;
    data.dataSetName = name;
    data.sectionIndex = index;
    data.value = value;
    data.itemName = this.data.itemName;
    util.operation.form.onAlterInputBlur(data, this);

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
    if (name == 'finishedDatePlan' || name == 'finishedDate') {
      value = e.detail.value;
    }

    switch (key) {
      case 'finishedDatePlan':
      case 'finishedDate':
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
    util.operation.form.onAlterPickerValueChanged(data, this);
  },
  /**
 * 函数名：onAlterFromSubmit
 * 功能：响应表单提交事件
 * 函数：e<Object>--事件对象
 * 实现过程:
 * 1.对formSections区域input的值做非空验证，若存在空字段，终止提交，提示用户
 * 2.对formSections区域picker的值做非空及其他规则验证，若验证不通过，终止提交，提示用户
 * 3.对otherFormSections区域的input及picker值进行制定规则验证，若验证不通过，终止提交，提示用户
 * 4.提交表单，修改数据
 * **/
  onAlterFormSubmit: function (e) {
    //对formSections的input值做非空验证
    var keys, page;
    page = this;
    keys = ['finishedDatePlan'];

    if (!util.operation.form.alterFormEmptyValueValidation(keys, page)) {
      this.submitAlterForm();
    }

  },
  /**
 * 函数名：submitAlterForm
 * **/
  submitAlterForm: function () {
    var dataset, plan, data;
    data = {};
    plan = {};

    dataset =  this.data.dataset;
    plan.finishedDatePlan = dataset.finishedDatePlan;
    plan.finishedDate = dataset.finishedDate;
    if (plan.finishedDate!=''){
      plan.finished = true;
    }
    plan.desc = dataset.desc;

    data.collectionName = 'produceplans';
    data.docid = dataset._id;
    data.data = plan;

    util.operation.database.update(data, this, 'navigateBack');

  }
})