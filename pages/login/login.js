// pages/login/login.wxml.js

var appInstance = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginData:{
      name:'',
      pwd:''
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      userData:appInstance.userData,
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
   * 用户提交登录信息
   * **/
   loginFormSubmit:function(e){

     var name,pwd,self;

     self = this;

     

     name = e.detail.value.user_name.trim();
     pwd = e.detail.value.user_pwd.trim();

     this.data.loginData.name = name;
     this.data.loginData.pwd = pwd;

     if(name ==="" || pwd ===""){

       wx.showToast({
         title: '用户名或密码不能为空',
         icon:'none'
       });
       return false;

     }

     wx.cloud.callFunction({
       // 云函数名称
       name: 'query',
       // 传给云函数的参数
       data: {
         collectionName: 'users',
         keys: {
           name: name,
           pwd:pwd
         }
       },
       success(res) {
         if(res.result.data.length==0){
           wx.showToast({
             title: '用户名或密码错误',
             icon:'none'
           })
         }else{
           appInstance.userData.cnname = res.result.data[0].cnname,
           appInstance.userData.name = res.result.data[0].name,
           appInstance.userData.role = res.result.data[0].role;
           appInstance.userData.authorities = res.result.data[0].authorities;
           appInstance.userData.isLogin = true;
           appInstance.userData.loginStatus = '已登录';
           wx.reLaunch({
             url: '../index/index',
             complete: function () {
               wx.showToast({
                 icon: 'none',
                 title: '登录成功'
               });
             }
           })
         }
         
       },
       fail: console.error
     })

     /*if(name ==="abc" && pwd=== "123"){

       appInstance.userData.name = '黄超华',
       appInstance.userData.role = '系统管理员';
       appInstance.userData.isLogin = true;
       appInstance.userData.avatarUrl = '/images/durian.png',
       appInstance.userData.loginStatus = '已登录'

       wx.reLaunch({
         url: '../index/index',
         complete: function () {
           wx.showToast({
             icon: 'none',
             title: '登录成功'
           });
         }
       })

     }else{
       wx.showToast({
         title: '用户名或密码错误',
         icon:'none'
       })
     }*/
   }
})
