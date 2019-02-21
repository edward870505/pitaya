// pages/grade/alter/alter.js
var util = require('../../../util/util');
var appInstance = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'grade',
    title: {
      imgSrc: '/images/dragon_fruit.png',//表单标题图片
      text: ''//表单标题文本
    },
    otherFormSectionItem: {//定制表单项目通用配置
      imgSrc: '',//品种信息区域图片,
      text: '',//品种信息区域标签
    },
    formSections: [],//通用表单区域
    otherFormSections: [],//定制表单区域
    pickerRange: {
      'species': [],
      'areaUnits': []
    },//筛选框单位range
    dataset: {},//记录数据
    user: {},//用户数据
    shownSections:{
      'fruitmeasure':{
        label: '*果径/重量',
        imgsrc: '/images/form_label_imgs/size.png',
        inputType: 'input',
        inputPlaceHolder: '请输入果径/重量',
        initPickerText: '',
        areaUnitInput: false,
        canBeEmpty: false,
        name: 'fruitmeasure'
      },
      'color': {
        label: '着色',
        imgsrc: '/images/form_label_imgs/color.png',
        inputType: 'input',
        inputPlaceHolder: '请输入着色要求',
        initPickerText: '',
        areaUnitInput: false,
        canBeEmpty: true,
        name: 'color'
      },
      'leaf': {
        label: '叶子',
        imgsrc: '/images/form_label_imgs/leaf.png',
        inputType: 'input',
        inputPlaceHolder: '请输入叶子要求',
        initPickerText: '',
        areaUnitInput: false,
        canBeEmpty: true,
        name: 'leaf'
      },
      'skin': {
        label: '表皮',
        imgsrc: '/images/form_label_imgs/skin.png',
        inputType: 'input',
        inputPlaceHolder: '请输入叶子要求',
        initPickerText: '',
        areaUnitInput: false,
        canBeEmpty: true,
        name: 'leaf'
      }
    },
    sectionsOrder:[
      'fruitmeasure',
      'color',
      'leaf',
      'skin'
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
    //读取火龙果品种数据
    appInstance.dbData.species.forEach(function (item, index) {
      page.data.pickerRange.species.push(item.name);
    });
    //读取面积单位数据
    appInstance.dbData.units.forEach(function (item, index) {
      page.data.pickerRange.areaUnits.push(item.cn);
    });

    this.setData({
      ['pickerRange.species']: page.data.pickerRange.species,
      ['pickerRange.areaUnits']: page.data.pickerRange.areaUnits
    });

    //初始化表单
    dataset = JSON.parse(options.dataset);
    this.data.dataset = dataset;


    //渲染标题
    var text;
    text = this.data.dataset.type + this.data.dataset.fruitclass + this.data.dataset.fruitsize;
    this.setData({
      ['title.text']: text
    }); 

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
      case 'fruitmeasure':
      case 'color':
      case 'skin':
      case 'leaf':
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
    if (name == 'fieldAreaUnit' || name == 'growingAreaUnit') {
      value = this.data.pickerRange.areaUnits[pickerValueIdx];
    } else if (name == 'type') {
      value = this.data.pickerRange.species[pickerValueIdx];
    }

    switch (key) {
      case '':
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
    keys = ['fruitmeasure'];

    if (!util.operation.form.alterFormEmptyValueValidation(keys, page)) {
      //this.otherFormSectionsValidation();
      this.submitAlterForm();
    }

  },
 /**
* 函数名：submitAlterForm
 * **/
  submitAlterForm: function () {
    var dataset, type,leaf,skin,color, fruitmeasure, fruitclass, fruitsize, grade, data;
    data = {};
    grade = {};
    dataset = this.data.dataset;
    grade.type = dataset.type;
    grade.fruitmeasure = dataset.fruitmeasure;
    grade.fruitclass = dataset.fruitclass;
    grade.fruitsize = dataset.fruitsize;
    grade.color = dataset.color;
    grade.leaf = dataset.leaf;
    grade.skin = dataset.skin;


    data.collectionName = 'grades';
    data.docid = dataset._id;
    data.data = grade;

    util.operation.database.update(data, this, 'navigateBack');

  }
})