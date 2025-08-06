import swaggerAutogen from "swagger-autogen";
import { HOST, PORT } from "./enviroment.js";
swaggerAutogen();

const outputFile = "../../common/configs/swagger-output.json";
const endpointsFiles = ["../../routes.js"]; // chỉnh sửa theo đường dẫn đến file chứa các endpoint của bạn 


const swaggerConfig = {
    info: {
        title: "Backend API Dự án cá nhân Ecommerce K01-Code Farm by MinHiu3",
        description: "API Dự án cá nhân By MinHiu3",
        version: "1.0.0",
    },
    host: `${HOST}:${PORT}`,
    basePath: "/api",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],

    securityDefinitions: {
        BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        },
    },
};

swaggerAutogen()(outputFile, endpointsFiles, swaggerConfig);