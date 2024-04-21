const express = require('express');
const app = express();
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const {syncDatabase} = require("./connection");
const passportMiddleware = require('./middlewares/authmiddleware');
const cors = require('cors');

app.use(cors());

//middleware setups
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
syncDatabase().then(console.log('Table Created'));


// auth router setup
// app.use('/auth', authRouter);

app.use(passportMiddleware);

app.use('/user',userRouter);


//listening to port of sever for any changes.
app.listen(process.env.PORT, () => {
  console.log(`Server is listening to ${process.env.PORT}`);
});
