// pages/warehouse/alter/alter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleImgSrc: '/images/warehouse1.png',
    titleText: '',
    formCNLabel: {
      'name': '仓库名称',
      'parent': '上级仓库'
    },
    formSections: [

    ]     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dataset, titleText;
    dataset = JSON.parse(options.dataset);
    titleText = dataset.name + '('+dataset.type + ')';
    this.setData({
      titleText: titleText
    });
    for (var key in dataset) {
      if (dataset.hasOwnProperty(key)) {
        if (dataset[key] != '') {
          if (this.data.formCNLabel[key] === undefined) continue;

          var imgSrc, text, inputType, areaUnit, placeHolder;

          switch (key) {
            case 'name':
              imgSrc = '/images/form_label_imgs/name.png';
              text = this.data.formCNLabel[key];
              inputType = 'input';
              placeHolder = dataset[key];
              areaUnit = false;
              this.data.formSections.push({
                imgSrc: imgSrc,
                text: text,
                inputType: inputType,
                placeHolder: placeHolder,
                areaUnit: areaUnit
              });
              break;
            case 'parent':
              if(!dataset.ref){
                imgSrc = '/images/form_label_imgs/关联.png';
                text = this.data.formCNLabel[key];
                inputType = 'picker';
                placeHolder = dataset[key];
                areaUnit = false;
                this.data.formSections.push({
                  imgSrc: imgSrc,
                  text: text,
                  inputType: inputType,
                  placeHolder: placeHolder,
                  areaUnit: areaUnit
                });
              }
              break;
          };



        }
      }
    };

    this.setData({
      formSections: this.data.formSections
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

  }
})