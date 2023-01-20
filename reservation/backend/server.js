// Express app file

// (1) import express
// backend ==> require
const express = require('express');

// (2) import and enable cors
// (cross-origin resource sharing)
const cors = require('cors');

// (3) create an instanece of our express app
const webapp = express();

//import JWT
const jwt = require('jsonwebtoken');

// secret key
const secret = 'thi_iSz_a_Very_$trong&_$ecret_queYZ';

// (4) enable cors
webapp.use(cors());

// (5) define the port
const port = 8080;

// (6) configure express to parse bodies
webapp.use(express.urlencoded({ extended: true }));
webapp.use(express.json());

// (7) import the db interactions module
const dbLib = require('./src/dbFunctions');

// (8) declare a db reference variable
let db;

// start the server and connect to the DB
webapp.listen(port, async () => {
  db = await dbLib.connect();
  console.log(`Server running on port: ${port}`);
});

// root endpoint / route
webapp.get('/', (req, resp) => {
  resp.json({ message: 'welcome to our backend!!!' });
});

//login
webapp.get('/account/username=:user&password=:pwd', async (req, res) => {
  try {
    const results = await dbLib.login(db, req.params.user, req.params.pwd);

    if (results === null) {
      res.status(401).json({ message: 'wrong password' });
      return;
    }

    const jwtoken = jwt.sign({ username: results._id.toString() }, secret, {
      expiresIn: '24h'
    });
    res.status(201).json({
      data: { id: results._id.toString(), ...results },
      token: jwtoken
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'There is an login error' });
  }
});

//doclogin
webapp.get('/docaccount/username=:user&password=:pwd', async (req, res) => {
  try {
    const results = await dbLib.doclogin(db, req.params.user, req.params.pwd);

    if (results === null) {
      res.status(401).json({ message: 'wrong password' });
      return;
    }

    const jwtoken = jwt.sign({ username: results._id.toString() }, secret, {
      expiresIn: '24h'
    });
    res.status(201).json({
      data: { id: results._id.toString(), ...results },
      token: jwtoken
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'There is an login error' });
  }
});

// register
webapp.post('/users', async (req, res) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.pwd ||
    !req.body.firstname ||
    !req.body.lastname
  ) {
    res.status(404).json({ message: 'missing information in registration' });
    return;
  }
  const newUser = {
    username: req.body.username,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    pwd: req.body.pwd
  };
  try {
    const result = await dbLib.register(db,newUser);
    res.status(201).json({
      user: { id: result, ...newUser }
    });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// implement the GET /users endpoint
webapp.get('/users', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbLib.getUsers(db);
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'resource not found' });
  }
});




webapp.get('/doc_account', async (req, res) => {
  try {
    const results = await dbLib.getAllDoc(db);
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});


webapp.post('/reserve12/:docid', async (req, res) => {
  // parse the body of the request
  if (!req.body.id) {
    res.status(404).json({ message: 'missing id' });
    return;
  }
  try {
    const result = await dbLib.addReserve_12(db, req.body.id,req.params.docid);
    // send the response with the appropriate status code
    res.status(201).json({});
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

webapp.post('/unreserve12/:docid', async (req, res) => {
  try {
    const result = await dbLib.unReserve_12(db,req.params.docid);
    // send the response with the appropriate status code
    res.status(201).json({});
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});


webapp.post('/reserve13/:docid', async (req, res) => {
  // parse the body of the request
  if (!req.body.id) {
    res.status(404).json({ message: 'missing id' });
    return;
  }
  try {
    const result = await dbLib.addReserve_13(db, req.body.id,req.params.docid);
    // send the response with the appropriate status code
    res.status(201).json({});
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

webapp.post('/unreserve13/:docid', async (req, res) => {
  try {
    const result = await dbLib.unReserve_13(db,req.params.docid);
    // send the response with the appropriate status code
    res.status(201).json({});
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

webapp.post('/reserve14/:docid', async (req, res) => {
  // parse the body of the request
  if (!req.body.id) {
    res.status(404).json({ message: 'missing id' });
    return;
  }
  try {
    const result = await dbLib.addReserve_14(db, req.body.id,req.params.docid);
    // send the response with the appropriate status code
    res.status(201).json({});
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

webapp.post('/unreserve14/:docid', async (req, res) => {
  try {
    const result = await dbLib.unReserve_14(db,req.params.docid);
    // send the response with the appropriate status code
    res.status(201).json({});
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

webapp.post('/reserve15/:docid', async (req, res) => {
  // parse the body of the request
  if (!req.body.id) {
    res.status(404).json({ message: 'missing id' });
    return;
  }
  try {
    const result = await dbLib.addReserve_15(db, req.body.id,req.params.docid);
    // send the response with the appropriate status code
    res.status(201).json({});
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

webapp.post('/unreserve15/:docid', async (req, res) => {
  try {
    const result = await dbLib.unReserve_15(db,req.params.docid);
    // send the response with the appropriate status code
    res.status(201).json({});
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

webapp.post('/reserve16/:docid', async (req, res) => {
  // parse the body of the request
  if (!req.body.id) {
    res.status(404).json({ message: 'missing id' });
    return;
  }
  try {
    const result = await dbLib.addReserve_16(db, req.body.id,req.params.docid);
    // send the response with the appropriate status code
    res.status(201).json({});
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

webapp.post('/unreserve16/:docid', async (req, res) => {
  try {
    const result = await dbLib.unReserve_16(db,req.params.docid);
    // send the response with the appropriate status code
    res.status(201).json({});
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

webapp.get('/user/:id', async(req, res) => {
  try{
    const result = await dbLib.getUserbyID(db, req.params.id);
    console.log(result);
    res.status(201).json({data: result});
  }catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
})










// implement the GET /student/:id endpoint
webapp.get('/student/:id', async (req, res) => {
  console.log('READ a students');
  try {
    // get the data from the db
    const results = await dbLib.getAStudent(db, req.params.id);
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});



// implement the DELETE /student/id endpoint
webapp.delete('/student/:id', async (req, res) => {
  console.log('DELETE a student');
  try {
    const result = await dbLib.deleteStudent(db, req.params.id);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// implement the PUT /student/id endpoint
webapp.put('/student/:id', async (req, res) => {
  console.log('UPDATE a student');
  // parse the body of the request
  if (!req.body.major) {
    res.status(404).json({ message: 'missing major' });
    return;
  }
  try {
    const result = await dbLib.updateStudent(db, req.params.id, req.body.major);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// catch all endpoint
webapp.use((req, resp) => {
  resp.status(404).json({ error: 'invalid endpoint' });
});
