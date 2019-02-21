// pages/farming/alter/alter.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'farming',
    title: {
      imgSrc: '/images/form_label_imgs/farming-1.png',//表单标题图片
      text: ''//表单标题文本
    },
    otherFormSectionItem: {//定制表单项目通用配置
      imgSrc: '',//品种信息区域图片,
      text: '',//品种信息区域标签
    },
    formSections: [],//通用表单区域
    otherFormSections: [],//定制表单区域
    pickerRange: {
      'types': ['产出型', '非产出型']
    },//筛选框单位range
    dataset: {},//记录数据
    user: {},//用户数据
    shownSections: {
      'type': {
        imgsrc: '/images/form_label_imgs/type-1.png',
        label: '*农事类型',
        inputType: 'picker',
        inputPlaceHolder: '请选择农事类别',
        initPickerText: '',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        name: 'type'
      },
      'name': {
        imgsrc: '/images/form_label_imgs/name.png',
        label: '*农事名称',
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
        imgsrc: '/images/form_label_imgs/name.png',
        label: '农事内容',
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
    sectionsOrder:['type','name','desc']
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

    this.data.pickerRange.types = ['产出型', '非产出型'];

    this.setData({
      ['pickerRange.types']: page.data.pickerRange.types,
    });

    //初始化表单
    dataset = JSON.parse(options.dataset);
    this.data.dataset = dataset;


    //渲染标题
    var text;
    text = this.data.dataset.name;
    this.setData({
      ['title.text']: text
    });

    //显示表单
    util.operation.page.renderBasicinfoAlterPage(dataset, page);
    console.log(this.data.formSections);
    console.log(this.data.dataset);
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
      case 'name':
      case 'desc':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        value = e.detail.value.trim();
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
    console.log(key, name);
    index = e.currentTarget.dataset.index;
    pickerValueIdx = e.detail.value;
    if (name == 'type') {
      value = this.data.pickerRange.types[pickerValueIdx];
    }
    switch (key) {
      case 'type':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        break;
      case '':
      case '':
        dataSetNames.push('otherFormSections');
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
    keys = ['type', 'name'];

    if (!util.operation.form.alterFormEmptyValueValidation(keys, page)) {
      this.submitAlterForm();
    }

  },
  /**
   * 函数名：submitAlterForm
   * **/
  submitAlterForm: function () {
    var dataset, type, name, desc, farming, data;
    data = {};
    farming = {};
    dataset = this.data.dataset;
    farming.type = dataset.type;
    farming.name = dataset.name;
    farming.desc = dataset.desc;
    farming.approval = true;
    farming.status = false;
    farming.ref = false;

    data.collectionName = 'farmings';
    data.docid = dataset._id;
    data.data = farming;

    util.operation.database.update(data, this, 'navigateBack');

  },

})