// pages/produceplan/add/add.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'produceplan',
    dataset: {//通用表单区域初始化数据
      'farm': {
        imgSrc: '/images/field1.png',
        text: '农场*',
        name: 'farm',
        inputType: 'farmpicker',
        inputPlaceHolder: '请选择农场',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        initPickerText: ''
      },
      'node': {
        imgSrc: '/images/form_label_imgs/流程.png',
        text: '生产流程*',
        name: 'node',
        inputType: "nodepicker",
        inputPlaceHolder: "请选择生产流程",
        unitInput: false,
        unitInputType: "",
        value: '',
        canBeEmpty: false
      },
      'finishedDatePlan': {
        imgSrc: '/images/form_label_imgs/时间.png',
        text: '时间*',
        name:'finishedDatePlan',
        inputType: "datepicker",
        inputPlaceHolder: "请选择计划完成时间",
        unitInput: false,
        unitInputType: "area",
        value: '',
        canBeEmpty: false,
        initPickerText: ''
      }
    },
    formSections: [//通用表单区域配置数据
    ],
    otherFormSections: [//定制表单区域配置
    ],
    customedFormSectionItem: {//定制表单区域通用配置
      imgSrc: '/images/火龙果.png',
      text: '产量预测*',
      productionUnit:'',
      tpl: {
        gradeId:'',
        gradeName: "请选择果实等级",
        gradeMeasure:'',
        gradeColor:'',
        gradeLeaf:'',
        gradeSkin:'',
        gradeProduction: "",
        predictionUnit:"",
        actualProduction:""
      }
    },
    pickerRange: {
      farms: [],
      grades: [],
      weightUnits:[],
      nodes:[]
    },
    user: {//用户数据
    },
    totalProduction:{
      imgSrc:'/images/production.png',
      text:'总产量*',
      inputPlaceHolder:'请输入预测的总产量',
      pickerText:'请选择产量单位',
      value:'',
      amountUnit:''
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
    /**初始化面积单位picker数据**/
    appInstance.dbData.units.forEach(function (item, index) {
      if(item.type=='重量单位'){
        if (item.approval && item.status) { 
          page.data.pickerRange.weightUnits.push(item.cn);
        }
        
      }
    });
    /**初始化农场picker数据**/
    appInstance.dbData.farms.forEach(function (item, index) {
      if(item.approval && item.status){
        page.data.pickerRange.farms.push(item.placeOfOrigin + ' ' + item.name);
      }
    });

    /**初始化流程picker数据**/
    appInstance.dbData.producenodes.forEach(function (item, index) {
      if (item.approval && item.status) {
        page.data.pickerRange.nodes.push(item.name);
      }
    });

    /**初始化等级picker数据**/
    appInstance.dbData.grades.forEach(function (item, index) {
      if (item.approval && item.status) {
        page.data.pickerRange.grades.push({
          gradeId:item._id,
          gradeName:item.type+item.fruitclass+item.fruitsize,
          gradeMeasure:item.fruitmeasure,
          gradeSkin:item.skin,
          gradeLeaf:item.leaf,
          gradeColor:item.color
        });
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
   * 函数名：onAddSpeciesBtnTap
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
      case 'totalProduction':
        dataSetNames.push('totalProduction');
        value = e.detail.value;
      break;
      case 'gradeProduction':
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
    console.log(data);
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
    if (name == 'node') {
      value = this.data.pickerRange.nodes[pickerValueIdx];
    } else if (name == 'finishedDatePlan') {
      value = e.detail.value;
      console.log(value);
    } else if (name == 'farm') {
      value = this.data.pickerRange.farms[pickerValueIdx];
    }else if(name=='amountUnit'){
      value = this.data.pickerRange.weightUnits[pickerValueIdx];
      this.setData({
        ['customedFormSectionItem.productionUnit']:value
      });
    }else if(name=='gradeName'){
      value = this.data.pickerRange.grades[pickerValueIdx];
    }
    switch (key) {
      case 'node':
      case 'farm':
      case 'finishedDatePlan':
        dataSetNames.push('dataset');
        dataSetNames.push('formSections');
      break;
      case 'gradeName':
        dataSetNames.push('otherFormSections');
      break;
      case 'totalProduction':
        dataSetNames.push('totalProduction');
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
  /**函数：onAddItemFormSubmit
   * 功能：响应表单提交事件，
   * 
  * **/
  onAddItemFormSubmit: function (e) {
    var keys, page;
    page = this;
    keys = { 'farm':'farm','node':'node','finishedDatePlan':'finishedDatePlan'};
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      if(this.data.dataset.node.value=='摘果'){
        if (this.data.totalProduction.value == '' || this.data.totalProduction.pickerText == '请选择产量单位') {
          wx.showToast({
            title: '带*号为必填项',
            icon: 'none'
          });
          return;
        }
      }

      if(this.data.dataset.node.value=='摘果'){
        this.otherFormSectionsValidation();
      }else{
        this.submitAlterForm();
      }
      
    }
  },
  /**
* 函数名：otherFormSectionsValidation
* **/
  otherFormSectionsValidation: function () {
    var predictionsNotFinished, otherFormSections, predictions, page;
    page = this;
    predictions = this.data.dataset.predictions;
    otherFormSections = this.data.otherFormSections;
    predictionsNotFinished = [];

    otherFormSections.forEach(function (item, index) {
      item.predictionUnit = page.data.totalProduction.amountUnit;
      if (item.gradeName == '请选择果实等级' || item.gradeProduction == '' || item.predictionUnit == '') {
        predictionsNotFinished.push(index);
        //page.data.dataset.predictions[index].predictionUnit = page.data.customedFormSectionItem.productionUnit;
      }
    });

    if (predictions) {
      if (predictionsNotFinished.length > 0) {
        predictionsNotFinished.forEach(function (item, index) {
          predictions.splice(item, 1);
        });
      }
    } else {
      this.data.dataset.predictions = [];
    }

    if (this.data.dataset.predictions.length == 0) {
      wx.showToast({
        title: '等级产量预测不能为空',
        icon: 'none'
      });
      return;
    }


    if (predictionsNotFinished.length > 0) {
      wx.showModal({
        title: '存在不完整预测信息',
        content: '不完整的预测信息将不被保存,确定提交吗？',
        success(res) {
          if (res.confirm) {
            page.submitAlterForm();//提交表单信息
          }
        }
      })
    } else {
      var totalProduction, totalPrediction;
      totalProduction = Number(this.data.totalProduction.value);
      totalPrediction = 0;
      predictions.forEach(function(item,index){
        totalPrediction = totalPrediction+Number(item.gradeProduction);
      });
      if(totalPrediction>totalProduction){
        wx.showToast({
          title: '各等级预测产量之和不能大于预测的总产量',
          icon:'none'
        });
        return;
      }
      page.submitAlterForm();
    }

  },
  /**
  * 函数名：submitAlterForm
  * **/
  submitAlterForm: function (e) {
    console.log(this.data.totalProduction);
    var dataset, plan, data, page;
    page = this;
    data = {};
    plan = {};
    dataset = this.data.dataset;

    plan.farm = dataset.farm.value;
    plan.node = dataset.node.value;
    plan.finishedDatePlan = dataset.finishedDatePlan.value;
    plan.finishedDate = '';
    plan.desc = '',
    plan.finished = false;
    plan.approval = true;

    if(plan.node == '摘果'){
      plan.totalProduction = page.data.totalProduction.value;
      plan.amountUnit = page.data.totalProduction.amountUnit;
      plan.predictions = dataset.predictions;
    }

    

    data.collectionName = 'produceplans';
    data.data = plan;

    util.operation.database.add(data, page, 'navigateBack');
  }
})