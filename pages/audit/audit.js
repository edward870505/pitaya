// pages/audit/audit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: 'audition',
    itemImgSrc: '/images/待审核.png',
    filterRenderData: {
      pickerText: '请选择事项类型',
      imgSrc: '/images/待办事项.png',
    },
    audition:[
      {
        type:'分级标准',
        action:'新增',
        submit_person:'黄超华',
        submit_time:'2018/12/23 15:35',
        content:{
          name:'红肉一级大果',
          size:'1斤以上'
        }
      },
      {
        type: '地块',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/24 15:35',
        content: {
          farm: '潘切',
          serial: '001',
          type:[
            {
              name:'玫瑰红',
              area:100,
              unit:'亩',
              amount:1000
            },
            {
              name: '红龙一号',
              area: 200,
              unit: '亩',
              amount:800
            },

          ]
        }
      },
      {
        type: '生产流程',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          type:'产出型',
          name: '摘果',
          content: '果实成熟后进行'
        }
      },
      {
        type: '农事活动',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          type: '非产出型',
          name: '灌溉',
          content: '为植物生长提供所需水分'
        }
      },
      {
        type: '物资',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          type: '化肥',
          name: '复合肥',
          brand:'abcd',
          content: 'abcd复合肥'
        }
      },
      {
        type: '汇率',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          origin: '人民币',
          target: '越南盾',
          exchange: 3391.3841
        }
      },
      {
        type: '单位',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          type: '重量单位',
          name: '千克',
        }
      },
      {
        type: '小组',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          serial: '1314',
          members: ['Mr Wong','Mr Guan'],
        }
      },
      {
        type: '品种',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          type: '红肉火龙果',
          name: '红龙一号',
        }
      },
      {
        type: '方案',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          type: '施肥',
          materials: [
            {
              name:'钾肥',
              amount:1,
              unit:'份'
            },
            {
              name: '磷肥',
              amount: 2,
              unit: '份'
            },
          ]
        }
      },
      {
        type: '转换关系',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          origin:'袋',
          target:'千克',
          amount:10
        }
      },
      {
        type: '生产计划',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          plans:[
            {
              type: '非产出型',
              date: '2018/10/24',
              name: '育苗',
              prediction:null
            },
            {
              type:'非产出型',
              date:'2018/12/24',
              name:'定值',
              prediction: null
            },
            {
              type: '产出型',
              date: '2019/1/24',
              name: '开花',
              prediction: null
            },
            {
              type: '产出型',
              date: '2019/2/24',
              name: '结果',
              prediction:[
                {
                  grade:'红肉一级大果',
                  production:100,
                  unit:'吨',
                  portion:0.3
                },
                {
                  grade: '红肉一级大果',
                  production: 100,
                  unit: '吨',
                  portion: 0.3
                }
              ]
            },

          ]
        }
      },
      {
        type: '物资进仓',
        way:'采购进仓',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          plans: [
            {
              type: '肥料',
              way:'采购进仓',
              date: '2018/10/24',
              name: '钾肥',
              brand:'kimyifruit',
              amount:100,
              unit:'袋',
              price:'100000000',
              currency:'VND'
            },
            {
              type: '肥料',
              date: '2018/10/24',
              way: '采购进仓',
              name: '钾肥',
              brand: 'kimyifruit',
              amount: 100,
              unit: '袋',
              price: '100000000',
              currency: 'VND'
            }

          ]
        }
      },
      {
        type: '物资出仓',
        way: '普通出仓',
        action: '新增',
        submit_person: '黄超华',
        submit_time: '2018/12/23 15:35',
        content: {
          plans: [
            {
              type: '肥料',
              way: '采购进仓',
              date: '2018/10/24',
              name: '钾肥',
              brand: 'kimyifruit',
              amount: 100,
              unit: '袋',
              price: '100000000',
              currency: 'VND'
            },
            {
              type: '肥料',
              date: '2018/10/24',
              way: '采购进仓',
              name: '钾肥',
              brand: 'kimyifruit',
              amount: 100,
              unit: '袋',
              price: '100000000',
              currency: 'VND'
            }

          ]
        }
      },



    ]
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
  onAuditYesBtnTap:function(e){
    wx.showModal({
      title: '事项审核',
      content: '确定通过审核吗？',
    })
  },
  onAuditNoBtnTap:function(e){
    wx.navigateTo({
      url: '/pages/audit/disapproval/disapproval',
    })
  }
})