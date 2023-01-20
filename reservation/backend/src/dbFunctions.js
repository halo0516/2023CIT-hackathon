// this is a node app, we must use commonJS modules/ require

// import the mongodb driver
const { MongoClient } = require('mongodb');

// import ObjectID
const { ObjectId } = require('mongodb');

let MongoConnection;

// the mongodb server URL
const dbURL = 'mongodb+srv://halo0516:9kPLzTVR0XIKDRCQ@cluster0.gl0vblw.mongodb.net/?retryWrites=true&w=majority';

// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    const con = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db("registrationdb");
    // check that we are connected to the db
    console.log(`connected to db: ${con.databaseName}`);
    return con;
  } catch (err) {
    console.log(err.message);
  }
};

const login = async (db, username, pwd) => {
  try {
    const users = db.collection('user');
    const query = { username, pwd };
    const cursor = await users.findOne(query);
    return cursor;
  } catch (error) {
    throw new Error('Error while login');
  }
};

const doclogin = async (db, username, pwd) => {
  try {
    const users = db.collection('doc_account');
    const query = { username, pwd };
    const cursor = await users.findOne(query);
    return cursor;
  } catch (error) {
    throw new Error('Error while login');
  }
};

const register = async (db,newUser) => {
  try {
    const users = db.collection('user');
    console.log(newUser);
    const result = await users.insertOne(newUser);
    console.log(result);
    return result.insertedId.toString();
  } catch (err) {
    throw new Error('Error in register the user');
  }
};

const getUsers = async (db) => {
  let results;
  try {
    results = await db.collection('user').find({}).toArray();
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
  return results;
};



const addReserve_12 = async(db, id, docid) => {
  try {
    const result = await db.collection('doc_account').updateOne(
      { Docid: docid },
      { $set: { twelve: id } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const unReserve_12 = async(db, docid) => {
  try {
    const result = await db.collection('doc_account').updateOne(
      { Docid: docid },
      { $set: { twelve: "" } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const addReserve_13 = async(db, id, docid) => {
  try {
    const result = await db.collection('doc_account').updateOne(
      { Docid: docid },
      { $set: { thirteen: id } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const unReserve_13 = async(db, docid) => {
  try {
    const result = await db.collection('doc_account').updateOne(
      { Docid: docid },
      { $set: { thirteen: "" } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const addReserve_14 = async(db, id, docid) => {
  try {
    const result = await db.collection('doc_account').updateOne(
      { Docid: docid },
      { $set: { fourteen: id } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const unReserve_14 = async(db, docid) => {
  try {
    const result = await db.collection('doc_account').updateOne(
      { Docid: docid },
      { $set: { fourteen: "" } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const addReserve_15 = async(db, id, docid) => {
  try {
    const result = await db.collection('doc_account').updateOne(
      { Docid: docid },
      { $set: { fifteen: id } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const unReserve_15 = async(db, docid) => {
  try {
    const result = await db.collection('doc_account').updateOne(
      { Docid: docid },
      { $set: { fifteen: "" } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const addReserve_16 = async(db, id, docid) => {
  try {
    const result = await db.collection('doc_account').updateOne(
      { Docid: docid },
      { $set: { sixteen: id } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const unReserve_16 = async(db, docid) => {
  try {
    const result = await db.collection('doc_account').updateOne(
      { Docid: docid },
      { $set: { sixteen: "" } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getAllDoc = async (db) => {
  try {
    const result = await db.collection('doc_account').find({}).toArray();
    // print the results
    console.log(`Prof: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getUserbyID = async (db, id) => {
  try{
    const result = await db.collection('user').findOne({_id:ObjectId(id)});
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  } 
}



// export the functions
module.exports = {
  connect, register, getUsers, login, doclogin, getAllDoc, addReserve_12, unReserve_12, addReserve_13, unReserve_13, 
  addReserve_14, unReserve_14, addReserve_15, unReserve_15, addReserve_16, unReserve_16, getUserbyID 
};
