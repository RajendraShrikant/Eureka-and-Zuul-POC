Author: Rajendra

Eureka and Zuul Server with Node Microservices Steps:

We will use three microservices

eureka-service
Spring boot application for registering services using Netflix Eureka

routing-service
Spring boot application used as a gateway or proxy for internal microservices using Netflix Zuul

NodeMicro-service's
NodeJs application as microservice which used to register in eureka-service

Step1: Run eureka-service and routing-service
    java -jar eureka-service-0.0.1-SNAPSHOT.jar
    java -jar routing-service-0.0.1-SNAPSHOT.jar

Verify Eureka Service- Navigate to the Eureka application at http://localhost:8761

Step2: Register the Node.js application in Eureka
    create a eureka-helper.js file in every micro-services
    Dependency Npm (npm install eureka-js-client)
    Insert following JavaScript code in the eureka-helper.js file

    @@@@@-----Code--------
    const Eureka = require('eureka-js-client').Eureka;
    const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '127.0.0.1');
    const eurekaPort = 8761;
    const hostName = (process.env.HOSTNAME || 'localhost')
    const ipAddr = '172.0.0.1';

    exports.registerWithEureka = function(appName, PORT) {
        const client = new Eureka({
        instance: {
        app: appName,
        hostName: hostName,
        ipAddr: ipAddr,
        port: {
            '$': PORT,
            '@enabled': 'true',
        },
        vipAddress: appName,
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        },
        //retry 10 time for 3 minute 20 seconds.
        eureka: {
        host: eurekaHost,
        port: eurekaPort,
        servicePath: '/eureka/apps/',
        maxRetries: 10,
        requestRetryDelay: 2000,
        },
    })

    client.logger.level('debug')

    client.start( error => {
        console.log(error || "user service registered")
    });



    function exitHandler(options, exitCode) {
        if (options.cleanup) {
        }
        if (exitCode || exitCode === 0) console.log(exitCode);
        if (options.exit) {
            client.stop();
        }
    }

    client.on('deregistered', () => {
        process.exit();
        console.log('after deregistered');
    })

    client.on('started', () => {
    console.log("eureka host  " + eurekaHost);
    })

    process.on('SIGINT', exitHandler.bind(null, {exit:true}));
    };
    @@@@@-----End--------

Step3: Add the below snippet in every node Micro-service app.js
    const eurekaHelper = require('./eureka-helper');
    eurekaHelper.registerWithEureka('Jwt-service', PORT);

Step4: Now run the Node-microServices
    http://localhost:8050/service_name/