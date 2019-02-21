// pages/farmdiary/farmdiary.js
var util = require('../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    dairyOperations:[
      '查看农事记录',
      '修改农事记录',
      '删除农事记录'
    ],
    itemName: 'farmdairy',//依据此值调用地块模板
    operations: [
      {
        imgSrc: '/images/add_btn.png',
        text: '新增农事',
        action: 'add'
      }
    ],
    dataset: [],//项目记录数组
    pickerRange:{
      farms:[],
      fields:['全部'],
      teams:[]
    },
    diary:{
      farm:'',
      dateBegin:'开始日期',
      dateEnd:'结束日期',
      dateBeginMs:0,
      dateEndMs:0,
      field:''
    },
    popupDialog:{
      title:'',
      cancelText:'关闭',
      confirmText:'确定'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.initPickerRange(['farms']);
    this.initDiary(['farm']);
    this.initPickerRange(['fields']);
    this.initDiary(['field']);
    this.initDataset();
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
  onOperationItemTap: function (e) {
    var action, url;
    action = e.currentTarget.dataset.action;
    url = '../farmdiary/' + action + '/' + action;
    wx.navigateTo({
      url: url,
    })
    console.log(e);
  },
  /**
   * 
   * **/
  onPickerValueChange:function(e){
    var value,url,index,dataset;
    index = e.currentTarget.dataset.index;
    value = this.data.dairyOperations[e.detail.value];
    dataset =JSON.stringify(this.data.farming[index]);
    switch(value){
      case '修改农事记录':
        url = '/pages/farmdiary/alter/alter?dataset='+dataset;
        wx.navigateTo({
          url: url,
        })
      break;
    }
    console.log(e);
  },
  /**
   * 
   * **/
   initPickerRange:function(rangeKeys){
    var page,itemValue;
    page = this;
    rangeKeys.forEach(function(item,index){
      console.log(item);
      if(item=='farms'){
        page.data.pickerRange.farms = [];
      }else if(item=='fields'){
        page.data.pickerRange.fields=['全部'];
      }
      appInstance.dbData[item].forEach(function(record,idx){
        if(record.status){
          if(item == 'farms'){
            itemValue = record.placeOfOrigin + ' ' + record.name;
            page.data.pickerRange[item].push(itemValue);
          }else if(item == 'fields'){
            itemValue = record.serial;
            if(record.farm == page.data.diary.farm){
              page.data.pickerRange[item].push(itemValue);
            }      
          }

        }
      });
    });
    this.setData({
      pickerRange:this.data.pickerRange
    });
   },
  /**
   * 
   * **/
   initDiary:function(keys){
     var page,keyIndex,nowDate;
     page = this;
     keys.forEach(function(item){
       keyIndex = 'diary.'+item;
       console.log(keyIndex)
       if(item=='date'){
         nowDate = util.operation.date.nowDateFormation().date;
         page.setData({
           [keyIndex]: nowDate
         });
       }else{
         page.setData({
           [keyIndex]:page.data.pickerRange[item+'s'][0]
         });
       }

     });
   },
  /**
   * 
   * **/
   initDataset:function(){
     var farm,field,page;
     farm = this.data.diary.farm;
     field = this.data.diary.field;
     page = this;

     wx.cloud.callFunction({
       name:'query',
       data:{
         collectionName:'farmingdiary',
         keys:{
           farm:farm
         }
       },
       success(res){
         page.data.dataset = [];
         res.result.data.forEach(function(item,index){
          item.show = true;
          page.data.dataset.push(item);
         });

         page.setData({
           dataset:page.data.dataset
         });
       },
       fail(res){
         console.log(res)
       }
     });
   },
  /**
* 
**/
  onDiaryTablePickerValueChanged: function (e) {

    var name, value, index, keyIndex, originFarmValue, dateBeginMs, dateEndMs, filterKeys;
    originFarmValue = this.data.diary.farm;
    name = e.currentTarget.dataset.name;
    keyIndex = 'diary.' + name;
    filterKeys = [];

    if (name == 'farm') {
      index = e.detail.value;
      value = this.data.pickerRange[name + 's'][index];
      this.data.diary.farm = value;
      this.initPickerRange(['fields']);
      this.setData({
        [keyIndex]: value
      });
    } else if (name == 'field') {
      index = e.detail.value;
      value = this.data.pickerRange[name + 's'][index];
      this.setData({
        [keyIndex]: value
      });
    } else {
      value = e.detail.value;
    }

    if (name == 'farm') {

      this.setData({
        ['diary.dateBegin']: '开始日期',
        ['diary.dateEnd']: '结束日期',
        ['diary.dateBeginMs']: 0,
        ['diary.dateEndMs']: 0,
        ['diary.field']: '全部'
      });
      this.initPickerRange['fields'];
      this.initDataset();

    }

    if (name == 'dateBegin') {
      dateBeginMs = new Date(value).getTime();
      if (this.data.diary.dateEnd != '结束日期') {
        if (dateBeginMs > this.data.diary.dateEndMs) {
          wx.showToast({
            title: '开始日期不能晚于结束日期',
            icon: 'none'
          });
          return;
        }
      }
      var dateKeyIndex;
      dateKeyIndex = 'diary.' + name + 'Ms';
      this.setData({
        [dateKeyIndex]: new Date(value).getTime()
      });
      this.setData({
        [keyIndex]: value
      });
    }

    if (name == 'dateEnd') {
      dateEndMs = new Date(value).getTime();
      if (this.data.diary.dateBegin != '开始日期') {
        if (dateEndMs < this.data.diary.dateBeginMs) {
          wx.showToast({
            title: '结束日期不能早于开始日期',
            icon: 'none'
          });
          return;
        }
      }
      var dateKeyIndex;
      dateKeyIndex = 'diary.' + name + 'Ms';
      this.setData({
        [dateKeyIndex]: new Date(value).getTime(),
      });
      this.setData({
        [keyIndex]: value
      });
    }


    for (var k in this.data.diary) {
      if (this.data.diary.hasOwnProperty(k)) {
        if (k != 'farm' && k != 'dateBeginMs' && k != 'dateEndMs') {
          if (k == 'field') {
            filterKeys.push(k);
          }

          if (k == 'dateBegin' && this.data.diary[k] != '开始日期') {
            filterKeys.push(k);
          }

          if (k == 'dateEnd' && this.data.diary[k] != '结束日期') {
            filterKeys.push(k);
          }

        }
      }
    }

    this.datasetFilter(filterKeys);

  },
   /**
    * 
    **/
   datasetFilter:function(keys){
     console.log(keys);
     var dataset,page;
     page = this;
     dataset = this.data.dataset;

     dataset.forEach(function(item,index){
       if(page.fieldFilter(index)&&page.dateFilter(index)){
         item.show = true;
       }else{
         item.show = false;
       }
     });

     this.setData({
       dataset:this.data.dataset
     });
   },
   /**
    * 
    **/
   fieldFilter:function(index){

     var field,dataset;
     dataset = this.data.dataset;
     field = this.data.diary.field;
     if(field == '全部'){
       return true;
     }else{
       if (dataset[index].field.indexOf(field)==-1){
         return false;
       }else{
         return true;
       }
     }
   },
   /**
    * 
    **/
   dateFilter:function(index){
     var dataset,dateBeginMs,dateEndMs,finishedDateMs,planDateMs,dateBegin,dateEnd,dataset,isFinished,planDate,finishedDate;
     dataset = this.data.dataset;
     dateBegin = this.data.diary.dateBegin;
     dateEnd = this.data.diary.dateEnd;
     dateBeginMs = this.data.diary.dateBeginMs;
     dateEndMs = this.data.diary.dateEndMs;


     isFinished = dataset[index].finished;
     planDate = dataset[index].planDate;
     finishedDate = dataset[index].finishedDate;
     planDateMs = new Date(planDate).getTime();

     if(isFinished){
       finishedDateMs = new Date(finishedDate).getTime();
       if(dateBeginMs==0 && dateEndMs==0){
         return true;
       }else if(dateBeginMs == 0 && dateEndMs != 0){
         if(finishedDateMs<=dateEndMs){
           return true;
         }else{
           return false;
         }
       }else if(dateBeginMs!=0 && dateEndMs==0){
         if (finishedDateMs >= dateBeginMs) {
           return true;
         } else {
           return false;
         }
       }else{
         if(finishedDateMs>=dateBeginMs&&finishedDateMs<=dateEndMs){
           return true;
         }else{
           return false;
         }
       }
     }else{
       if (dateBeginMs == 0 && dateEndMs == 0) {
         return true;
       } else if (dateBeginMs == 0 && dateEndMs != 0) {
         if (planDateMs <= dateEndMs) {
           return true;
         } else {
           return false;
         }
       } else if (dateBeginMs != 0 && dateEndMs == 0) {
         if (planDateMs >= dateBeginMs) {
           return true;
         } else {
           return false;
         }
       } else {
         if (planDateMs >= dateBeginMs && planDateMs <= dateEndMs) {
           return true;
         } else {
           return false;
         }
       }
     }
     

     return true;
   },
   /**
    * 
    **/
    onFarmingPickerValueChanged:function(e){
        var farmingIdx,action,isFinished;
        farmingIdx = e.currentTarget.dataset.index;
        action = e.detail.value;
        console.log(action);
        isFinished = this.data.dataset[farmingIdx].finished;
        switch(action){
          case '0':
            this.showFarmingInfo(farmingIdx);
          break;
          case '1':
            if(isFinished){
              wx.showToast({
                title: '已完成，不能修改',
                icon:'none'
              });
              return;
            }
            this.alterFarming(farmingIdx);
          break;
          case '2':
            if (isFinished) {
              wx.showToast({
                title: '已完成，不能删除',
                icon: 'none'
              });
              return;
            }
            this.deleteFarming(farmingIdx);
          break;
        }
    },
      /**
        * 
        **/
    showFarmingInfo:function(index){
        var farming,title,content;
        farming = this.data.dataset[index];
        title = '['+farming.farming + ']农事活动记录';
        this.setData({
          ['popupDialog.title']:title
        });
        this.dialog.setData({
          key:'farmingInfo',
          itemData:farming
        });
        this.dialog.showDialog();
    },
      /**
       * 
       * **/
    alterFarming:function(index){
      var farming;
      farming = JSON.stringify(this.data.dataset[index]);
      wx.navigateTo({
        url: '../farmdiary/alter/alter?dataset='+farming,
      });
      console.log(farming);

    },
    /**
    * 
    * **/
    deleteFarming:function(index){
      var farming,docid,data,page;
      farming = this.data.dataset[index];
      docid = farming._id;
      page = this;
      data = {};
      data.collectionName = 'farmingdiary';
      data.docid = docid;
      wx.cloud.callFunction({
        name:'delete',
        data:data,
        success(res){
          page.onShow();
          wx.showToast({
            title: '删除成功',
            icon:'none'
          });
        }
      });
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
})