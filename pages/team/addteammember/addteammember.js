// pages/team/addteammember/addteammember.js
var util = require('../../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'addteammember',//依据此值调用地块模板
    itemImgSrc: '/images/form_label_imgs/小组.png',//记录标题图片
    memberImg: '/images/用户.png',
    filterData: {//筛选框参数
      initText: '请输入名字',
      text: '',
      imgSrc: '/images/form_label_imgs/name.png',//筛选框右侧图标,
      range: []
    },
    operations: [
    ],
    dataset: [],//项目记录数组
    team: {},
    teamid:'',
    teamMemberIds:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var page,team,teamid,dataset;

    //初始化表单
    team = JSON.parse(options.dataset);
    this.data.team = team;


    //页面实例
    page = this;
    teamid = team._id;
    this.data.teamid = teamid;
    //初始化用户数据
    this.setData({
      user: appInstance.userData
    });


    //初始化筛选框数据
    /*初始化筛选框文本*/

    this.setData({
      ['filterData.text']: this.data.filterData.initText,
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
    var queryData,//<Object>查询操作参数设置
        page//<Object>存储页面实例;

    queryData = {};

    //存储页面实例
    page = this;


    //数据库查询操作参数设置
    queryData.collectionName = 'team_members';
    util.operation.database.query('renderBasicinfoIndexPage', queryData, page);

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
 * 函数名:onSwitchChanged
 * 功能：响应switch组件状态改变的事件处理函数
 * 参数：e<Object>：事件对象
 * 返回值:undefined
 * 实现过程：
 * 1.读取switch的data-index属性，根据index获取对应记录的docid值，用以识别用户点击的是哪个记录的switch
 * 2.根据switch的value值判断记录是被停用还是启用
 * 3.如果是停用，则直接修改数据库对应记录的status值后更新页面实例的dataset；如果是启用，则先判断是否需要对启用的记录
 *   进行重复性验证，若有则调用重复性验证函数，若无则直接修改数据库后更新页面实例的dataset对应记录的status值
 * **/
  onSwitchValueChanged: function (e) {
    var index,teamid,memberid,member,memberIdsArr,value,page,refCount;
    index = e.currentTarget.dataset.index;
    value = e.detail.value;
    page = this;
    memberIdsArr = [];
    
    member = this.data.dataset[index];
    teamid = this.data.teamid;
    memberid = this.data.dataset[index]._id;

    if(value){

      page.data.team.members.forEach(function(item,index){
        if(item._id == memberid){
          memberIdsArr.push(item._id);
        }
      });
      
      if(memberIdsArr.length==0){
        page.data.team.members.push(member);
        wx.cloud.callFunction({
          name: 'update',
          data: {
            collectionName: 'teams',
            docid:teamid,
            data: {
              members: page.data.team.members
            }
          },
          success(res) {
            wx.navigateBack({
              
            })
          },
          fail(res){

          }
      }); 
      }
      console.log(page.data.team);
     
    }else{
      wx.cloud.callFunction({
        name: 'query',
        data: {
          collectionName: 'teams',
          keys: {
            docid: teamid
          }
        },
        success(res) {
          console.log(res);
        }
      }); 
    }
    
 
  },
  /**
   * 函数名:onAlterBtnTap
   * 功能：响应记录修改按钮点击事件
   * 参数:e<Object>-事项对象
   * 返回值:undefined
   * 实现过程:
   * 1.获取按钮data-index值
   * 2.根据index值读取记录的status值
   * 3.依据status值判断记录是否被启用，若已启用，禁止修改并通知用户停用后再修改
   * 4.若符合修改条件，根据index值获取记录数据，经对象序列化后传递给修改页面
  **/
  onAlterBtnTap: function (e) {
    var index, status, itemData, url, ref, validation, data, page;
    page = this;
    data = {};
    validation = {};
    index = e.currentTarget.dataset.index;
    status = this.data.dataset[index].status;
    ref = false;

    validation.on = status;
    validation.ref = ref;
    validation.repeated = false;

    data.collectionName = 'team_members';
    data.index = index;

    util.operation.page.onAlterBtnTap(e, page, validation, data);

  },
  /**
* 
**/
  onDeleteBtnTap: function (e) {
    var index, status, ref, itemData, url, page, docid, data, validation, docid;
    data = {};
    validation = {};
    page = this;
    index = e.currentTarget.dataset.index;
    status = this.data.dataset[index].status;
    ref = this.data.dataset[index].ref;
    docid = this.data.dataset[index]._id;
    validation.on = false;
    validation.ref = false;
    data.collectionName = 'team_members';
    data.index = index;
    data.docid = docid;
    util.operation.page.onDeleteBtnTap(e, page, validation, data);
  },
  /**
   * 函数名：onFilterValueChanged
   * 功能：根据filter picker值的变化显示相关记录
   * 参数：
   * 返回值：
   * 
   * **/
  onFilterValueChanged: function (e) {
    util.operation.page.onFilterValueChanged(e, this);
  },
  
})