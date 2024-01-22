const User = require("../models/User.js");

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json({
                "data": user
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    putUser: async (req, res) => {
        try {
            const user = await User.updateOne({
                _id: req.params.id
            }, req.body);
            if (user) {
                res.status(200).json("put successfully");
            }
            else {
                res.status(500).json("put err");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    postUser: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json("post successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.deleteOne({
                _id: req.params.id
            });
            res.status(200).json("Delete successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
module.exports = userController;
