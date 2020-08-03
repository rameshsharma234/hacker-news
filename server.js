const express = require('express')
const app = express()
app.use(express.static('./dist/hacker-news'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/hacker-news/'}
  );
  });

  app.listen(process.env.PORT || 8080);