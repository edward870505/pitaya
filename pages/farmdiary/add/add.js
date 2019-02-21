// pages/farmdiary/add/add.js
var util = require('../../../util/util');
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'farmdiary',
    dataset: {//通用表单区域初始化数据
      'time': {
        imgSrc: '/images/form_label_imgs/日历-1.png',
        text: '时间*',
        inputType: 'datepicker',
        inputPlaceHolder: '请选择计划时间',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        initPickerText: '',
        name:'time'
      },
      'period': {
        name: 'period',
        text: '物候期*',
        imgSrc: "/images/阶段.png",
        inputType: "commonpicker",
        inputPlaceHolder: "请选择物候期",
        initPickerText: '',
        unitInput: false,
        unitInputType: "",
        value: '',
        canBeEmpty: false,
        range:'period'
      },
      'farm': {
        imgSrc: '/images/农场.png',
        text: '农场*',
        inputType: "commonpicker",
        inputPlaceHolder: "请选择农场",
        unitInput: false,
        unitInputType: "",
        value: '',
        canBeEmpty: false,
        name:'farm',
        range:'farm'
      },
      'farming': {
        name: 'farming',
        text: '农事*',
        imgSrc: '/images/form_label_imgs/farming.png',
        inputType: "commonpicker",
        inputPlaceHolder: "请选择农事活动",
        initPickerText: '',
        unitInput: false,
        unitInputType: "farming",
        value: '',
        canBeEmpty: false,
        range:'farming'
      },
      'scheme': {
        name: 'scheme',
        text: '方案*',
        imgSrc: '/images/form_label_imgs/方案.png',
        inputType: "commonpicker",
        inputPlaceHolder: "请选择方案",
        initPickerText: '方案内容',
        unitInput: true,
        unitInputType: "contenttextarea",
        value: '',
        canBeEmpty: false,
        range:'scheme',
        unitInputName:'schemeContent',
        schemeContent:'',
        range_key:'name'
      },
      'field': {
        name: 'field',
        text: '地块*',
        imgSrc: "/images/field1.png",
        inputType: "radiopicker",
        inputPlaceHolder: "请输入地块",
        initPickerText: '',
        unitInput: false,
        unitInputType: "field",
        value: '',
        canBeEmpty: false,
        disabled:true
      },
      'team': {
        name: 'team',
        text: '小组*',
        imgSrc: "/images/成员.png",
        inputType: "radiopicker",
        inputPlaceHolder: "请输入小组",
        initPickerText: '',
        unitInput: false,
        unitInputType: "field",
        value: '',
        canBeEmpty: false,
        disabled:true
      },
      'desc': {
        name: 'desc',
        text: '备注',
        imgSrc: "/images/form_label_imgs/content-2.png",
        inputType: "textarea",
        inputPlaceHolder: "请输入备注",
        initPickerText: '',
        unitInput: false,
        unitInputType: "desc",
        value: '',
        canBeEmpty: false,
      },
      
    },
    formSections: [//通用表单区域配置数据
    ],
    pickerRange: {
      farm: [],
      farming: [],
      period: ['枝条生长','生芽','花芽分化','开花','结果','果实成熟'],
      scheme:[],
    },
    user: {//用户数据
    },
    popupDialog:{
      title:'',
      confirmText:'确认',
      cancelText:'取消',
      items:[]
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


    //初始化pickerRange
    appInstance.dbData.farms.forEach(function(item,index){
      if(item.status){
        page.data.pickerRange.farm.push(item.placeOfOrigin+' '+item.name);
      }
    });

    //初始化pickerRange
    appInstance.dbData.farmings.forEach(function (item, index) {
      if (item.status) {
        page.data.pickerRange.farming.push(item.name);
      }
    });

    //初始化pickerRange
 


    this.setData({
      pickerRange: this.data.pickerRange
    });

    //渲染表单通用区域
    util.operation.page.renderAddPageFormSections(this);
    console.log(this.data.formSections);
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
  onRadioPickerTap:function(e){
    var key,title,farm,page,items,keyIndex;
    page = this;
    key = e.currentTarget.dataset.key;
    keyIndex = e.currentTarget.dataset.index;
    if(key=='field' || key=='team'){
      if (this.data.dataset.farm.value == ''){
        wx.showToast({
          title: '请选选择农场',
          icon: 'none'
        });
        return;
      }
    }

    this.dialog.setData({
      key:key,
      keyIndex:keyIndex
    });

    switch(key){
      case 'field':
        items = [];
        farm = this.data.dataset.farm.value;
        appInstance.dbData.fields.forEach(function(item, index){
          if(item.status && item.farm == farm){
            items.push(item);
          }
        });
        title ='请选择地块';
      break;
      case 'team':
        items = [];
        farm = this.data.dataset.farm.value;
        title = '请选择小组';
        appInstance.dbData.teams.forEach(function (item, index) {
          if (item.status && item.farm==farm) {
            items.push(item);
          }
        });
      break;
    }
    this.setData({
      ['popupDialog.title']: title
    });
    this.dialog.setData({
      items:items
    });
    this.dialog.showDialog();

    
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
      case 'desc':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        value = e.detail.value;
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
    index = e.currentTarget.dataset.index;
    pickerValueIdx = e.detail.value;
    if (name == 'time') {
      value = e.detail.value;
    } else if (name == 'period') {
      value = this.data.pickerRange.period[pickerValueIdx];
    } else if (name == 'farm') {
      value = this.data.pickerRange.farm[pickerValueIdx];
    }else if(name=='farming'){
      value = this.data.pickerRange.farming[pickerValueIdx];
      appInstance.dbData.schemes.forEach(function (item, index) {
        if (item.status&&item.farming==value) {
          page.data.pickerRange.scheme.push(item);
        }
      });
      this.setData({
        ['pickerRange.scheme']:page.data.pickerRange.scheme
      });
    }else if(name=='scheme'){
      if(this.data.dataset.farming.value==''){
        wx.showToast({
          title: '请先选择农事活动',
          icon:'none'
        })
        return;
      }
      value = this.data.pickerRange.scheme[pickerValueIdx];
      console.log(value);
    }
    switch (key) {
      case 'time':
      case 'period':
      case 'farm':
      case 'farming':
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
    util.operation.form.onAddPickerValueChanged(data, this);
  },
  /**
   * 
   * **/
  _cancelEvent:function(){
    this.dialog.hideDialog();
  },
  _confirmEvent:function(){
    this.dialog.hideDialog();
  },
  onCheckboxGroupValueChaned:function(){
    console.log('变化了');
  },
  /**函数：onAddItemFormSubmit
   * 功能：响应表单提交事件，
   * 
  * **/
  onAddItemFormSubmit: function (e) {
    var keys, page;
    page = this;
    keys = {'time':'time','period':'period','farm':'farm','farming':'farming'};
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      this.otherFormSectionsValidation(['scheme','field','team']);
    }
  },
  otherFormSectionsValidation:function(keys){
    var page = this;
    keys.forEach(function(item,index){

      if (page.data.dataset[item].value == '') {
          wx.showToast({
            title: '带*号为必填项',
            icon: 'none'
          });
          return;
      }
      
    });
    this.submitAddItemForm();
  },
  /**
  * 函数名：submitAlterForm
  * **/
  submitAddItemForm: function () {
    var dataset, diary, data,page;
    page = this;
    data = {};
    
    dataset = this.data.dataset;
    


    data.collectionName = 'farmingdiary';
    
    diary = {};
    diary.period = dataset.period.value;
    diary.farm = dataset.farm.value;
    diary.farming = dataset.farming.value;
    diary.scheme = dataset.scheme.value;
    diary.field = dataset.field.value;
    diary.team = dataset.team.value;
    diary.desc = dataset.desc.value;
    diary.planDate = dataset.time.value;
    diary.finishedDate = '';
    diary.finished = false;
    diary.approval = true;
    diary.field = dataset.field.value;
 
    data.data = diary;

    util.operation.database.add(data, page, 'navigateBack');

  
  }
})