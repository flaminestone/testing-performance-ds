var express = require('express');
var router = express.Router();
const fs = require('fs');


router.get('/', function(req, res, next) {
  let files = fs.readdirSync('./public/documents');
  console.log(files);
  res.render('index', { documentServer: 'http://192.168.3.195:8000',
                        exampleUrl: 'http://192.168.3.195:3000',
                        files: files,
                        userName: 'User name'});
});

router.post('/callback:filename', function(req, res, next) {
  res.json({ error: 0 });
});

router.post('/result', function(req, res, next) {
  console.log(req.body.username);
  console.log(req.body.time);
  console.log(req.body.filename);

    db.get('posts')
        .push({ username: req.body.username, time: req.body.time, filename: req.body.filename})
        .write();
  res.json({});
});


module.exports = router;
