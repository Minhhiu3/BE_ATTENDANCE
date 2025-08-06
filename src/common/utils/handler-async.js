import {createError} from "./create-error.js";

const handleAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(
        createError(500, error.message || "da xay ra loi~")
    ))
}

export default handleAsync;