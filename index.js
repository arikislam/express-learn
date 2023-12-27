const express = require('express');
const bodyParser = require('body-parser');
const Book = require('./models/books');
const connectDB = require('./utls/db-connect');

const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bookRouter = require('./routes/books')(Book);

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
