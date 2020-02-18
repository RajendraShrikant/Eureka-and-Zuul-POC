require('dotenv').config(); // to take config values from environment variables
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const config = require("./configurations/config");
var swaggerDocument = require("./swaggerConfig/swagger");
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const eurekaHelper = require('./eureka-helper');
const app = express();

(async () => {

    app.use(bodyParser.json()); // to respond back in json format

    /* Default api */
    app.get('/', (req, res) => {
        let todaysDate = new Date();
        console.log(`${req.headers.host} Hit GET / API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
        res.send(`<h2> Welcome home! </h2>`);
    });

    // console.log();
    // console.log(JSON.stringify(swaggerDocument,null,2));
    
    /* Swagger documentation implementation with swagger UI available host:port/api-docs */
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Injecting all API's via express router
    app.use(require('./controllers'));
    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);
      
        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
      
        cluster.on('exit', (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} died`);
        });
      } else {
        app.listen(config.APPP_CONFIG.PORT, () => {
            console.log(`APP running on PORT : ${config.APPP_CONFIG.PORT}`);
        });
        console.log(`Worker ${process.pid} started`);
        eurekaHelper.registerWithEureka('Jwt-service', config.APPP_CONFIG.PORT);
      }


})();