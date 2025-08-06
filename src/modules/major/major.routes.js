import { Router } from "express";
import * as majorController from "./major.controller.js";
import { majorSchema } from "./major.schema.js";
import validBodyRequest from "../../common/middleware/valid-body.middleware.js";
const routerMajor = Router();

routerMajor.post("/", validBodyRequest(majorSchema), majorController.createMajor);
routerMajor.get("/", majorController.getAllMajors);
routerMajor.get("/:id", majorController.getMajorById);
routerMajor.put("/:id", validBodyRequest(majorSchema), majorController.updateMajor);
routerMajor.delete("/:id", majorController.deleteMajor);
routerMajor.patch("/:id/restore", majorController.restoreMajor);
routerMajor.patch("/:id/soft-delete", majorController.softDeleteMajor);

export default routerMajor;