// pages/field/alter/alter.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      itemName:'field',
      title:{
        imgSrc: '/images/field.png',//表单标题图片
        text:''//表单标题文本
      },
      otherFormSectionItem: {//定制表单项目通用配置
        imgSrc: '/images/火龙果.png',//品种信息区域图片,
        text: '品种',//品种信息区域标签
      },
      formSections: [],//通用表单区域
      otherFormSections: [],//定制表单区域
      pickerRange: {
        'species':[],
        'areaUnits':[]
      },//筛选框单位range
      dataset: {},//记录数据
      user: {},//用户数据
      shownSections:{
        'area': {
          label: '*面积',
          imgsrc: '/images/form_label_imgs/area.png',
          inputType: 'number',
          inputPlaceHolder:'请输入面积',
          initPickerText:'',
          areaUnitInput: true,
          canBeEmpty: false,
          name:'area'
        },
        'serial': {
          label: '*编号',
          imgsrc: '/images/数字.png',
          inputType: 'input',
          inputPlaceHolder: '请输入编号',
          areaUnitInput:false,
          canBeEmpty: false,
          name:'serial'
        }
      },
      sectionsOrder:['area','serial']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var dataset,page;
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
    text = this.data.dataset.farm + this.data.dataset.serial + '地块';
    this.setData({
      ['title.text']: text
    }); 

    //显示表单区域
    util.operation.page.renderBasicinfoAlterPage(dataset,page);
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
  onAddSpeciesBtnTap: function (e) {
    var species = this.data.otherFormSections;
    species.push(
      {
        type: "请选择品种",
        totalAmount: "",
        growingArea: "",
        growingAreaUnit: "请选择面积单位",
        unit: '棵'
      }
    );
    this.setData({
      otherFormSections: species
    });
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
   onAlterFormSubmit:function(e){
    //对formSections的input值做非空验证
    var keys,page;
    page = this;
    keys = ['area','serial','fieldAreaUnit'];
    
    if (!util.operation.form.alterFormEmptyValueValidation(keys, page)){
      this.otherFormSectionsValidation();
    }

   },
  /**
   * 函数名: onInputBlur
   * 
   * **/
   onInputBlur:function(e){
     var index,key,name,value,dataSetNames,data;
     data = {};
     name = e.currentTarget.dataset.name;
     key = e.currentTarget.dataset.key;
     index = e.currentTarget.dataset.index;
     dataSetNames = [];
     switch(key){
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
       case 'type':
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
   onPickerValueChanged:function(e){
    var index, key, name,value, dataSetNames, data,pickerValueIdx;
    data = {};
    dataSetNames = [];
    key = e.currentTarget.dataset.key;
    name = e.currentTarget.dataset.name;
    index = e.currentTarget.dataset.index;
    pickerValueIdx = e.detail.value;
    if(name=='fieldAreaUnit'||name=='growingAreaUnit'){
      value = this.data.pickerRange.areaUnits[pickerValueIdx];
    }else if(name=='type'){
      value = this.data.pickerRange.species[pickerValueIdx];
    }

    switch(key){
      case 'area':
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
    util.operation.form.onAlterPickerValueChanged(data, this);
   },
  /**
   * 函数名：otherFormSectionsValidation
   * **/
   otherFormSectionsValidation:function(){
     var speciesNotFinished,otherFormSections,varieties,page;
     page = this;
     varieties = this.data.dataset.varieties;
     otherFormSections = this.data.otherFormSections;
     speciesNotFinished = [];

     otherFormSections.forEach(function(item,index){
       if(item.type=='请选择品种'||item.growingArea =='请选择面积单位'||item.totalAmount==''||item.growingArea==''){
         speciesNotFinished.push(index);
       }
     });

     if (speciesNotFinished.length > 0) {
       speciesNotFinished.forEach(function (item, index) {
         varieties.splice(item, 1);
       });
     }

     if(speciesNotFinished.length>0){
       wx.showModal({
         title: '存在不完整种植品种信息',
         content: '不完整的种植品种信息将不被保存,确定提交吗？',
         success(res) {
           if (res.confirm) {
             page.submitAlterForm();//提交表单信息
           }
         }
       })
     }else{
       page.submitAlterForm();
     }

   },
  /**
   * 函数名：submitAlterForm
   * **/
   submitAlterForm:function(){
     var dataset,area,areaUnit,serial,varieties,field,data;
     data = {};
     field = {};
     dataset = this.data.dataset;
     area = dataset.area;
     areaUnit = dataset.fieldAreaUnit;
     serial = dataset.serial;
     varieties = dataset.varieties;
     
     field.area = area;
     field.serial = serial;
     field.fieldAreaUnit = areaUnit;
     field.varieties = varieties;

     data.collectionName = 'fields';
     data.docid = dataset._id;
     data.data = field;

     util.operation.database.update(data, this,'navigateBack');
 
   }
})