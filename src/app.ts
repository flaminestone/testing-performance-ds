import express from 'express'
import path from 'path'
import fs from "fs";
import { Database } from './lib/database'
import bodyParser = require("body-parser");

const app = express();
app.database = new Database();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/results', (req, res) => {
    res.render('results')
});

app.post('/results', (req, res) => {
    let data = app.database.get_results({username: req.body.username});
    console.log(data)
    console.log(data.typedef)
    res.json(data)
});

app.get('/', (req, res) => {
    let files = fs.readdirSync('./src/public/documents');
    res.render('index', { documentServer: 'http://192.168.3.195:3000',
        exampleUrl: 'http://192.168.3.195:8000',
        files: files,
        userName: 'User name'});
});

app.post('/callback:filename', (req, res) => {
    res.json({error: 0});
});

app.post('/add_result', (req, res) => {
    app.database.add_result({username: req.body.username, time: req.body.time, filename: req.body.filename});
    res.json({error: 0});
});

app.listen(8000, () => console.log(`Example app listening on port ${8000}!`));