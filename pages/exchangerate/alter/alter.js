// pages/exchangerate/alter/alter.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'exchangerate',
    title: {
      imgSrc: '/images/form_label_imgs/汇率.png',//表单标题图片
      text: ''//表单标题文本
    },
    otherFormSectionItem: {//定制表单项目通用配置
      imgSrc: '',//品种信息区域图片,
      text: '',//品种信息区域标签
    },
    formSections: [],//通用表单区域
    otherFormSections: [],//定制表单区域
    pickerRange: {
      'types': ['人民币', '美金', '越南盾']
    },//筛选框单位range
    dataset: {},//记录数据
    user: {},//用户数据
    shownSections: {
      'origin': {
        imgsrc: '/images/form_label_imgs/currency.png',
        label: '原币种*',
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
        imgsrc: '/images/form_label_imgs/exchange.png',
        label: '汇率*',
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
        imgsrc: '/images/form_label_imgs/currency.png',
        label: '目标币种*',
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
    sectionsOrder:['origin','rate','target']
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

    this.data.pickerRange.types = ['人民币', '越南盾','美金'];

    this.setData({
      ['pickerRange.types']: page.data.pickerRange.types,
    });

    //初始化表单
    dataset = JSON.parse(options.dataset);
    this.data.dataset = dataset;


    //渲染标题
    var text;
    text = this.data.dataset.origin+'兑'+this.data.dataset.target;
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
      case 'rate':
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
    console.log(key, name);
    index = e.currentTarget.dataset.index;
    pickerValueIdx = e.detail.value;
    if (name == 'origin'||name=='target') {
      value = this.data.pickerRange.types[pickerValueIdx];
    }
    switch (key) {
      case 'origin':
      case 'target':
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

    if(page.data.dataset.origin == page.data.dataset.target){
      wx.showToast({
        title: '原币种与目标币种不能相同',
        icon:'none'
      });
      return;
    }

    keys = ['type', 'name'];

    if (!util.operation.form.alterFormEmptyValueValidation(keys, page)) {
      this.submitAlterForm();
    }

  },
  /**
   * 函数名：submitAlterForm
   * **/
  submitAlterForm: function () {
    var dataset, orgin, target, rate, exchangerate, data;
    data = {};
    exchangerate = {};
    dataset = this.data.dataset;
    exchangerate.origin = dataset.origin;
    exchangerate.target = dataset.target;
    exchangerate.rate = dataset.rate;
    exchangerate.approval = true;
    exchangerate.status = false;
    exchangerate.ref = false;

    data.collectionName = 'exchangerates';
    data.docid = dataset._id;
    data.data = exchangerate;

    util.operation.database.update(data, this, 'navigateBack');

  },
})