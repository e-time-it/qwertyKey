var express = require('express');
var router = express.Router();

/*GET invite LIST*/
router.get('/', function(req, res, next) {
    res.status(404).send('not found');
});

/*GET invite READ*/
router.get('/:id', function(req, res, next) {
    res.status(404).send('not found');
});

/*POST invite CREATE*/
router.post('/', function(req, res, next) {
    res.status(404).send('not found');
});

/*PUT invite UPDATE*/
router.put('/:id', function(req, res, next) {
    res.status(404).send('not found');
});

/*DELETE invite DELETE*/
router.delete('/:id', function(req, res, next) {
    res.status(404).send('not found');
});

module.exports = router;