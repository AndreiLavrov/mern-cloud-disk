const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');
const path = require('path');

const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const profileRouter = require('./routes/profile.routes');
const corsMiddleware = require('./middleware/cors.middleware');
const filePathMiddleware = require('./middleware/filepath.middleware');

const app = express();
const PORT = process.env.PORT || config.get('serverPort');

app.use(express.static('static'));
app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(filePathMiddleware(path.resolve(__dirname, 'files')));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);
app.use('/api/profile', profileRouter);

const start = async () => {
  try {
    mongoose.connect(config.get('dbUrl'));

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
