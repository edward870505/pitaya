// pages/index/index.js
var appInstance = getApp();
var db = appInstance.db;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherInfo:{
      selectedCity:"佛山",
      cities:[
        '佛山',
        '广州'
      ],
      citiesCode:{
        '佛山':'440600',
        '广州':'440100'
      },
      date:'',
      temp:'',
      day:'',
      weather:''
    },
    user: {},
    fruitItems:[
      {
        name:"火龙果",
        imgSrc:'/images/dragon_fruit.png',
        species:'pitaya'
      },
      /*{
        name:"牛油果",
        imgSrc:'/images/fruit-item-avocado.png',
        species:'avocado'
      }*/
    
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    this.setData({//更新用户信息
      user:appInstance.userData
    });

    this.fetchWeatherInfo(); 
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
   * 用户点击行情水果图标，实现跳转
   * **/
   onFruitItemTap:function(event){
     if(!appInstance.userData.isLogin){
       wx.navigateTo({
         url: '../login/login',
       })
     }else{
       var fruitName, fruitSpecies, navigateUrl;
       fruitSpecies = event.currentTarget.dataset.species;
       fruitName = event.currentTarget.dataset.name;
       navigateUrl = '../price/price?&species=' + fruitSpecies + '&name=' + fruitName;
       wx.navigateTo({
         url: navigateUrl
       })
     }

   },
   /**
    * 用户点击登录按钮
    **/
  onUserLogInBtnTap:function(e){
    var isUserLogIn;
    isUserLogIn = appInstance.userData.isLogin;
    if(!isUserLogIn){
      wx.navigateTo({
        url: '../login/login',
      })
    }else{
      //wx.showToast({
        //title: '你已登录',
        //image:'/images/login_toast_info.png'
      //q})
    }
  },
  /**
   * 
   * **/
   onWeatherSelectedCityChanged:function(e){
     var idx,selectedCity;
     idx = e.detail.value;
     selectedCity = this.data.weatherInfo.cities[idx];
     this.data.weatherInfo.selectedCity = selectedCity; 
     this.setData({
       weatherInfo:this.data.weatherInfo
     });
     this.fetchWeatherInfo();
   },
  /**
   * 第三方天气API
   * **/
   fetchWeatherInfo:function(){
     var url,key,extensions,output,code,city,that;
     that = this;
     city = this.data.weatherInfo.selectedCity;
     key = 'b9cb3c5460576eb94d7031687fa8fd75';
     code = this.data.weatherInfo.citiesCode[city];     
     extensions = 'base';
     output = 'json';
     url = 'https://restapi.amap.com/v3/weather/weatherInfo?key='+key+'&city='+code+'&extensions='+extensions+'&ouput='+output;
     wx.request({
       url: url,
       success:function(res){
         that.updateWeatherInfo(res)
       }
     })

   },
   /**
    * 更新天气信息 
    **/
     updateWeatherInfo:function(res){
        var date,day,temp,weather;
        date = res.data.lives[0].reporttime;
        date = this.formatDate(date).date;
        day = this.formatDate(date).day;
        temp = res.data.lives[0].temperature;
        weather = res.data.lives[0].weather;
        this.data.weatherInfo.date = date;
        this.data.weatherInfo.temp = temp;
        this.data.weatherInfo.day = day;
        this.data.weatherInfo.weather = weather;
        this.setData({
         weatherInfo:this.data.weatherInfo
        });
      },
    /**
     * 格式化日期
     * **/
      formatDate:function(reporttime){
        var date,day,today, result,week,nian,yue,ri;
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
        yue = today.getMonth()+1;
        ri = today.getDate();
        date = String(nian)+'年'+ String(yue) +'月'+ String(ri) +'日';
        day = week[today.getDay()-1];
        return {
          date:date,
          day:day
        };
      }
})
