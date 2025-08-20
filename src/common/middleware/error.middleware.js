const errorHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err); // nếu đã gửi rồi, chuyển tiếp lỗi
	}
	res.status(err.statusCode || 500).json({
		success: false,
		statusCode: err.statusCode || 500,
		message: err.message || "Internal Server Error",
	});
};

export default errorHandler;