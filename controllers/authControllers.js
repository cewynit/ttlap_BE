const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
const authController = {
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30s" }
        );
    },
    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },
    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).json('Wrong username');
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                res.status(404).json("Wrong password");
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    path: "/",
                    secure: false,
                    sameSite: "strict",
                })
                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    requesRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshToken.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshToken = refreshToken.filter((token) => token !== refreshTokens);
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshToken.push(newRefreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                path: "/",
                secure: false,
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken });
        })
    },
//LOG OUT
    userLogout :async(req,res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out")
    }
};

module.exports = authController;

