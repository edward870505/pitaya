// pages/warehouse/add/add.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    action:'addWarehouse',
    dataset: {//通用表单区域初始化数据
      'parent': {
        imgSrc: '/images/form_label_imgs/关联.png',
        text: '上级仓库：',
        inputType: 'commonpicker',
        inputPlaceHolder: '请关联上级仓库',
        initPickerText: '',
        unitInput: false,
        unitInputType: '',
        value: '',
        canBeEmpty: false,
        name: 'parent',
        rangeKey:'warehouse',
        range_key:'name'
      },
      'name': {
        imgSrc: '/images/form_label_imgs/name.png',
        text: '名称*',
        inputType: 'input',
        inputPlaceHolder: '请输入仓库名称',
        unitInput: false,
        unitInputType: '',
        value: '',
        initPickerText: '',
        canBeEmpty: false,
        name: 'name'
      },
      'desc': {
        imgSrc: '/images/form_label_imgs/content.png',
        text: '描述',
        inputType: 'textarea',
        inputPlaceHolder: '请输入仓库描述',
        unitInput: false,
        unitInputType: '',
        initPickerText: '',
        value: '',
        canBeEmpty: true,
        name: 'desc'
      }
    },
    formSections: [//通用表单区域配置数据
    ],
    pickerRange:{
      warehouse:[]
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
    var page;

    page = this;

    appInstance.initDataBase('warehouses','warehouse',page);

    appInstance.dbData.warehouses.forEach(function (item, index) {
      if(item.type == '一级仓'){
        if(item.approval&&item.status){
          page.data.pickerRange.warehouse.push(item);
        }
      }else if(item.type == '二级仓'){
        if(item.status){
          page.data.pickerRange.warehouse.push(item);
        }
      }

    });


    this.setData({
      pickerRange: this.data.pickerRange
    });
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
  * 函数名：onPickerValueChanged
  * **/
  onPickerValueChanged: function (e) {
    console.log(e);
    var index, key, name, value, dataSetNames, data, pickerValueIdx;
    data = {};
    dataSetNames = [];
    key = e.currentTarget.dataset.key;
    name = e.currentTarget.dataset.name;
    index = e.currentTarget.dataset.index;
    pickerValueIdx = e.detail.value;
    if (name == 'parent') {
      if(this.data.pickerRange.warehouse.length>0){
        value = this.data.pickerRange.warehouse[pickerValueIdx];
      }else{
        value = '';
      }
      
      console.log(value)
    }
    switch (key) {
      case 'parent':
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
  /**函数：onAddItemFormSubmit
  * 功能：响应表单提交事件，
  * 
  * **/
  onAddItemFormSubmit: function (e) {
    var keys, page;
    page = this;
    keys = {'name': 'name' };
    if (!util.operation.form.addFormEmptyValueValidation(keys, page)) {
      page.submitAddForm();
    }
  },
  /**
  * 函数名：submitAddForm
  * **/
  submitAddForm: function () {
    var dataset, type, name, desc, warehouse, data, page;

    page = this;
    data = {};
    dataset = this.data.dataset;

    warehouse = {};


    warehouse.parent = {
      _id: dataset.parent.value._id,
      name:dataset.parent.value.name
    };
    warehouse.name = dataset.name.value;
    warehouse.desc = dataset.desc.value;
    warehouse.children = [];

    warehouse.status = false;
    warehouse.ref = false;
    warehouse.approval = true;
    warehouse.inANDoutRecords = [];
    warehouse.stock = {};

    
    data.collectionName = 'warehouses';
    data.data = warehouse;
    

    if(dataset.parent.value==""){
      warehouse.type = "一级仓";
      warehouse.show = true;
    }else{
      switch(dataset.parent.value.type){
        case '一级仓':
          warehouse.type = "二级仓";
          warehouse.show = true;
        break;
        case '二级仓':
          warehouse.type = '三级仓';
          warehouse.show = false;
        break;
      }
    }

    console.log(warehouse);


    wx.cloud.callFunction({
      name:'add',
      data:{
        collectionName:'warehouses',
        data:warehouse
      },
      success(res){

        var childrenid,parent,children,data;
        data = {};
        childrenid = res.result._id;
        warehouse._id = childrenid;
        parent = dataset.parent.value;
        console.log(parent.children);

        if(parent!=""){
          parent.children.push({
            _id:warehouse._id,
            name:warehouse.name
          });

          wx.cloud.callFunction({
            name:'update',
            data:{
              collectionName:'warehouses',
              docid:parent._id,
              data:{
                children:parent.children,
                ref:true
              }
            },
            success(res){
              wx.showToast({
                title: '添加成功',
                icon:'none'
              })
              wx.navigateBack({
                
              });
            }
          });
        }else{
          wx.showToast({
            title: '添加成功',
            icon: 'none'
          })
          wx.navigateBack({

          });
        }
   
      }
    });


    //util.operation.database.add(data, page, 'navigateBack');

  }
})