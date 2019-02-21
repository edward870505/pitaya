// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  var collectionName,data,docid,result;
  collectionName = event.collectionName;
  docid = event.docid;
  data = event.data;

  result = await db.collection(collectionName).doc(docid).update({
    data:data
  });

  return result;
}