const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App server started at port ${port}`);
});
