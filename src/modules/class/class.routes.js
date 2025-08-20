import { Router } from "express";
import * as classController from "./class.controller.js";
import validBodyRequest from "../../common/middleware/valid-body.middleware.js";
import { createClassSchema, updateClassSchema } from "./class.schema.js";
const routerClass = Router()

routerClass.post("/",validBodyRequest(createClassSchema), classController.createClass);
routerClass.get("/", classController.getAllClass)

export default routerClass