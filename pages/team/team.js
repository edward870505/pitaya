// pages/team/team.js
var util = require('../../util/util');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'team',//依据此值调用地块模板
    itemImgSrc: '/images/form_label_imgs/小组.png',//记录标题图片,
    memberImgSrc: '/images/用户.png',
    filterData: {//筛选框参数
      initText: '请输入组号',
      text: '',
      imgSrc: '/images/数字.png',//筛选框右侧图标,
      range: []
    },
    operations: [
      {
        imgSrc: '/images/add_btn.png',
        text: '新增小组',
        action: 'addteam'
      },
      {
        imgSrc: '/images/add_btn.png',
        text: '新增成员',
        action: 'addmember'
      }
    ],
    dataset: [],//项目记录数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page;
    //页面实例
    page = this;
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
        page;//<Object>存储页面实例

    queryData = {};

    //存储页面实例
    page = this;


    //数据库查询操作参数设置
    queryData.collectionName = 'teams';
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
   * 函数名：onFilterValueChanged
   * 功能：根据filter picker值的变化显示相关记录
   * 参数：
   * 返回值：
   * 
   * **/
  onFilterValueChanged: function (e) {
    util.operation.page.onFilterValueChanged(e, this);
  },
  /**参数名:onOperationItemTap
 * 功能：操作按钮点击响应
 * 参数：e<事件对象>
 * **/
  onOperationItemTap: function (e) {
    var item, action, url;
    item = 'field';
    //读取操作标记值
    action = e.currentTarget.dataset.action;
    //判断用户是否有'新增'权限
    if (!util.operation.authority.isOperationAllowed(item, this.data.user.authorities)) {
      return;
    }
    //根据操作标记值，拼接URL
    url = './' + action + '/' + action;
    //跳转到对应页面
    wx.navigateTo({
      url: url,
    })
  },
  onAddMemberBtnTap:function(e){
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

    data.collectionName = 'teams';
    data.index = index;

    this.onAddTeamMemberBtnTap(e, page, validation, data);
    console.log(e);

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
    validation.on = status;
    validation.ref = ref;
    data.collectionName = 'teams';
    data.index = index;
    data.docid = docid;
    util.operation.page.onDeleteBtnTap(e, page, validation, data);
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
    util.operation.page.onSwitchValueChanged(e, this, { repeated: false }, {}, {}, 'teams');
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

    data.collectionName = 'teams';
    data.index = index;

    util.operation.page.onAlterBtnTap(e, page, validation, data);

  },
  /**
  * 函数名:onAlterBtnTap
  *  
  * 
  * **/
  onAddTeamMemberBtnTap: function (e, page, validation, data) {
    var itemData, url;
    if (validation.repeated) {

    } else if (validation.on) {
      wx.showModal({
        title: '修改记录',
        content: '记录已启用，无法修改',
      });
      return;
    } else if (validation.ref) {
      wx.showModal({
        title: '修改记录',
        content: '记录已引用，无法修改',
      });
      return;
    } else {
      itemData = JSON.stringify(page.data.dataset[data.index]);
      url = 'addteammember/addteammember' + '?dataset=' + itemData;
      wx.navigateTo({
        url: url,
      })
    }
  },
  /**
   * 函数名:onMemberPickerValueChanged
   * 作用：响应小组成员图标点击事件
   * 功能：
   *  1.从小组中删除选中成员；
   *  2.跳转到成员信息修改页面；
   * 实现过程：
   *  1.删除小组成员
   *    1) 获取小组index,判断删除哪个小组的成员；
   *    2) 获取成员id,判断删除哪个小组的成员；
   *    3) 修改数据库；
   *    4）修改页面数据，更新视图；
   * **/
  onMemberPickerValueChanged:function(e){
    var pickerIndex,teamIndex,memberId,members,itemIndex,teamId,page;
    pickerIndex = e.detail.value;
    page = this;
    if(pickerIndex==0){
      teamIndex=e.currentTarget.dataset.index;
      itemIndex = 'dataset[' + teamIndex + '].members';
      memberId = e.currentTarget.dataset.id;
      members = page.data.dataset[teamIndex].members;
      teamId = page.data.dataset[teamIndex]._id;
      members.forEach(function(item,index){
        if(item._id == memberId){
          members.splice(index,1);
        }
      });
      wx.cloud.callFunction({
        name:'update',
        data:{
          collectionName:'teams',
          docid:teamId,
          data:{
            members:members
          }
        },
        success(res) {
          page.setData({
            [itemIndex]: members
          });
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          })
        }
      });
    }


  }

})