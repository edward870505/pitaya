// pages/scheme/alter/alter.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'scheme',
    title: {
      imgSrc: '/images/scheme.png',//表单标题图片
      text: ''//表单标题文本
    },
    otherFormSectionItem: {//定制表单项目通用配置
      imgSrc: '/images/方案线.png',//品种信息区域图片,
      text: '方案',//品种信息区域标签
    },
    formSections: [],//通用表单区域
    otherFormSections: [],//定制表单区域
    pickerRange: {
      'units': [],
      'materials': [],
      'farmings':[]
    },//筛选框单位range
    dataset: {},//记录数据
    user: {},//用户数据
    shownSections: {
      'farming': {
        imgsrc: "/images/form_label_imgs/农事.png",
        label: "类型*",
        inputType: 'farmingpicker',
        inputPlaceHolder: '请选择农事种类',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        initPickerText: '请选择面积单位',
        name: 'farming',
      },
      'name': {
        imgsrc: "/images/form_label_imgs/name.png",
        label: "名称*",
        name: 'name',
        inputType: "input",
        inputPlaceHolder: "请输入方案名称",
        unitInput: false,
        unitInputType: "",
        value: '',
        canBeEmpty: false
      },
      'desc': {
        imgsrc: "/images/form_label_imgs/content-2.png",
        label: "内容",
        name: 'desc',
        inputType: "textarea",
        inputPlaceHolder: "请输入方案内容",
        unitInput: false,
        unitInputType: "",
        value: '',
        canBeEmpty: false
      }
    },
    sectionsOrder:['farming','name','desc']
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

    appInstance.dbData.farmings.forEach(function (item, index) {
      if (item.approval) {
        page.data.pickerRange.farmings.push(item.name);
      }
    });

    appInstance.dbData.units.forEach(function (item, index) {
      if (item.approval) {
        if (item.type == '数量单位' || item.type == '重量单位') {
          page.data.pickerRange.units.push(item.cn);
        }
      }
    });

    appInstance.dbData.sub_materials.forEach(function (item, index) {
      if (item.approval) {
        page.data.pickerRange.materials.push(item.name + '-' + item.specification);
      }
    });

    this.setData({
      pickerRange:this.data.pickerRange
    });

    //初始化表单
    dataset = JSON.parse(options.dataset);
    this.data.dataset = dataset;

    //渲染标题
    var text;
    text = this.data.dataset.name + '方案';
    this.setData({
      ['title.text']: text
    });

    //显示表单区域
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
  * 函数名：onAddSpeciesBtnTap
  * 功能：响应'添加种植品种'按钮点击操作
  * 参数：e<事件对象>
  * 返回值：无
  **/
  onAddMaterialBtnTap: function (e) {
    var materials = this.data.otherFormSections;
    materials.push(
      {
        material: "请选择物资",
        totalAmount: "",
        amountUnit: "请选择数量单位"
      }
    );
    this.setData({
      otherFormSections: materials
    });
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
        value = e.detail.value;
      break;
      case 'totalAmount':
        dataSetNames.push('otherFormSections');
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
    keys = ['farming', 'name'];

    if (!util.operation.form.alterFormEmptyValueValidation(keys, page)) {
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
    var dataset,scheme, data;
    data = {};
    scheme = {};
    dataset = this.data.dataset;
    scheme.farmingar = dataset.farming;
    scheme.name = dataset.name;
    scheme.materials = dataset.materials;
    scheme.desc = dataset.desc;

    data.collectionName = 'schemes';
    data.docid = dataset._id;
    data.data = scheme;

    util.operation.database.update(data, this, 'navigateBack');

  },

})