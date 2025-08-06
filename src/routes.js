import { Router } from "express";
import routeSubject from "./modules/subject/subject.routes.js";
import routerAttendance from "./modules/attendance/attendance.routes.js";
import routerAuth from "./modules/auth/auth.routes.js";
import routerClass from "./modules/class/class.routes.js";
import routerMajor from "./modules/major/major.routes.js";
import routerSession from "./modules/session/session.routes.js";
import routerUser from "./modules/user/user.routes.js";
const router = Router()

router.use("/auth", routerAuth);
router.use("/subject", routeSubject);
router.use("/attendance", routerAttendance);
router.use("/class", routerClass);
router.use("/major", routerMajor);
router.use("/session", routerSession);
router.use("/user", routerUser);



export default router