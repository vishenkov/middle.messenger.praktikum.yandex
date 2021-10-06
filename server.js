const express = require('express');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

app.use(helmet());
app.use(express.static('./dist'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
