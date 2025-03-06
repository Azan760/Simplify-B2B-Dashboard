const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => {
                const statusCode = error.statusCode || 500;
                const message = error.message || "Something went wrong";
                next(error);

                console.log(message);

                res.status(statusCode).json({ success: false, message });
            });
    };
};

export { asyncHandler };
