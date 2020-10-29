const express = require('express');
const morgan = require('morgan');

const app = express();

// add your code here
var bodyParser = require('body-parser');

var items = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const router = express.Router();
app.use('/', router);

router
    .route('/')
    .get(function(req, res, next) {
        res.status(200).json({ "status": "ok" });
    })

router
    .route('/api/TodoItems')
    .get(function(req, res, next) {
        res.status(200).json(items);
    })
    .post(function(req, res, next) {
        res.status(201).json(req.body);
    });

router
    .route('/api/TodoItems/:id')
    .get(function(req, res, next) {
        res.status(200).json(items[req.params.id - 1]);
    })
    .delete(function(req, res, next) {
        let item = items[req.params.id]
        items.splice( req.params.id, 1 );
        res.status(200).json(item);
    })

module.exports = app;
