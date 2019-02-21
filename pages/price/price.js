Page({

  /**
   * 页面的初始数据
   */
  data: {
    species:'',
    name:"",
    avatarUrls:{
      pitayaAvatarUrl:'/images/dragon_fruit.png',
      avocadoAvatarUrl:'/images/avocado-price.png'
    },
    fruitClassifications:{
      pitaya:[
        '一级红肉大果',
        '二级红肉大果'
      ],
      avocado:[
        '16头',
        '20头'
      ]
    },
    classificationIndex:0,
    bottomLeftArrowSrc: '/images/left-arrow.png',
    bottomRightArrowSrc: '/images/right-arrow.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var fruitSpecies,fruitName;
    fruitSpecies = options.species;
    fruitName = options.name;
    this.setData({
      species:fruitSpecies,
      name:fruitName
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
   * 分级选择器值变化时
   */
  bindClassificationPickerChange:function(e){
    var index;
    index = e.detail.value;
    this.setData({
      classificationIndex:index
    });
    console.log(e.detail.value)
  },
  /**
   * 点击左箭头图片时修改其SRC
   * **/
   changeLeftArrowImgSrc:function(e){
     if(e.type === 'touchstart'){
       this.setData({
         bottomLeftArrowSrc: '/images/left-arrow-active.png'
       });
     }else{
       this.setData({
         bottomLeftArrowSrc: '/images/left-arrow.png'
       });
     }
   },
  /**
* 点击右箭头图片时修改其SRC
* **/
  changeRightArrowImgSrc: function (e) {
    if (e.type === 'touchstart') {
      this.setData({
        bottomRightArrowSrc: '/images/right-arrow-active.png'
      });
    } else {
      this.setData({
        bottomRightArrowSrc: '/images/right-arrow.png'
      });
    }
  },
})