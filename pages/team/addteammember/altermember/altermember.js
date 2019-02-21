// pages/team/addteammember/altermember/altermember.js
var util = require('../../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: '',
    title: {
      imgSrc: '/images/用户.png',//表单标题图片
      text: ''//表单标题文本
    },
    otherFormSectionItem: {//定制表单项目通用配置
      imgSrc: '',//品种信息区域图片,
      text: '',//品种信息区域标签
    },
    formSections: [],//通用表单区域
    otherFormSections: [],//定制表单区域
    pickerRange: {
      sexsRange: ['男','女']
    },//筛选框单位range
    dataset: {},//记录数据
    user: {},//用户数据
    shownSections: {
      'name': {
        imgsrc: '/images/name1.png',
        label: '姓名*',
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
        imgsrc: '/images/数字.png',
        label: '年龄',
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
        imgsrc: '/images/性别.png',
        label: '性别：',
        inputType: 'picker',
        inputPlaceHolder: '请选择性别',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'sex'
      },
      'desc': {
        imgsrc: '/images/form_label_imgs/content-2.png',
        label: '备注',
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
    sectionsOrder:['name','sex','desc'] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('hi');
    var dataset, page,text;
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
    text = this.data.dataset.name;
    this.setData({
      ['title.text']: text
    });

    //显示表单
    util.operation.page.renderBasicinfoAlterPage(dataset, page);
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
      case 'age':
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

    if (name == 'sex') {
      value = this.data.pickerRange.sexsRange[pickerValueIdx];
    }

    switch (key) {
      case 'sex':
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
    keys = ['name'];

    if (!util.operation.form.alterFormEmptyValueValidation(keys, page)) {
      //this.otherFormSectionsValidation();
      this.submitAlterForm();
    }

  },
  /**
* 函数名：submitAlterForm
* **/
  submitAlterForm: function () {
    var dataset, member, data;
    data = {};
    member = {};
    dataset = this.data.dataset;
    member.name = dataset.name;
    member.sex = dataset.sex;
    member.desc = dataset.desc;
    member.age = dataset.age;

    data.collectionName = 'team_members';
    data.docid = dataset._id;
    data.data = member;

    util.operation.database.update(data, this, 'navigateBack');

  },


})