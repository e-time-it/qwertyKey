var express = require('express');
var router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'QwertyKey',
        version: '1.0.0',
        description: 'API Docs',
    },
    basePath: '/api/',
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js','./models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({title: 'qwertyKey', version: '0.1'});
});

/* Swagger API Docs */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
