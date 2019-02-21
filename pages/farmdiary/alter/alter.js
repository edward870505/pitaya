// pages/farmdiary/alter/alter.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'farmdiary',
    action:'alterFarmingDiary',
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
      farm: [],
      farming: [],
      period: ['枝条生长', '生芽', '花芽分化', '开花', '结果', '果实成熟'],
      scheme: [],
    },
    dataset: {},//记录数据
    user: {},//用户数据
    shownSections: {
      'planDate': {
        imgsrc: '/images/form_label_imgs/日历-1.png',
        label: '计划时间*',
        inputType: 'datepicker',
        inputPlaceHolder: '请选择计划时间',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        initPickerText: '',
        name: 'planDate'
      },
      
      'finishedDate': {
        imgsrc: '/images/form_label_imgs/日历-1.png',
        label: '完成时间*',
        inputType: 'datepicker',
        inputPlaceHolder: '请选择完成时间',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        initPickerText: '',
        name: 'planDate'
      },
      'period': {
        name: 'period',
        label: '物候期*',
        imgsrc: "/images/阶段.png",
        inputType: "commonpicker",
        inputPlaceHolder: "请选择物候期",
        initPickerText: '',
        unitInput: false,
        unitInputType: "",
        value: '',
        canBeEmpty: false,
        range: 'period'
      },
      'farm': {
        imgsrc: '/images/农场.png',
        label: '农场*',
        inputType: "commonpicker",
        inputPlaceHolder: "请选择农场",
        unitInput: false,
        unitInputType: "",
        value: '',
        canBeEmpty: false,
        name: 'farm',
        range: 'farm'
      },
      'farming': {
        name: 'farming',
        label: '农事*',
        imgsrc: '/images/form_label_imgs/farming.png',
        inputType: "commonpicker",
        inputPlaceHolder: "请选择农事活动",
        initPickerText: '',
        unitInput: false,
        unitInputType: "farming",
        value: '',
        canBeEmpty: false,
        range: 'farming'
      },
      'scheme': {
        name: 'scheme',
        label: '方案*',
        imgsrc: '/images/form_label_imgs/方案.png',
        inputType: "commonpicker",
        inputPlaceHolder: "请选择方案",
        initPickerText: '方案内容',
        unitInput: true,
        unitInputType: "contenttextarea",
        value: '',
        canBeEmpty: false,
        range: 'scheme',
        unitInputName: 'schemeContent',
        schemeContent: '',
        range_key: 'name'
      },
      'field': {
        name: 'field',
        label: '地块*',
        imgsrc: "/images/field1.png",
        inputType: "radiopicker",
        inputPlaceHolder: "请输入地块",
        initPickerText: '',
        unitInput: false,
        unitInputType: "field",
        value: '',
        canBeEmpty: false,
        disabled: true
      },
      'team': {
        name: 'team',
        label: '小组*',
        imgsrc: "/images/成员.png",
        inputType: "radiopicker",
        inputPlaceHolder: "请输入小组",
        initPickerText: '',
        unitInput: false,
        unitInputType: "field",
        value: '',
        canBeEmpty: false,
        disabled: true
      },
      'desc': {
        name: 'desc',
        label: '备注',
        imgsrc: "/images/form_label_imgs/content-2.png",
        inputType: "textarea",
        inputPlaceHolder: "请输入备注",
        initPickerText: '',
        unitInput: false,
        unitInputType: "desc",
        value: '',
        canBeEmpty: false,
      },
    },
    sectionsOrder: ['planDate','finishedDate','period','farm','farming','scheme','field','team','desc'],
    popupDialog: {
      title: '',
      confirmText: '确认',
      cancelText: '取消',
      items:[]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var dataset, page;
    //页面实例
    page = this;
    console.log(page);
    //初始化用户数据
    this.setData({
      user: appInstance.userData
    });

    //初始化表单
    dataset = JSON.parse(options.dataset);
    this.data.dataset = dataset;


    //渲染标题
    var text;
    if(dataset.finished){
      text = this.data.dataset.farming+'['+this.data.dataset.finishedDate+']';
    }else{
      text = this.data.dataset.farming + '[' + this.data.dataset.planDate + ']';
    }
    


    //初始化pickerRange
    appInstance.dbData.farms.forEach(function (item, index) {
      if (item.status) {
        page.data.pickerRange.farm.push(item.placeOfOrigin + ' ' + item.name);
      }
    });

    //初始化pickerRange
    appInstance.dbData.farmings.forEach(function (item, index) {
      if (item.status) {
        page.data.pickerRange.farming.push(item.name);
      }
    });

    appInstance.dbData.schemes.forEach(function (item, index) {
      if (item.status && item.farming == page.data.dataset.farming) {
        page.data.pickerRange.scheme.push(item);
      }
    });

    this.setData({
      ['title.text']: text,
      pickerRange:this.data.pickerRange
    });

    //显示表单
    util.operation.page.renderBasicinfoAlterPage(dataset, page);


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent('#dialog');
    this.dialog.data.page = this;
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
    var index, key, name, value, dataSetNames, data, pickerValueIdx,page;
    page = this;
    data = {};
    dataSetNames = [];
    key = e.currentTarget.dataset.key;
    name = e.currentTarget.dataset.name;
    console.log(key, name);
    index = e.currentTarget.dataset.index;
    pickerValueIdx = e.detail.value;

    if (name == 'farm'||name=='farming'||name=='period') {
      value = this.data.pickerRange[name][pickerValueIdx];
    }
    if (name == 'planDate' || name=='finishedDate') {
      value = e.detail.value;
    }
    if(name=='scheme'){
      if (this.data.dataset.farming.value == '') {
        wx.showToast({
          title: '请先选择农事活动',
          icon: 'none'
        })
        return;
      }
      value = this.data.pickerRange.scheme[pickerValueIdx];
      this.setData({
        ['formSections[4].value']:value
      });
      console.log(value);
    }

    if(name=='farming'){
      page.data.pickerRange.scheme = [];
      appInstance.dbData.schemes.forEach(function (item, index) {
        if (item.status && item.farming == value) {
          page.data.pickerRange.scheme.push(item);
        }
      });
      this.setData({
        ['pickerRange.scheme']: page.data.pickerRange.scheme
      });
    }

    if(name == 'farm'){
      this.data.dataset.field = [];
      this.setData({
        ['formSections[5].value']:['请输入地块']
      });
    }

    switch (key) {
      case 'farm':
      case 'farming':
      case 'period':
      case 'planDate':
      case 'finishedDate':
      case 'scheme':
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
   * **/
  onRaidoViewTap: function (e) {

    var key, title, farm, page, items, keyIndex;
    page = this;
    key = e.currentTarget.dataset.key;
    keyIndex = e.currentTarget.dataset.index;

    if (key == 'field' || key == 'team') {
      if (this.data.dataset.farm.value == '') {
        wx.showToast({
          title: '请选选择农场',
          icon: 'none'
        });
        return;
      }
    }

    this.dialog.setData({
      key: key,
      keyIndex: keyIndex
    });

    switch (key) {
      case 'field':
        items = [];
        farm = this.data.dataset.farm;
        appInstance.dbData.fields.forEach(function (item, index) {
          if (item.status && item.farm == farm) {
            items.push(item);
          }
        });
        title = '请选择地块';
        break;
      case 'team':
        items = [];
        farm = this.data.dataset.farm;
        title = '请选择小组';
        appInstance.dbData.teams.forEach(function (item, index) {
          if (item.status && item.farm == farm) {
            items.push(item);
          }
        });
        break;
    }

    this.setData({
      ['popupDialog.title']: title
    });

    this.dialog.setData({
      items: items
    });

    this.dialog.showDialog();

  },
  /**
   * 
   * **/
  _cancelEvent: function () {
    this.dialog.hideDialog();
  },
  /**
   * 
   * **/
  _confirmEvent: function () {
    this.dialog.hideDialog();
  },
  /**
   * 
   * 
   * **/

  onAlterFormSubmit:function(e){
    var dataset,diary,data;
    data = {};
    diary = {};
    dataset = this.data.dataset;

    console.log(dataset);
    data.collectionName = 'farmingdiary';
    data.docid = dataset._id;

    if(dataset.field.length==0){
      wx.showToast({
        title: '地块不能为空',
        icon:'none'
      });
      return;
    }

    diary.period = dataset.period;
    diary.farm = dataset.farm;
    diary.farming = dataset.farming;
    diary.scheme = dataset.scheme;
    diary.field = dataset.field;
    diary.team = dataset.team;
    diary.desc = dataset.desc;
    diary.planDate = dataset.planDate;
    if(dataset.finishedDate!=''){
      diary.finishedDate = dataset.finishedDate;
      diary.finished = true;
    }
    
    data.data = diary;

    console.log(data);

    util.operation.database.update(data, this, 'navigateBack');

    

  },
  /**
   * 
   * **/

})