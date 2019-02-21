var util = require('./util/util');

wx.cloud.init();

App({
  /**
   * 
   * 小程序用户信息
   * 
    * **/
  userData: {
    avatarUrl: '/images/dragon-fruit-avatar.png',
    name: '',
    role: '普通用户',
    isLogin: false,
    loginStatus: '未登录',
    cnname: '访客',
    authorities: null
  },
  /**
   * 远程数据本地副本
   * **/
  dbData: {},
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

    this.autuoLogin();
    

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  initDataBase:function(collectionName){
    var that,collection,rangeKey,page;
    if(arguments[1]){
      rangeKey = arguments[1];
    }
    if(arguments[2]){
      page = arguments[2];
    }
    that = this;
    switch(collectionName){
      case 'warehouses':
        collection = 'warehouses';
      break;
      case 'units':
        collection = 'units';
      break;
      case 'sub_materials':
        collection = 'sub_materials';
      break;
    }

    wx.cloud.callFunction({
      name: 'query',
      data: {
        collectionName: collectionName
      },
      success(res) {
        
        that.dbData[collection] = res.result.data;

        if(rangeKey){

          page.data.pickerRange[rangeKey] = [];

          switch(collectionName){
            case 'warehouses':
              that.dbData[collection].forEach(function (item, index) {
                if (item.type == '一级仓') {
                  if (item.approval && item.status) {
                    page.data.pickerRange[rangeKey].push(item);
                  }
                } else if (item.type == '二级仓') {
                  if (item.status) {
                    page.data.pickerRange[rangeKey].push(item);
                  }
                }
              });
            break;
            case 'units':
              if(page.data.action=='addMaterial'){
                that.dbData[collection].forEach(function(item,index){
                    page.data.pickerRange[rangeKey].push(item);
                });
              }
            break;
          }


          page.setData({
            pickerRange: page.data.pickerRange
          });
        }

        if(page.data.action == 'materialIn'){

        }
        console.log(that.dbData[collection]);
      }
    });
  },
  /**
   * 函数名:initDatabase
   * 功能：读取远程数据库数据到本地
   * 参数：
   * -- collectionNames <数组> 远程数据库集合名
   * 返回值
   * -- 无
   * **/
   initDatabase:function(collectionNames){
    var app;

    app = this;

    collectionNames.forEach(function(item,index){
      wx.cloud.callFunction({
        name:'query',
        data:{
          collectionName:item
        },
        success(res){
          app.dbData[item] = res.result.data;
        }
      });
    });

    app.dbData.unitTypes = ['重量单位', '面积单位', '体积单位', '数量单位'];

    app.dbData.speciesTypes = ['红肉', '白肉', '燕窝果'];

    app.dbData.transferTypes = ['重量重量', '数量重量', '体积重量', '体积数量']
   },
  /**
   * 函数名:autoLogin
   * 功能：以指定用户身份自动登录
   * **/
   autuoLogin:function(){
     var app;
     app = this;

     wx.showLoading({
       title: '登录中..',
     });

     wx.cloud.callFunction({
       // 云函数名称
       name: 'query',
       // 传给云函数的参数
       data: {
         collectionName: 'users',
         keys: {
           name: 'ivan',
           pwd: 'kyf01'
         }
       },
       success(res) {
         wx.hideLoading();
         if (res.result.data.length == 0) {
           wx.showToast({
             title: '用户名或密码错误',
             icon: 'none'
           })
         } else {
            app.userData.cnname = res.result.data[0].cnname,
            app.userData.name = res.result.data[0].name,
            app.userData.role = res.result.data[0].role;
            app.userData.authorities = res.result.data[0].authorities;
            app.userData.isLogin = true;
            app.userData.loginStatus = '已登录';
            wx.reLaunch({
              url: '../index/index',
              complete: function () {
                wx.showToast({
                  icon: 'none',
                  title: '登录成功'
                });
              }
            });
            app.initDatabase(
              [
              'farmings',
              'fields',
              'grades',
              'producenodes',
              'schemes',
              'species',
              'sub_materials',
              'team_members',
              'teams',
              'units',
              'warehouses',
              'farms',
              'exchangerates'
              ]
            );

            

         }

       },
       fail() { 
          wx.hideLoading(); 
          console.log(error); 
       }
     })
   },
  /**
   * 函数名：updateDatabase
   * 功能：更新数据库
   * **/
   updateDatabase:function(key,action,page,nextAction){
     var app =this;
     switch(action){
       case 'reinit'://重新初始化整个集合
        wx.cloud.callFunction({
          name:'query',
          data:{
            collectionName:key
          },
          success(res){
            app.dbData[key] = res.result.data;
            if(nextAction){
              page[nextAction](key);
            }
          }
        });
       break;
       case '':

       break;
     }

   }

})


