// pages/produceplan/produceplan.js
var util = require('../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName:'produceplan',
    filterImgSrc: '/images/calendar.png',
    datePickerImgSrc: '/images/calendar.png',
    imgSrc: {
      finished:'/images/农事/farmingFinished.png',
      notFinished:'/images/农事/farmingNotFinished.png',
      dragonfruit: '/images/dragon_fruit.png'
    },
    operations: [
      {
        imgSrc: '/images/add_btn.png',
        text: '增加计划',
        action: 'add'
      }
    ],
    pickerOperations:[
      {
        text:'修改计划',
        action:'alter'
      },
      {
        text:'删除计划',
        action:'delete'
      }
    ],
    filterData:{
      text:'',
      imgSrc:'/images/field1.png',
      range:[]
    },
    planSections:[],
    today:'',
    datePicker:{
      beginDate:'',
      beginDateMs:0,
      endDateMs:0,
      endDate:'',
      beginDatePickerText:'开始日期',
      endDatePickerText:'结束日期'
    }
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page;
    page = this;

    appInstance.dbData.farms.forEach(function(item,index){
      if(item.status && item.approval){
        page.data.filterData.range.push(item.placeOfOrigin + ' ' + item.name);
      }
    });

    this.setData({
      ['filterData.text']:this.data.filterData.range[0],
      ['filterData.range']:this.data.filterData.range
    });

    this.setData({
      today:this.dateFormation().date
    });



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
    this.renderPlanSections();
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
  onShareAppMessage: function (e) {

  },
  /**
   * 
   * **/
  onOperationBtnTap: function (e) {
    var action, url;
    action = e.currentTarget.dataset.action;
    url = '../produceplan/' + action + '/' + action;
    wx.navigateTo({
      url: url,
    })
    console.log(e);
  },
  /**
   * 
   * 
   * **/
  renderPlanSections:function(){
    var farm,page;
    page = this;
    farm = this.data.filterData.text;
    wx.cloud.callFunction({
      name:'query',
      data:{
        collectionName:'produceplans',
        keys:{
          farm:farm,
          approval:true
        }
      },
      success(res){

        var planSections,len,diffMs,daysLeft,daysAfterCompleted,sectionsLen;
        planSections = [];
        
        if (res.result.data.length==1){
          len = res.result.data.length;
        } else if (res.result.data.length>1){
          len = res.result.data.length - 1;
        }

        res.result.data.forEach(function(item,index){
          item.finishedDatePlanMs = new Date(item.finishedDatePlan).getTime();
          diffMs = page.datesComparison(item.finishedDatePlan);
          daysLeft = (diffMs/1000/60/60/24);

          if (index == 0) {
            page.data.datePicker.beginDateMs = new Date(item.finishedDatePlan).getTime();
            if(len==1){
              page.data.datePicker.endDateMs = new Date(item.finishedDatePlan).getTime();
            }
          } else if (index == len) {
            page.data.datePicker.endDateMs = new Date(item.finishedDatePlan).getTime();
            
          }
          
          if(item.finished){
            item.status = 'finished';
            daysAfterCompleted = (page.datesComparison(item.finishedDatePlan,item.finishedDate)/1000/60/60/24);
            item.daysAfterCompleted = daysAfterCompleted.toFixed(1);
            if(item.finishedDate!=''){
              item.finishedDateMs = new Date(item.finishedDate).getTime();
            }
          }else{
            item.status = 'notFinished';
          }

          if(daysLeft<0){
            if(daysLeft>-0.6){
              item.outdated = false;
            }else{
              item.outdated = true;
            }
            daysLeft = -daysLeft;
          }else{

            item.outdated = false;
            
          }

          item.daysLeft = daysLeft.toFixed(1);

          planSections.push(item);

        });

 
        sectionsLen = planSections.length;
        console.log(sectionsLen);
        for (var i = sectionsLen - 1; i >= 0; i--) {
          if (planSections[i].finished) {
            planSections[i].showTimelineBlock = true;
            planSections[i].imgClass = 'active';
            planSections[i].imgSrc = page.data.imgSrc.dragonfruit;
            break;
          }
        }

        page.data.planSections = planSections;

        page.setData({
          planSections: page.data.planSections,
          datePicker:page.data.datePicker
        });

        console.log(page.data);
      }

    });
  },
  /**
   * 函数名:datesComparison
   * 作用：对计划日期和当下日期进行对比
   * 返回值：
   * 1.=0 已过期（相等）
   * 2.>0 还没到期（大于）
   * 3.<0 已过期(小于)
  * **/
  datesComparison:function(datePlan,dateFinished){
    var datePlan, dateFinished,dateNow, diff;

    datePlan = new Date(arguments[0]);
    dateNow = new Date();

    if(arguments.length==1){
      diff = datePlan - dateNow;
    }else{
      dateFinished = new Date(arguments[1]);
      diff = datePlan - dateFinished;
    }
    return diff;
    
  },
  /**
   * 
  * **/
  dateFormation: function () {
    var date, day, today, result, week, nian, yue, ri;
    week = [
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
      '星期日'
    ];
    today = new Date();
    nian = today.getFullYear();
    yue = today.getMonth() + 1;
    ri = today.getDate();
    date = String(nian) + '年' + String(yue) + '月' + String(ri) + '日';
    day = week[today.getDay() - 1];
    return {
      date: date,
      day: day
    };
  },
  /**
   * 
   * **/
  onTimePickerValueChanged:function(e){
    var name,value,key,msKey;
    name = e.currentTarget.dataset.name;
    value = e.detail.value;
    msKey = 'datePicker.'+name+'Ms';
    this.data.datePicker[name] = value;
    this.data.datePicker[name+'Ms'] = new Date(value).getTime(); 
    key = 'datePicker.'+name+'PickerText';
    this.setData({
      [key]:value,
      [msKey]: new Date(value).getTime()
    });
    if (this.data.datePicker.beginDate != '' && this.data.datePicker.endDate != ''){
      console.log(this.data.datePicker);
    }
  },
  /**
   * 
   * **/
  onFilterValueChanged:function(e){
    var index,value;
    index = e.detail.value;
    value = this.data.filterData.range[index];
    console.log(value);
    this.setData({
      ['filterData.text']:value
    });
    this.renderPlanSections();
  },
  /**
   * 
   * **/
  onPlanItemPickerValueChanged:function(e){

    var planIndex,pickerValueIndex,action,plan,planData,url,docid,data,validation;
    planIndex = e.currentTarget.dataset.index;
    pickerValueIndex = e.detail.value;
    plan = this.data.planSections[planIndex];
    planData = JSON.stringify(this.data.planSections[planIndex]);
    action = this.data.pickerOperations[pickerValueIndex].action;

    if(plan.finished){
      var title;
      if(action=='alter'){
        title = '计划已完成，不能修改';
        wx.showToast({
          title: title,
          icon: 'none'
        });
        return;
      }else{
        title = '计划已完成，不能删除';
        wx.showToast({
          title: title,
          icon: 'none'
        });
        return;
      }

    }else{

      if(action=='delete'){
        data = {};
        validation={};
        docid = this.data.planSections[planIndex]._id;
        validation.on = false;
        validation.ref = false;
        data.collectionName = 'produceplans';
        data.index = planIndex;
        data.docid = docid;
        util.operation.page.onDeleteBtnTap(e, this, validation, data);
      }else if(action == 'alter'){
        url = 'alter/alter' + '?dataset=' + planData;

        wx.navigateTo({
          url: url
        });
      }

    }

  },


  


})