import express from 'express'
import path from 'path'
import fs from "fs";
import { Database } from './lib/database'
import { Generator } from './lib/generator'
import { Builder } from './lib/builder'
import bodyParser = require("body-parser");
const settings = require("./settings.json");

const app = express();
app.database = new Database();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.openSettings = {username: "username", key: ""};
app.userActivity = {};

app.get('/results', (req, res) => {
    res.render('results')
});

app.post('/results', (req, res) => {
    let data = app.database.get_results(req.body.username);
    res.json(data)
});

app.post('/users', (req, res) => {
    let data = app.database.get_users();
    res.json(data)
});

app.get('/', (req, res) => {
    let files = fs.readdirSync('./src/public/documents');
    let cases = fs.readdirSync('./src/public/scripts');
    res.render('index', { documentServer: settings['documentserver'],
        exampleUrl: settings['host_url'],
        files: files,
        cases: cases,
        userName: 'User name'});
});

app.get('/open', (req, res) => {
    const _params = { documentServer: settings['documentserver'],
        exampleUrl: settings['host_url'],
        files: '/Document1.docx',
        userName: 'User name'};
    if (req.query.key) {
        _params['key'] = req.query.key
    } else {
        _params['key'] = app.openSettings.key
    }
    if (req.query.username) {
        _params['username'] = req.query.username
    } else {
        _params['username'] = app.openSettings.username
    }
    res.render('open', _params);
});

app.get('/open/settings', (req, res) => {
    res.render('open-settings.ejs', { settings: app.openSettings});
});

app.post('/open/settings', (req, res) => {
    app.openSettings = req.body;
    res.json({error: 0});
});

app.post('/open/activity', (req, res) => {
    let data = Date.now();
    app.userActivity[req.body.username] = data;
    res.json({username: req.body.username, time: data});
});

app.post('/open/get_activity', (req, res) => {
    res.json(app.userActivity);
});
app.post('/callback', (req, res) => {
    res.json({error: 0});
});

app.post('/add_result', (req, res) => {
    app.database.add_result(req.body);
    res.json({error: 0});
});

app.post('/generate:counter', (req, res) => {
    const filename = Generator.generate_document(req.body);
    Builder.build(filename).then(response => {
        res.json({fileurl: Object.values(response['urls'])[0]});
    })
});

app.listen(8000, () => console.log(`Example app listening on port ${8000}!`));