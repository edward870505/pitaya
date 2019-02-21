// components/popup/popup.js
Component({
  options:{
    multipleSlots:true
  },
  properties:{
    title:{
      type:String,
      value:''
    },
    content:{
      type:String,
      value:''
    },
    cancelText:{
      type:String,
      value:''
    },
    confirmText:{
      type:String,
      value:''
    }
  },
  data:{
    isShow:false,
    page:null,
    items:[],
    key:'',
    keyIndex:'',
    itemData:null
  },
  methods:{
    showDialog:function(){
      console.log(this.data.page);
      this.setData({
        isShow:!this.data.isShow
      });
    },
    hideDialog:function(){
      this.setData({
        isShow: !this.data.isShow
      });
    },
    _cancelEvent:function(){
      this.triggerEvent('cancelEvent');
    },
    _confirmEvent:function(){
      this.triggerEvent('confirmEvent');
    },
    onCheckboxGroupValueChaned:function(e){

      var key,keyIndex,value,datasetIndex,action;
      action = this.data.page.data.action;
      key = this.data.key;
      keyIndex = this.data.keyIndex;
      value = e.detail.value;

      if(action == 'alterFarmingDiary'){
        this.data.page.data.dataset[key] = value;
        datasetIndex = 'formSections[' + keyIndex + '].value';
        console.log(this.data.page.data.dataset);
        console.log(e.detail.value);
      }else{
        this.data.page.data.dataset[key].value = value;
        datasetIndex = 'formSections[' + keyIndex + ']inputPlaceHolder';
        console.log(this.data.page.data.dataset);
      }

      this.data.page.setData({
        [datasetIndex]: value
      });

      this.triggerEvent('onCheckboxGroupValueChaned');
     


      
    }
  }
})