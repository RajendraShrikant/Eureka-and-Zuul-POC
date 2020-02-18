module.exports = {
    APPP_CONFIG: {
        PORT: process.env.APP_PORT || 3030,
        HOST: process.env.APP_HOST || "localhost",
        SECURITY: {
            ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM || "aes-128-cbc",
            ENCRYPTION_KEY: process.env.SECURITY_ENCRYPTION_KEY || "encryptionSecretKey",
            JWT_SECRET: process.env.JWT_SECRET || "test_Poc_123"
        }
    },
    UTILS_CONFIG: {
        LIMIT: process.env.UTILS_CONFIG || 5
    },
    MONGO_CONFIG: {
        DB_NAME: process.env.DB_NAME || "test_poc",
        DB_HOST: process.env.DB_HOST || "localhost",
        DB_USER: process.env.DB_USER || "default",
        DB_PASS: process.env.DB_PASS || "default123",
        DB_PORT: process.env.DB_PORT || "27017",
        OPTIONS: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        DB_COLLECTIONS: {
            USERS_COLLECTION_NAME: process.env.USERS_COLLECTION_NAME || "users"
        }
    },
    SWAGGER_CONFIG: {
        SWAGGER: process.env.SWAGGER_SWAGGER || "2.0",
        INFO: {
            VERSION: process.env.SWAGGER_INFO_VERSION || "1.0.0",
            TITLE: process.env.SWAGGER_INFO_TITLE || "POC on REST",
            DESCRIPTION: process.env.SWAGGER_INFO_DESCRIPTION || "A small POC on REST services using nodejs"
        },
        HOST: `${process.env.APP_HOST}:${process.env.APP_PORT}` || "localhost:3030",
        BASEPATH: process.env.SWAGGER_BASEPATH || "/api",
        SCHEMES: process.env.SWAGGER_SCHEMES_HTTP && process.env.SWAGGER_SCHEMES_HTTPS ? [process.env.SWAGGER_SCHEMES_HTTP, process.env.SWAGGER_SCHEMES_HTTPS] : ["http", "https"],
        CONSUMES: process.env.SWAGGER_CONSUMES ? [process.env.SWAGGER_CONSUMES] : ["application/json"],
        PRODUCES: process.env.SWAGGER_PRODUCES ? [process.env.SWAGGER_PRODUCES] : ["application/json"],
    },
    CLIENT_SERVICE_CONFIG: {
        JWT_SERVICE: process.env.JWT_SERVICE
    }
}