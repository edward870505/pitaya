// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {

  var collectionName,result,keys;

  collectionName = event.collectionName;
  keys = event.keys;

  if(keys==undefined){

    result = await db.collection(collectionName).get();
    
  }else{

    if (collectionName == 'produceplans') {

      result = await db.collection(collectionName).where(keys).orderBy('finishedDatePlan', 'asc').get();

    } else if ( collectionName == 'farmingdiary'){

      result = await db.collection(collectionName).where(keys).orderBy('finishedDatePlan', 'asc').get();

    }else {

      result = await db.collection(collectionName).where(keys).get();

    }

  }

  return result;
  
}