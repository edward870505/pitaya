// pages/warehouse/in/in.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warehouse: {},
    rootWarehouse:{},
    action: 'materialIn',
    formSections: [
      {
        imgSrc: '/images/form_label_imgs/日历-1.png',
        text: '出仓时间*',
        inputType: 'datepicker',
        inputPlaceHolder: '请选择出仓时间',
        unitInput: false,
        unitInputType: '',
        name:'time',
        
      },
      {
        imgSrc: '/images/进出仓.png',
        text: '出仓方式*',
        inputType: 'commonpicker',
        inputPlaceHolder: '请选择出仓方式',
        unitInput: false,
        unitInputType: 'warehousepicker',
        name:'waysin',
        rangeKey: 'waysin'
      },
      {
        imgSrc: '/images/form_label_imgs/物资.png',
        text: '物资*',
        inputType: 'commonpicker',
        inputPlaceHolder: '请选择出仓物资',
        unitInput: false,
        unitInputType: '',
        name:'sub_materials',
        key:'sub_materials',
        rangeKey:'sub_materials',
        range_key:'pickername'
      },
      {
        imgSrc: '/images/转换.png',
        text: '转换*',
        inputType: 'commonpicker',
        inputPlaceHolder: '请选择单位转换关系',
        unitInput: false,
        unitInputType: '',
        name: 'transfers',
        rangeKey: 'transfers',
        range_key: 'pickername'
      },
      {
        imgSrc: '/images/数字.png',
        text: '数量*',
        inputType: 'input',
        inputPlaceHolder: '请输入数量',
        initPickerText:'请选择数量单位',
        unitInput: true,
        unitInputType: '',
        name:'amount',
        unit:'',
        rangeKey:'units',
        range_key:'cn',
      },
      {
        imgSrc: '/images/转换.png',
        text: '单价*',
        inputType: 'number',
        inputPlaceHolder: '请输入越南盾单价',
        initPickerText:'请选择汇率',
        unitInput: true,
        unitInputType: 'exchange',
        name:'priceVND',
        key:'priceVND',
        rangeKey:'exchangerates',
        range_key:'pickername'
      },
      {
        imgSrc: '/images/总金额.png',
        text: '总金额',
        inputType: 'totalVNDinput',
        inputPlaceHolder: '',
        unitInput: true,
        unitInputType: 'totalRMBinput'
      }
    ],
    pickerRange: {

    },
    dataset:{
      time:'',
      wayin:'',
      sub_material:'',
      exchangerate: '',
      transfer: '',
      priceVND:'',
      priceRMB:'',
      totalRMB:'',
      totalVND:'',
      amount:'',
      subUnit:'',
      mainUnit:'',
      transferAmount:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var warehouseId,page,warehouse;

    warehouseId = options.data;

    page = this;

    wx.cloud.callFunction({
      name:'query',
      data:{
        collectionName:'warehouses',
        keys:{
          _id:warehouseId
        }
      },
      success(res){
        warehouse = res.result.data[0];
        page.setData({
          warehouse: warehouse
        });
        page.initPickerRange(
          [
            'waysin',
            'sub_materials',
            'units',
            'exchangerates'
          ]
        );
      }
    });

    console.log(warehouse);



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
   * 
   * **/
   initPickerRange:function(keys){
     var page;
     page = this;
     keys.forEach(function(item,index){
       switch(item){
         case 'waysin':
          page.data.pickerRange[item] = ['使用出仓', '盘亏出仓'];
         break;
         case 'sub_materials':
         case 'units':
         case 'transfers':
         case 'exchangerates':
          appInstance.updateDatabase(item,'reinit',page,'updatePickerRange');
         break;
       }
     });
     page.setData({
       pickerRange: page.data.pickerRange
     });
   },
   /**
    * 
    **/
    updatePickerRange:function(key){
      var page,keyIndex;
      page = this;
      keyIndex = 'pickerRange.' + key;
      page.data.pickerRange[key] = [];
      switch(key){
        case 'sub_materials':
          if(this.data.warehouse.type == '一级仓'){

            appInstance.dbData[key].forEach(function(item,index){
              if(item.approval){
                item.pickername = item.name +' / '+item.specification
                page.data.pickerRange[key].push(item);
              }
            });
  
          }else{
            console.log('非一级仓');

            wx.cloud.callFunction({
              name:'query',
              data:{
                collectionName:'warehouses',
                keys:{
                  _id: page.data.warehouse.parent._id
                }
              },
              success(res){
                var stock;
                page.setData({
                  rootWarehouse:res.result.data[0]
                });
                stock = page.data.rootWarehouse.stock;
                appInstance.dbData[key].forEach(function(item,index){
                  if(stock.hasOwnProperty(item._id)){
                    if(stock[item._id].left>0){
                      item.pickername = item.name + ' / ' + item.specification
                      page.data.pickerRange[key].push(item);
                    }
                  }
                });

              }
            });
          }
        break;
        case 'units':
          appInstance.dbData[key].forEach(function(item,index){
            if(item.approval){
              page.data.pickerRange[key].push(item);
            }
          });
        break;
        case 'transfers':
          appInstance.dbData[key].forEach(function (item, index) {
            console.log(item,page.data.dataset);
            if (item.approval) {
              if((item.origin == page.data.dataset.sub_material.mainUnit)&&(item.target == [page.data.dataset.sub_material.subUnit]))             {
                item.pickername = '1' + item.origin + '=' + item.amount + item.target;
                page.data.pickerRange[key].push(item);
              }
            }
          });
        break;
        case 'exchangerates':
          appInstance.dbData[key].forEach(function(item,index){
            if(item.origin == '越南盾'&&item.target=='人民币'){
              item.pickername = '1' + item.origin + '=' + item.rate + item.target;
              page.data.pickerRange[key].push(item);
            }
          });
        break;
      }
      page.setData({
        [keyIndex]: page.data.pickerRange[key]
      });
    },
  /**
   * 
   * **/
   onPickerValueChanged:function(e){
     var name,key,index,value,formSectionIndex,datasetIndex,priceRMB,totalRMB,totalVND,keyIndex;
     name = e.currentTarget.dataset.name;
     key = e.currentTarget.dataset.key;
     index = e.currentTarget.dataset.index;
     switch(key){
       case 'time':
        value = e.detail.value;
        formSectionIndex = 'formSections['+index+'].inputPlaceHolder';
        this.setData({
          [formSectionIndex]:value,
          ['dataset.time']:value
        });
       break;
       case 'waysin':
        value = this.data.pickerRange[key][e.detail.value];
        console.log(value);

         if (value == '使用出仓' && this.data.warehouse.type == '一级仓') {
           wx.showToast({
             title: '一级仓无法使用出仓',
             icon:'none'
           });
           return;
         }

        formSectionIndex = 'formSections[' + index + '].inputPlaceHolder';
         this.setData({
           [formSectionIndex]: value,
           ['dataset.wayin']:value
        });

        
       break;
       case 'sub_materials':
         value = this.data.pickerRange[key][e.detail.value].pickername;
         formSectionIndex = 'formSections[' + index + '].inputPlaceHolder';
         this.setData({
           [formSectionIndex]: value,
           ['dataset.sub_material']: this.data.pickerRange[key][e.detail.value]
         });
         if(value!=''){
           this.initPickerRange(['transfers']);
         }
       break;
       case 'transfers':

        if(this.data.formSections[2].inputPlaceHolder=='请选择进仓物资'){
          wx.showToast({
            title: '请选择进仓物资',
            icon:'none'
          });
          return;
        }

        value = this.data.pickerRange.transfers[e.detail.value].pickername;

        formSectionIndex = 'formSections[' + index + '].inputPlaceHolder';
        this.setData({
           [formSectionIndex]: value,
           ['dataset.transfer']: this.data.pickerRange[key][e.detail.value]
        });

       break;
       case 'priceVND':
         value = this.data.pickerRange['exchangerates'][e.detail.value].pickername;
         formSectionIndex = 'formSections[' + index + '].initPickerText';
         this.setData({
           [formSectionIndex]: value,
           ['dataset.exchangerate']: this.data.pickerRange['exchangerates'][e.detail.value]
         });
         if (this.data.dataset.priceVND != '') {
           priceRMB = this.data.dataset.priceVND * this.data.dataset.exchangerate.rate;
           priceRMB = Number(priceRMB).toFixed(2);
           this.data.dataset.priceRMB = priceRMB;
           
           if (!isNaN(priceRMB)) {
             this.setData({
               ['dataset.priceRMB']: priceRMB
             });
           }
           if (!isNaN(Number(this.data.dataset.mainAmount)) && !isNaN(this.data.dataset.priceRMB)) {
             totalRMB = this.data.dataset.priceRMB * this.data.dataset.mainAmount;
             this.setData({
               ['dataset.totalRMB']: totalRMB.toFixed(2)
             });
           }
           if (!isNaN(this.data.dataset.mainAmount) && !isNaN(this.data.dataset.priceVND)) {
             totalVND = this.data.dataset.priceVND * this.data.dataset.mainAmount;
             this.setData({
               ['dataset.totalVND']: totalVND
             });
           }
           console.log(totalVND,totalRMB);
         }
       break;

     }

   },
  /**
   * 
   * **/
    onInputBlur:function(e){

      var name, key, index, value, formSectionIndex, datasetIndex,transfer,sub_material,subAmount,mainAmount,priceVND,priceRMB,totalRMB,totalVND,transferAmount;
      name = e.currentTarget.dataset.name;
      key = e.currentTarget.dataset.key;
      index = e.currentTarget.dataset.index;
      value = e.detail.value;
      if(name=='amount'){
        if (this.data.dataset.sub_material == '' || this.data.dataset.transfer == '') {
          wx.showToast({
            title: '请先选择物资和转换关系',
            icon: 'none'
          });

          return;
        }
        transfer = this.data.dataset.transfer;
        sub_material = this.data.dataset.sub_material;
        mainAmount = value;
        this.data.dataset.mainAmount = mainAmount;
        this.data.dataset.mainUnit = sub_material.mainUnit;
        this.data.dataset.subUnit = sub_material.subUnit;
        this.data.dataset.transferAmount = transfer.amount;
        subAmount = mainAmount * this.data.dataset.transfer.amount;
        this.setData({
          ['dataset.subAmount']: subAmount
        });
      }

      if(name=='priceVND'){
        priceVND = e.detail.value;
        this.data.dataset.priceVND = priceVND;
        if(this.data.dataset.priceVND!=''){
          priceRMB = priceVND*this.data.dataset.exchangerate.rate;
          priceRMB = Number(priceRMB).toFixed(2);
          this.data.dataset.priceRMB = priceRMB;
          console.log(priceRMB);
          if(!isNaN(priceRMB)){
            this.setData({
              ['dataset.priceRMB']:priceRMB
            });
          }
        }
      }

     if (!isNaN(Number(this.data.dataset.mainAmount)) && !isNaN(this.data.dataset.priceRMB)) {
       totalRMB = this.data.dataset.priceRMB * this.data.dataset.mainAmount;
       this.setData({
         ['dataset.totalRMB']: totalRMB.toFixed(2)
       });
       
     }
     if (!isNaN(this.data.dataset.mainAmount) && !isNaN(this.data.dataset.priceVND)) {
       totalVND = this.data.dataset.priceVND * this.data.dataset.mainAmount;
       this.setData({
         ['dataset.totalVND']: totalVND
       });
     }
     console.log(totalVND, totalRMB);
     console.log(this.data.dataset);

     
    },
   /**
    * 
    **/
    onAddItemFormSubmit:function(e){
      var warehouse,
          rootWarehouse,
          inRecord,
          inANDoutRecords,
          stock,
          dataset,
          time,
          wayin,
          mainUnit,
          subUnit,
          priceRMB,
          priceVND,
          totalRMB,
          totalVND,
          amount,
          sub_material,
          transfer,
          exchangerate,
          transferAmount,
          mainAmount,
          subAmount;
      inRecord = {};
      warehouse = this.data.warehouse;
      rootWarehouse = this.data.rootWarehouse;
      
      time = this.data.dataset.time;
      wayin = this.data.dataset.wayin;
      sub_material = this.data.dataset.sub_material;
      transfer = this.data.dataset.transfer;
      exchangerate = this.data.dataset.exchangerate;
      mainUnit = this.data.dataset.mainUnit;
      subUnit = this.data.dataset.subUnit;
      priceRMB = this.data.dataset.priceRMB;
      priceVND = this.data.dataset.priceVND;
      totalRMB = this.data.dataset.totalRMB;
      totalVND = this.data.dataset.totalVND;
      transferAmount = this.data.dataset.transferAmount;
      mainAmount = this.data.dataset.mainAmount;
      subAmount = this.data.dataset.subAmount;

  

      if(!(time&&wayin&&sub_material&&transfer&&exchangerate&&mainUnit&&subUnit&&priceRMB&&priceVND&&totalRMB&&totalVND&&transferAmount)){
        wx.showToast({
          title: '带*号为必填项',
          icon:'none'
        });
        return;
      }

      inRecord.time = time;
      inRecord.wayin = wayin;
      inRecord.sub_material = sub_material;
      inRecord.transfer = transfer;
      inRecord.exchangerate = exchangerate;
      inRecord.mainUnit = mainUnit;
      inRecord.subUnit = subUnit;
      inRecord.priceRMB = priceRMB;
      inRecord.priceVND = priceVND;
      inRecord.totalRMB = totalRMB;
      inRecord.totalVND = totalVND;
      inRecord.mainAmount = mainAmount;
      inRecord.subAmount = subAmount;
      inRecord.transferAmount = transferAmount;
      inRecord.type = 'out';
      
      if(wayin=='使用出仓'){
        if(warehouse.type != '一级仓'){
          console.log(rootWarehouse);
        }
      }else{
        if (wayin == '盘亏出仓') {
          inRecord.priceRMB = 0;
          inRecord.priceVND = 0;
          inRecord.totalRMB = 0;
          inRecord.totalVND = 0;
        }
        wx.cloud.callFunction({
          name:'query',
          data:{
            collectionName:'warehouses',
            keys:{
              _id:warehouse._id
            }
          },
          success(res){
            stock = res.result.data[0].stock;
            inANDoutRecords = res.result.data[0].inANDoutRecords;
            console.log(stock);
            if(stock.hasOwnProperty(warehouse._id)){
              console.log('已存在,相同物资');
              inANDoutRecords.push(inRecord);
              if (Number(stock[warehouse._id].left) >= Number(inRecord.mainAmount)){
                stock[warehouse._id].left = Number(stock[warehouse._id].left) - Number(inRecord.mainAmount);
              }else{
                wx.showToast({
                  title: '物资库存不足',
                  icon:'none'
                });
                return;
              }
              
            }
            console.log(stock, inANDoutRecords);
            wx.cloud.callFunction({
              name:'update',
              data:{
                collectionName:'warehouses',
                docid:warehouse._id,
                data:{
                  inANDoutRecords:inANDoutRecords,
                  stock:stock
                },
                success(res){
                  console.log(res)
                }
              }
            });


          }
        });
      }




      console.log(this.data.dataset);
      
    }
   
})