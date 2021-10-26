const express = require('express');
const helmet = require('helmet');
const path = require('path');

const router = express.Router();

const app = express();
const PORT = 3000;

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'", 'ya-praktikum.tech', 'wss://ya-praktikum.tech'],
      imgSrc: ["'self", 'data:', 'ya-praktikum.tech'],
    },
  }),
);

app.use(express.static('./dist'));

router.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.use('/', router);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
