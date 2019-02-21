var operation;
var appInstance = getApp();


operation = {
  /**
   * 属性:page
   * 类型:Object
   * 说明:页面方法集合
   * 1.renderBasicinfoIndexPage
   * 2.renderBasicinfoAddPage
   * 3.renderBasicinfoAlterPage
   * **/
  page:{
    /**
      * 函数名：renderPage
      * 功能：根据action调用相关页面render函数
      * 参数：action<String> 
    **/
    renderPage:function(action,dataset,page){
      if(dataset.length>0){
        switch (action) {
          case 'renderBasicinfoIndexPage':
            operation.page.renderBasicinfoIndexPage(dataset, page);
          break;
          case '':

          break;
        }
      }else{
        switch('action'){
          case 'renderBasicinfoIndexPage':C
            operation.page.showToast(action);
          break;
          case '':
          break;
        }
      }
    },
    /**
      * 函数名:renderBasicindoIndexPage
      * 功能：渲染基础信息项目首页
      * 参数：
      *  1.queryData<Object>
      *  2.page<Object>
      * 返回值：undefined
      * 实现过程
      * 1.根据集合明远程获取记录数据集
      * 2.更新page的dataset属性  
    **/
    renderBasicinfoIndexPage:function(dataset,page){
      console.log(dataset);

       page.setData({
         dataset:dataset
       });

       if(page.data.itemName==='addteammember'){

         var membersIdArr = [];

         if (page.data.team.members.length > 0) {

           page.data.team.members.forEach(function (item, index) {
             page.data.teamMemberIds.push(item._id);
           });

           membersIdArr = page.data.teamMemberIds;

           console.log(page.data.dataset, membersIdArr)

           page.data.dataset.forEach(function (item, index) {
             if (membersIdArr.indexOf(item._id) > -1) {
               page.data.dataset.splice(index, 1);
             }
           });

           page.setData({
             dataset: page.data.dataset
           });
         }
       }
    },
    /**
     * 函数名：renderBasicinfoAlterRange
     * 
     * **/
    renderBasicinfoAlterPage:function(dataset,page){
   
      operation.page.renderAlterPageFormSections(page);

      switch(page.data.itemName){
        case 'field':
          operation.page.renderAlterPageCustomedFormSections(dataset.varieties, page);
        break;
        case 'scheme':
          operation.page.renderAlterPageCustomedFormSections(dataset.materials, page);
        break;
        case 'producePlan':
          if(dataset.predictions){
            operation.page.renderAlterPageCustomedFormSections(dataset.predictions, page);
          }
        break;
      }
    },
    /**
     * 函数名：renderAlterPageFormSections
     * 功能：显示修改页面通用表单区域
     * **/
    renderAlterPageFormSections: function (page) {
       var dataset, shownSections,sectionsOrder;
       dataset = page.data.dataset;
       shownSections = page.data.shownSections;
       console.log(dataset,shownSections);
       sectionsOrder = page.data.sectionsOrder;
       sectionsOrder.forEach(function(key,index){
         if(dataset.hasOwnProperty(key)){
           if (shownSections[key] != undefined) {
             var section = {};
             section.name = key;
             section.imgSrc = shownSections[key].imgsrc;
             section.text = shownSections[key].label;
             section.inputType = shownSections[key].inputType;
             section.areaUnitInput = shownSections[key].areaUnitInput;
             section.value = dataset[key];
             section.range = shownSections[key].range;
             section.inputPlaceHolder = shownSections[key].inputPlaceHolder;
             if(page.data.itemName=='farmdiary'){
               if(key=='scheme'){
                 section.inputPlaceHolder = dataset[key].name;
                 section.range_key = shownSections[key].range_key;
               }
             }else{
               section.inputPlaceHolder = shownSections[key].inputPlaceHolder;
             }
             if (section.areaUnitInput) {
               section.fieldAreaUnit = dataset.fieldAreaUnit;
             }
             if (shownSections[key].teamfield) {
               section.teamfield = shownSections[key];
             }

             if(page.data.itemName!='farmdiary' || key!='scheme'){
               if ((section.value != '') && (section.inputType.toLowerCase().match('picker') != null)) {

                 section.inputPlaceHolder = section.value;

               }
             }
       
             section.canBeEmpty = shownSections[key].canBeEmpty;
             page.data.formSections.push(section);
           }
         }

       });
       //for (var key in dataset) {
         //if (dataset.hasOwnProperty(key)) {

         //}
       //}
       page.setData({
         formSections: page.data.formSections
       });

       console.log(page.data.formSections);
    },
    /**
     * 函数名：renderAlterPageCustomedFormSections
     * 功能：显示修改页面定制表单区域
     * **/
    renderAlterPageCustomedFormSections: function(dataset, page) {
       page.setData({
         otherFormSections: dataset
       });
    },
    /**
    * 函数名:showAddItemFormSections
    * 功能：显示'新增'页面表单信息
    * 参数：page<新增页面页面实例>
    **/
    renderAddPageFormSections: function (page) {
      var dataset;
      dataset = page.data.dataset;
      for (var key in dataset) {
        if (dataset.hasOwnProperty(key)) {
          var section = {};
          for (var k in dataset[key]) {
            if (dataset[key].hasOwnProperty(k)) {
              section[k] = dataset[key][k];
            }
          }
          page.data.formSections.push(section);
        }
      }
      page.setData({
        formSections: page.data.formSections
      });
    },
    /**
     * 函数名：showToast
     * 功能：根据action显示相关提示
     * 参数：action<String>
     * 返回值：undefined
     *   
    **/
    showToast:function(action){
      var text;
      switch(action){
        case 'renderBasicinfoIndexPage':
          text = '暂无记录';
        break;
      }
      wx.showToast({
        title: text,
        icon:'none'
      })
    },
    /**
     * 函数名：onFilterValueChanged 
     * 
     * **/
    onFilterValueChanged:function(e,page){
       var index, value, itemIndex;
       if(page.data.itemName=='team' || page.data.itemName=='addteammember'){
         value = e.detail.value.trim();
       }else{
         index = e.detail.value;
         value = page.data.filterData.range[index];
       }
      
       if (value == '全部'||value=='') {
         value = page.data.filterData.initText;
       }
       itemIndex = 'filterData.text';
       page.setData({
         [itemIndex]: value
       });
       console.log(page.data.filterData);
    },
    /**
     * 函数名：onSwitchValueChanged
     * 功能：监听switch值变化
     * 参数：e<Object>时间对象，page<Object>页面实例，validation<Object>验证对象
     * **/
    onSwitchValueChanged:function(e,page,validation,record,keys,collectionName){
      var switchValue, index, docid, data,isRepeated;
      data = {};
      isRepeated = 0;
      index = e.currentTarget.dataset.index;
      docid = page.data.dataset[index]._id;
      data.collectionName = collectionName;
      data.docid = docid;
      data.index = index;
      switchValue = e.detail.value;
      if (switchValue) {//记录启用
        if(validation.repeated){
          var i,len,key,result,item,itemIndex,repeatedItemCount;
          result = true;
          repeatedItemCount = 0;
          len = keys.length;
          for(var j=0;j<page.data.dataset.length;j++){
            item = page.data.dataset[j];
            if (j != index && item.approval){
              i = 0;

              while (i < len) {
                key = keys[i];
                console.log(j, key, item[key] == record[key]);
                result = isActivatedItemRepeated(result, key, item);
                i++;
              }

              if (result) {
                itemIndex = 'dataset['+index+'].status'
                page.setData({
                  [itemIndex]:false
                });
                wx.showToast({
                  title: '同类标准已启用',
                  icon:'none'
                });
                isRepeated ++;
                break;
              }

            }
          }
          if (isRepeated>0){
            return;
          }else{
            data.data = {
              status: true
            };
          }
          
        }else{
          data.data = {
            status: true
          };
        }
      } else {//记录停用
        data.data = {
          status: false
        };
      }

      operation.database.update(data,page,'updateStatus');

      function isActivatedItemRepeated(rs,key,item){
        var result;
        result = (record[key]==item[key])&&rs;
        return result;
      }
    },
    /**
     * 函数名:onAlterBtnTap
     *  
     * 
     * **/
    onAlterBtnTap:function(e,page,validation,data){
      var itemData,url;
      if(validation.repeated){

      }else if(validation.on){
        wx.showModal({
          title: '修改记录',
          content: '记录已启用，无法修改',
        });
        return;
      }else if(validation.ref){
        wx.showModal({
          title: '修改记录',
          content: '记录已引用，无法修改',
        });
        return;
      }else{
        itemData = JSON.stringify(page.data.dataset[data.index]);
        console.log(itemData);
        if(page.data.itemName=='team'){
          url = 'alterteam/alterteam' + '?dataset=' + itemData;
        } else if (page.data.itemName =='addteammember'){
          url='altermember/altermember'+'?dataset='+itemData;
        }else{
          url = 'alter/alter' + '?dataset=' + itemData;
        }
        
        wx.navigateTo({
          url: url,
        })
      }
    },
    onDeleteBtnTap:function(e,page,validation,data) {
      if(validation.on){
        wx.showModal({
          title: '删除记录',
          content: '记录被启用，无法删除',
        });
        return;
      }else if(validation.ref){
        wx.showModal({
          title: '删除记录',
          content: '记录被引用，无法删除',
        });
      }else{
        wx.showModal({
          title: '删除记录',
          content: '确定删除记录吗？',
          success(res){
            if(res.confirm){
              operation.database.del(data,page);
            }
          }
        });
      }
    },

  },
  /**
   * 属性:database
   * 类型：Object
   * 说明：数据库操作方法集合
   * **/
  database:{
    //数据库集合更新
    update: function (data,page,nextAction) {
      var action;
      action = page.data.action;
      console.log(data);
      wx.cloud.callFunction({
        name: 'update',
        data: data,
        success(res) {
          if(nextAction){
            switch(nextAction){
              case 'navigateBack':
                wx.navigateBack({
                  success(res){
                    wx.showToast({
                      title: '修改成功',
                      icon:'none'
                    });
                   
                  }
                });
                if(action=='alterFarmingDiary'){
                  console.log(page);
                }
              break;
              case 'updateStatus':
                var keyIndex, index;
                index = data.index;
                for (var key in data.data) {
                  keyIndex = 'dataset[' + index + '].' + key;
                  page.setData({
                    [keyIndex]: data.data[key]
                  });
                }
                console.log(page);
              break;
            }
          }
        },
        fail(res) {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          });
        }
      });
    },
    //数据库集合查询
    query:function(action,data,page){
      wx.cloud.callFunction({
        name:'query',
        data:data,
        success:function(res){
          var dataset = res.result.data;
          console.log(dataset);
          operation.page.renderPage(action, dataset, page);
        },
        fail(res){
          console.log(res);
          wx.showToast({
            title: '操作失败',
            icon:'none'
          })
        }
      });
    },
    //数据库集合新增
    add: function (data,page,action) {
      wx.cloud.callFunction({
        name: 'add',
        data: data,
        success(res) {
          switch(action){
            case 'navigateBack':
              wx.navigateBack({

              });
              wx.showToast({
                title: '添加成功',
                icon: 'none'
              });
            break;
            case 'navigateBackParentMaterial':
              wx.cloud.callFunction({
                name:'query',
                data:{
                  collectionName:'parent_materials'
                },
                success(res){
                  var len;
                  len = res.result.data.length;
                  page.data.pickerRange.type.push(res.result.data[len-1].name);
                  page.setData({
                    pickerRange:page.data.pickerRange
                  });
                  wx.showToast({
                    title: '父类物资添加成功',
                    icon:'none'
                  });
          
                }
              });
            break;
            case 'navigateBackTeamMembers':
              wx.cloud.callFunction({
                name: 'query',
                data: {
                  collectionName: 'team_members'
                },
                success(res) {
                  page.data.appInstance.dbData.team_members = res.result.data;
                  wx.showToast({
                    title: '成员添加成功',
                    icon: 'none'
                  });

                }
              });
              break;
          }
        },
        fail(res) {
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          })
        }
      });
    },
    //数据文件删除
    del:function(data,page){
      var record;
      record = page.data.dataset[data.index];
      console.log(record);
      wx.cloud.callFunction({
        name: 'delete',
        data: data,
        success(res) {
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          });
          if(page.data.itemName!='produceplan'){
            page.data.dataset.splice(data.index, 1);
            page.setData({
              dataset: page.data.dataset
            });
            if (page.data.itemName == 'warehouse' && record.type!='一级仓') {
              var docid;
              docid = record.parent._id;
              wx.cloud.callFunction({
                name:'query',
                data:{
                  collectionName:'warehouses',
                  keys:{
                    _id:docid
                  }
                },
                success(res){
                  console.log(res);
                  var children;
                  children = res.result.data[0].children;
                  children.forEach(function(item,index){
                    if(item._id==record._id){
                      children.splice(index,1);
                    }
                  });
                  console.log(children);
                  wx.cloud.callFunction({
                    name:'update',
                    data:{
                      collectionName:'warehouses',
                      docid:docid,
                      data:{
                        children:children
                      },
                 
          
                    },
                    success(res){
                      var keyIndex;

                      page.data.dataset.forEach(function(item,index){
                        if(item._id==docid){
                          keyIndex = index;
                          console.log(index);
                        }
                      });

                      page.data.dataset[keyIndex].children = children;

                      page.setData({
                        dataset:page.data.dataset
                      });

                      

             

                     
                    }
                  });
                }
              });
            }
          }else{
 

            page.data.planSections.splice(data.index, 1);
            page.setData({
              planSections: page.data.planSections
            });
          }
  
        },
        fail(res) {
          wx.showToast({
            title: '删除失败',
            icon: 'none'
          })
        }
      });
    }
  },
  /**
   * 属性：form
   * 类型：Object
   * 说明：表单操作方法集合
   * **/
  form:{
    //表单Page Add Input值更新
    onAddInputBlur:function(data,page){
      var sectionIndex,dataSetKey,dataSetName,value,dataSetNames;
      sectionIndex = data.sectionIndex;
      dataSetKey = data.dataSetKey;
      dataSetName = data.dataSetName;
      value = data.value;
      dataSetNames = data.dataSetNames;
      dataSetNames.forEach(function(item,index){
        switch(item){
          case 'dataset':
            if(dataSetKey==dataSetName){
              page.data[item][dataSetKey].value = value;
            }else{
              page.data[item][dataSetKey][dataSetName] = value;
            }
          break;
          case 'formSections':
            if(dataSetKey == dataSetName){
              page.data[item][sectionIndex].value = value;
            }else{
              page.data[item][sectionIndex][dataSetName] = value;
            }
           
          break;
          case 'otherFormSections':
            page.data[item][sectionIndex][dataSetKey] = value;
            if(data.itemName == 'field'){
              page.data.dataset.varieties = page.data[item];
            }
            if (data.itemName == 'scheme') {
              page.data.dataset.materials = page.data[item];
            }
            if (data.itemName == 'produceplan') {
              page.data.dataset.predictions = page.data[item];
            }
          break;
          case 'totalProduction':
            page.data.totalProduction.value = value;
            console.log(page.data.totalProduction);
          break;
        }
      });
      console.log(page.data.dataset,page.data.formSections,page.data.otherFormSections);
      
    },
    //表单Page Add picker值更新
    onAddPickerValueChanged:function(data,page){
      var sectionIndex, dataSetKey, dataSetName, value, dataSetNames,itemIndex;
      sectionIndex = data.sectionIndex;
      dataSetKey = data.dataSetKey;
      dataSetName = data.dataSetName;
      value = data.value;
      console.log(value);
      dataSetNames = data.dataSetNames;
      dataSetNames.forEach(function (item, index) {
        switch (item) {
          case 'dataset':
            if(dataSetKey==dataSetName){
              page.data[item][dataSetKey].value = value;
              if(page.data.itemName=='produceplan'&& dataSetKey=='node'){
                page.setData({
                  ['dataset.node.value']:value
                });
              }
            }else{
              page.data[item][dataSetKey][dataSetName] = value;
            }
          break;
          case 'formSections':
            if(dataSetKey == dataSetName){
              if(page.data.action=='addWarehouse'){
                if(dataSetKey == 'parent' && value!=''){
                  value = value.name;
                  page.data[item][sectionIndex].value = value;
                }else{
                  value = '请关联上级仓库';
                  page.data[item][sectionIndex].value = value;
                }
              }else{
                page.data[item][sectionIndex].value = value;
              }
              itemIndex = item + '[' + sectionIndex + '].inputPlaceHolder';
            }else{
              page.data[item][sectionIndex][dataSetName] = value;
              itemIndex = item + '[' + sectionIndex + '].initPickerText';
            }

            if(page.data.itemName=='farmdiary' && dataSetKey=='scheme'){
              var schemeContent,sectionSchemeIndex;
              sectionSchemeIndex = 'formSections['+sectionIndex+'].initPickerText';
              schemeContent = [
                value.materials,
                value.desc
              ];
              page.setData({
                [itemIndex]: value.name,
                [sectionSchemeIndex]:schemeContent
              });

            }else{
              page.setData({
                [itemIndex]: value
              });
            }
       
          break;
          case 'otherFormSections':
            if(data.itemName == 'produceplan'){
              for(var k in value){
                if(value.hasOwnProperty(k)){
                  itemIndex = item + '[' + sectionIndex + '].' + k;
                  page.setData({
                    [itemIndex]: value[k]
                  });
                }
              }
            }else{
              itemIndex = item + '[' + sectionIndex + '].' + dataSetKey;
              page.setData({
                [itemIndex]: value
              });
            }

            if (data.itemName == 'field') {
              page.data.dataset.varieties = page.data[item];
            }
            if(data.itemName == 'scheme'){
              page.data.dataset.materials = page.data[item];
            }
            if (data.itemName == 'produceplan') {
              page.data.dataset.predictions = page.data[item];
            }
          break;
          case 'totalProduction':
            page.data.totalProduction.amountUnit = value;
            page.setData({
              ['totalProduction.pickerText']:value
            });
            console.log(page.data.totalProduction);
          break;
        }
      });
      console.log(page.data.dataset, page.data.formSections);
    },
    //表单Page Alter Input值更新
    onAlterInputBlur: function (data, page) {
      var sectionIndex, dataSetKey, dataSetName, value, dataSetNames;
      sectionIndex = data.sectionIndex;
      dataSetKey = data.dataSetKey;
      dataSetName = data.dataSetName;
      value = data.value;
      dataSetNames = data.dataSetNames;
      dataSetNames.forEach(function (item, index) {
        switch (item) {
          case 'dataset':
            page.data[item][dataSetName] = value;
          break;
          case 'formSections':
            if (dataSetKey == dataSetName) {
              page.data[item][sectionIndex].value = value;
            } else {
              page.data[item][sectionIndex][dataSetName] = value;
            }
          break;
          case 'otherFormSections':
            page.data[item][sectionIndex][dataSetKey] = value;
            if (data.itemName == 'field') {
              page.data.dataset.varieties = page.data[item];
            }
            if (data.itemName == 'scheme') {
              page.data.dataset.materials = page.data[item];
            }
            break;
        }
      });
      console.log(page.data.dataset, page.data.formSections, page.data.otherFormSections);

    },
    //表单Page Alter picker值更新
    onAlterPickerValueChanged: function (data, page) {
      var sectionIndex, dataSetKey, dataSetName, value, dataSetNames, itemIndex;
      sectionIndex = data.sectionIndex;
      dataSetKey = data.dataSetKey;
      dataSetName = data.dataSetName;
      value = data.value;
      dataSetNames = data.dataSetNames;
      dataSetNames.forEach(function (item, index) {
        switch (item) {
          case 'dataset':
            page.data[item][dataSetName] = value;
          break;
          case 'formSections':
            if (dataSetKey == dataSetName) {
              page.data[item][sectionIndex].value = value;
              itemIndex = item + '[' + sectionIndex + '].inputPlaceHolder';
            } else {
              page.data[item][sectionIndex][dataSetName] = value;
              itemIndex = item + '[' + sectionIndex + '].'+dataSetName;
            }

            if (page.data.itemName == 'farmdiary' && dataSetKey == 'scheme') {
              var schemeContent, sectionSchemeIndex;
              sectionSchemeIndex = 'formSections[' + sectionIndex + '].initPlaceHolder';
              schemeContent = [
                value.materials,
                value.desc
              ];
              page.setData({
                [itemIndex]: value.name,
                [sectionSchemeIndex]: schemeContent
              });

            } else {
              page.setData({
                [itemIndex]: value
              });
            }
          break;
          case 'otherFormSections':
            itemIndex = item + '[' + sectionIndex + '].' + dataSetName;
            page.setData({
              [itemIndex]: value
            });
            if (data.itemName == 'field') {
              page.data.dataset.varieties = page.data[item];
            }
            if (data.itemName == 'scheme') {
              page.data.dataset.materials = page.data[item];
            }
            break;
          
        }
      });
      console.log(page.data.dataset, page.data.formSections);
    },
    //表单formSections字段有效性验证
    addFormEmptyValueValidation:function(keys,page){
      var dataset,isEmpty;
      isEmpty = false;
      dataset = page.data.dataset;
      for(var k in keys){
        if(keys.hasOwnProperty(k)){
          if(typeof keys[k] == 'string'){
            if(dataset[keys[k]].value.trim()==''){
              isEmpty = true;
              wx.showToast({
                title: '带*号为必填项',
                icon:'none'
              });
              return isEmpty;
            }
          }else{
            keys[k].forEach(function(item,index){
              if(item==k){
                if(dataset[item].value.trim()==''){
                  isEmpty = true;
                  wx.showToast({
                    title: '带*号为必填项',
                    icon: 'none'
                  });
                  return isEmpty;
                }
              }else{
                if(dataset[k][item].trim()==''){
                  isEmpty = true;
                  wx.showToast({
                    title: '带*号为必填项',
                    icon: 'none'
                  });
                  return isEmpty;
                }
              }
            });
          }
        }
      }

      return isEmpty;

    },
    //表单formSections字段有效性验证
    alterFormEmptyValueValidation: function (keys, page) {
      var dataset, isEmpty;
      isEmpty = false;
      dataset = page.data.dataset;
      keys.forEach(function(item,index){
        if(dataset[item]==''){
          isEmpty = true;
          wx.showToast({
            title: '带*号为必填项',
            icon:'none'
          })
          return isEmpty;
        }
      });

      return isEmpty;

    },
    //onCustomedFormSectionAddBtnTap
    onCustomedFormSectionAddBtnTap:function(e,page){
      var dataset,item;
      dataset = page.data.otherFormSections;
      item = page.data.customedFormSectionItem.tpl;
      dataset.push(item);
      page.setData({
        otherFormSections: dataset
      });
    }

  },
  /**
   * 属性：authority
   * 类型：Object
   * 说明：权限验证方法集合
   * **/
  authority:{
    //验证是否有增加项目权限
    isOperationAllowed: function (itemName, authorities) {
      if (!authorities.operation.basicinfo[itemName].add) {
        wx.showToast({
          title: '没有权限',
          icon: 'none'
        });
        return false;
      } else {
        return true;
      }
    },
    //验证是否有增加项目权限
    isAlterAllowed: function (item, action, authorities) {
      if (!authorities.operation.basicinfo[item].alter) {
        wx.showToast({
          title: '没有权限',
          icon: 'none'
        });
        return false;
      } else {
        return true;
      }
    },
  },
  date:{
    nowDateFormation: function() {
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

      nian = String(nian);
      if(yue>9){
        yue = String(yue);
      }else{
        yue = '0'+String(yue);
      }
      if(ri>9){
        ri = String(ri);
      }else{
        ri = '0'+String(ri);
      }
      date = nian+'-'+yue+'-'+ri;  
      day = week[today.getDay() - 1];
      return {
        date: date,
        day: day
      };
    }
  }
}

module.exports = {
  operation:operation
};