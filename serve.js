const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function serve(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// eslint-disable-next-line no-console
console.log('process port ', process.env.PORT);
const port = process.env.PORT || 3000;

// eslint-disable-next-line no-console
console.log(`Started frontend on port ${port}`);
app.listen(port);
