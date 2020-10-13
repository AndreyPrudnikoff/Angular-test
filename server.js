const express = require('express');
const app = express();
app.use(express.static('./dist/calendar'));
app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/calendar/index.html');
});
app.listen(process.env.PORT || 8080);

