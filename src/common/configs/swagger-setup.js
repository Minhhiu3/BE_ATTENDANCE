import swaggerAutogen from "swagger-autogen";
import { HOST, PORT } from "../configs/enviroment.js";
swaggerAutogen();

const outputFile = "./src/common/configs/swagger-output.json";
const endpointsFiles = ["../../routes.js"];

const swaggerConfig = {
  info: {
    title: "Backend API by hieu3",
    description: "API docs attendance",
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