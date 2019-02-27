// pages/field/add/add.js
//引入util模块
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName:'field',
    dataset: {//通用表单区域初始化数据
      'farm': {
        name: 'farm',
        text: '农场*',
        imgSrc: '/images/label.png',
        inputType: 'farmpicker',
        inputPlaceHolder: '请选择农场',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        initPickerText: '请选择面积单位'
      },
      'serial': {
        name: 'serial',
        text: "编号*",
        imgSrc: "/images/编号.png",
        inputType: "input",
        inputPlaceHolder: "请输入地块编号",
        unitInput: false,
        unitInputType: "",
        value: '',
        canBeEmpty: false
      },
      'area': {
        name: 'area',
        text: '面积*',
        imgSrc: "/images/面积.png",
        inputType: "number",
        inputPlaceHolder: "请输入地块面积",
        initPickerText: '请选择面积单位',
        unitInput: true,
        unitInputType: "area",
        value: '',
        canBeEmpty: false,
        fieldAreaUnit: '',
        initPickerText: '请选择面积单位'
      },
    },
    formSections: [//通用表单区域配置数据
    ],
    otherFormSections:[//定制表单区域配置
    ],
    customedFormSectionItem:{//定制表单区域通用配置
      imgSrc: '/images/火龙果.png',
      text:'品种',
      tpl: {
        type: "请选择品种",
        totalAmount: "",
        growingArea: "",
        growingAreaUnit: "请选择面积单位",
        unit: '棵'
      }
    },
    pickerRange:{
      farms:[],
      species:[],
      areaUnits:[]
    },
    user:{//用户数据
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
    /**初始化品种picker数据**/
    appInstance.dbData.species.forEach(function (item, index) {
      page.data.pickerRange.species.push(item.name);
    });
    /**初始化面积单位picker数据**/
    appInstance.dbData.units.forEach(function (item, index) {
      page.data.pickerRange.areaUnits.push(item.cn);
    });
    /**初始化农场picker数据**/
    appInstance.dbData.farms.forEach(function (item, index) {
      page.data.pickerRange.farms.push(item.placeOfOrigin + ' ' + item.name);
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
   * 函数名：onAddSpeciesBtnTap
   * 功能：响应'添加种植品种'按钮点击操作
   * 参数：e<事件对象>
   * 返回值：无
  **/
  onAddCustomedFormSectionBtnTap:function(e){
    util.operation.form.onCustomedFormSectionAddBtnTap(e,this);    
  },
  /**函数：onAddItemFormSubmit
   * 功能：响应表单提交事件，
   * 
  * **/
  onAddItemFormSubmit:function(e){
    var keys,page;
    page = this;
    keys = { 'area': ['area','fieldAreaUnit'], 'serial': 'serial' };
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      this.otherFormSectionsValidation();
    }
  },
  /**
   * 函数名:onInputBlur
   * **/
  onInputBlur:function(e){
    var index, key, value, name, dataSetNames, data;
    data = {};
    index = e.currentTarget.dataset.index;
    key = e.currentTarget.dataset.key;
    name = e.currentTarget.dataset.name;
    dataSetNames = [];
    switch (key) {
      case 'area':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        value = e.detail.value;
        break;
      case 'serial':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        value = e.detail.value.trim();
        break;
      case 'totalAmount':
      case 'growingArea':
        dataSetNames.push('otherFormSections');
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
    var index, key, name,value, dataSetNames, data, pickerValueIdx;
    data = {};
    dataSetNames = [];
    key = e.currentTarget.dataset.key;
    name = e.currentTarget.dataset.name;
    index = e.currentTarget.dataset.index;
    pickerValueIdx = e.detail.value;

    if (name == 'growingAreaUnit' || name == 'fieldAreaUnit') {
      value = this.data.pickerRange.areaUnits[pickerValueIdx];
    } else if (name == 'type') {
      value = this.data.pickerRange.species[pickerValueIdx];
    } else if(name=='farm'){
      value = this.data.pickerRange.farms[pickerValueIdx];
    }
    console.log(value);
    switch (key) {
      case 'area':
      case 'farm':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        break;
      case 'type':
      case 'growingAreaUnit':
        dataSetNames.push('otherFormSections');
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
 * 函数名：otherFormSectionsValidation
 * **/
  otherFormSectionsValidation: function () {
    var speciesNotFinished, otherFormSections, varieties, page;
    page = this;
    varieties = this.data.dataset.varieties;
    otherFormSections = this.data.otherFormSections;
    speciesNotFinished = [];

    otherFormSections.forEach(function (item, index) {
      if (item.type == '请选择品种' || item.growingArea == '请选择面积单位' || item.totalAmount == '' || item.growingArea == '') {
        speciesNotFinished.push(index);
      }
    });

    if(varieties){
      if (speciesNotFinished.length > 0) {
        speciesNotFinished.forEach(function (item, index) {
          varieties.splice(item, 1);
        });
      }
    }else{
      this.data.dataset.varieties=[];
    }


    if (speciesNotFinished.length > 0) {
      wx.showModal({
        title: '存在不完整种植品种信息',
        content: '不完整的种植品种信息将不被保存,确定提交吗？',
        success(res) {
          if (res.confirm) {
            page.submitAlterForm();//提交表单信息
          }
        }
      })
    } else {
      page.submitAlterForm();
    }

  },
  /**
 * 函数名：submitAlterForm
 * **/
  submitAlterForm: function () {
    var dataset, farm, serial,area, areaUnit,areavarieties, varieties,field, data,page;
    page = this;
    data = {};
    field = {};
    dataset = this.data.dataset;
    farm = dataset.farm.value;
    area = dataset.area.value;
    serial = dataset.serial.value;
    areaUnit = dataset.area.fieldAreaUnit;
    varieties = dataset.varieties;

    field.farm = farm;
    field.area = area;
    field.serial = serial;
    field.fieldAreaUnit = areaUnit;
    field.status = false;
    field.approval = true;
    field.show = true;
    field.varieties = varieties;

    data.collectionName = 'fields';
    data.data = field;

    wx.cloud.callFunction({
      name:'query',
      data:{
        collectionName:'fields',
        keys:{
          farm:farm,
          serial:serial
        }
      },
      success(res){
        if(res.result.data.length>0){
          wx.showToast({
            title: '已存在相同编码地块',
            icon:'none'
          });
        }else{
          util.operation.database.add(data, page, 'navigateBack');
        }
      }
    });
  }
})