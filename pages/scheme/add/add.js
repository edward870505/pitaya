// pages/scheme/add/add.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataRender: {
      pageTitle: "新增地块",
      schemeImgUrl: '/images/方案线.png'
    },
    materials: [
      {
        type: "",
        totalAmount: "",
        growingArea: "",
        areaUnit: ""
      }
    ],
    itemName: 'scheme',
    dataset: {//通用表单区域初始化数据
      'farming': {
        imgSrc: "/images/form_label_imgs/农事.png",
        text: "类型*",
        inputType: 'farmingpicker',
        inputPlaceHolder: '请选择农事种类',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        initPickerText: '请选择面积单位',
        name:'farming',
      },
      'name': {
        imgSrc: "/images/form_label_imgs/name.png",
        text: "名称*",
        name: 'name',
        inputType: "input",
        inputPlaceHolder: "请输入方案名称",
        unitInput: false,
        unitInputType: "",
        value: '',
        canBeEmpty: false
      },
      'desc': {
        imgSrc: "/images/form_label_imgs/name.png",
        text: "内容",
        name: 'desc',
        inputType: "textarea",
        inputPlaceHolder: "请输入方案内容",
        unitInput: false,
        unitInputType: "",
        value: '',
        canBeEmpty: false
      }
    },
    formSections: [//通用表单区域配置数据
    ],
    otherFormSections: [//定制表单区域配置
    ],
    customedFormSectionItem: {//定制表单区域通用配置
      imgSrc: '/images/方案线.png',
      text: '物资*',
      tpl: {
        material: "请选择物资",
        totalAmount: "",
        amountUnit: "请选择数量单位",
      }
    },
    pickerRange: {
      materials: [],
      units: [],
      farmings: []
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


    //初始化pickerRange

    appInstance.dbData.farmings.forEach(function (item, index) {
      if(item.approval){
        page.data.pickerRange.farmings.push(item.name);
      }
    });

    appInstance.dbData.units.forEach(function (item, index) {
      if(item.approval){
        if(item.type=='数量单位'||item.type=='重量单位'){
          page.data.pickerRange.units.push(item.cn);
        }
      }
    });

    appInstance.dbData.sub_materials.forEach(function (item, index) {
      if(item.approval){
        page.data.pickerRange.materials.push(item.name + '-' + item.specification);
      }
    });

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
   * 函数名：onAddMaterialBtnTap
   * 功能：响应'添加种植品种'按钮点击操作
   * 参数：e<事件对象>
   * 返回值：无
  **/
  onAddCustomedFormSectionBtnTap: function (e) {
    util.operation.form.onCustomedFormSectionAddBtnTap(e, this);
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
      case 'desc':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        value = e.detail.value.trim();
        break;
      case 'totalAmount':
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
    var index, key, name, value, dataSetNames, data, pickerValueIdx;
    data = {};
    dataSetNames = [];
    key = e.currentTarget.dataset.key;
    name = e.currentTarget.dataset.name;
    index = e.currentTarget.dataset.index;
    pickerValueIdx = e.detail.value;
    if (name == 'farming') {
      value = this.data.pickerRange.farmings[pickerValueIdx];
    } else if (name == 'material') {
      value = this.data.pickerRange.materials[pickerValueIdx];
    } else if (name == 'amountUnit') {
      value = this.data.pickerRange.units[pickerValueIdx];
    }
    switch (key) {
      case 'farming':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
        break;
      case 'material':
      case 'amountUnit':
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
  onAddItemFormSubmit: function (e) {
    var keys, page;
    page = this;
    keys = { 'farming': 'farming', 'name': 'name' };
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      this.otherFormSectionsValidation();
    }
  },
  /**
  * 函数名：otherFormSectionsValidation
  * **/
  otherFormSectionsValidation: function () {
    var materialNotFinished, otherFormSections, materials, page;
    page = this;
    materials = this.data.dataset.materials;
    otherFormSections = this.data.otherFormSections;
    materialNotFinished = [];

    otherFormSections.forEach(function (item, index) {
      if (item.material == '请选择物资' || item.amountUnit == '请选择数量单位' || item.totalAmount == '') {
        materialNotFinished.push(index);
      }
    });

    if (materials) {
      if (materialNotFinished.length > 0) {
        materialNotFinished.forEach(function (item, index) {
          materials.splice(item, 1);
        });
      }
    } else {
      this.data.dataset.materials = [];
    }


    if (materialNotFinished.length > 0) {
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
    var dataset, farming, name, materials, scheme, desc, data, page;
    page = this;
    data = {};
    scheme = {};
    dataset = this.data.dataset;
    desc = dataset.desc.value;
    farming = dataset.farming.value;
    name = dataset.name.value;
    materials = dataset.materials;

    scheme.farming = farming;
    scheme.name = name;
    scheme.desc =  desc;
    scheme.status = false;
    scheme.approval = true;
    scheme.materials = materials;

    console.log(scheme);

    data.collectionName = 'schemes';
    data.data = scheme;

    wx.cloud.callFunction({
      name: 'query',
      data: {
        collectionName: 'schemes',
        keys: {
          farming: farming,
          name: name
        }
      },
      success(res) {
        if (res.result.data.length > 0) {
          wx.showToast({
            title: '已存在相同名称方案',
            icon: 'none'
          });
        } else {
          util.operation.database.add(data, page, 'navigateBack');
        }
      }
    });
  }
})