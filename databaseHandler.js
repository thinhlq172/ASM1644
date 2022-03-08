const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = 'mongodb+srv://thinhlq123:abc123456789@cluster0.lug3n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const DATABASE_NAME = 'Thinhlq'

async function updateDocument(id, updateValues,collectionName){
    const dbo = await getDatabase();
    await dbo.collection(collectionName).updateOne({_id:ObjectId(id)},updateValues)
}

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function getDocumentById(id,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
    return result;
}

//vi du obj la thong tin van insert, collection: ten cua bang can insert-vd Products
async function insertToDB(obj,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).insertOne(obj)
    console.log("Gia tri id moi duoc insert la: ", result.insertedId.toHexString());
}

async function getAll(collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).find({}).toArray()
    return result
}

async function deleteObject(id,collectionName){
    const dbo = await getDatabase()
    await dbo.collection(collectionName).deleteOne({_id:ObjectId(id)})
}

module.exports = {insertToDB,getAll,deleteObject,getDocumentById,updateDocument}