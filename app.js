const express = require('express');
const session = require('express-session');
const MongoDBSession = require("connect-mongodb-session")(session);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());

const store = new MongoDBSession({
  uri: "mongodb://localhost:27017/sessions",
  collection: 'mySessions'
})


app.use(session({
  name: 'LOGIN',
  secret: 'artemon228',
  resave: false,
  unset: 'destroy',
  cookie: {
    token: session.token,
    userId: session.userId,
  },
  saveUninitialized: false,
  store: store
}))

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))


const PORT = process.env.PORT;

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/sessions', {
      useNewUrlParser: true,
      useUnifiedTopology: true,

      // useCreateIndex: true
    })



    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

  } catch (error) {
    console.log('Server Error', error.message);
    process.exit(1)
  }
}

start();



// app.get('/', (req, res) => {
//   // req.session.isAuth = true;
//   console.log(req.session);
//   // console.log(req.session.id);

//   res.send("Hello Sessions Tut")
// })

app.use('/api/auth', require('./routes/auth.routes')); // middleware
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" })
})


// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static(path.join(__dirname, 'client', 'build')))

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }




// db.users.insertOne(
//   {
//     _id: 2,
//     "name": "Jack",
//     "email": "admin@mail.ru",
//     "age": 41,
//     "hasCar": false,
//     "favColors": ["Black"],
//     "child": {
//       "name": "Jack",
//       "age": 5
//     }
//   }
// )
