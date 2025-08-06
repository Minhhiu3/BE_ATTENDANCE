import { Router } from "express";
import * as subjectController from "./subject.controller.js";
import validBodyRequest from "../../common/middleware/valid-body.middleware.js";
import subjectSchema from "./subject.schema.js";
const routeSubject = Router()

routeSubject.post("/", validBodyRequest(subjectSchema), subjectController.createSubject);
routeSubject.get("/", subjectController.getAllSubject);
routeSubject.get("/:id", subjectController.getSubjectById);
routeSubject.put("/:id", validBodyRequest(subjectSchema), subjectController.updateSubject);
routeSubject.delete("/:id", subjectController.deleteSubject);
routeSubject.patch("/:id/restore", subjectController.restoreSubject);
routeSubject.patch("/:id/soft-delete", subjectController.softDeleteSubject);

export default routeSubject;