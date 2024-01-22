const jwt = require("jsonwebtoken");

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.header.token;
        if (token) {
            const accessToken = token.split("")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("token is not vaild");
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("U're not authenticated");
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id == req.param.id || req.user.admin) {
                next();
            } else {
                res.status(403).json("u're not allowed to delete other");
            }
        });
    },
};

module.exports = middlewareController;