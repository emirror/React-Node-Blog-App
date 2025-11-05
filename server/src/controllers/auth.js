import errorHandler from "../middlewares/error-handler.js";
import User from "../models/user.js";
import { BadRequestError } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {

    async login(req, res, next) {
        try {
            const { username, password } = req.body || {};
            if (!username || !password) {
                return next(new BadRequestError("Username and password are required"));
            }

            const user = await User.scope("withPassword").findOne({ where: { username } });

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return next(new BadRequestError("Invalid username or password"));
            }

            user.setDataValue("password", undefined);

            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1000s",
                }
            );

            return res.json({
                error: false,
                ...user.dataValues,
                token,
            });

        } catch (err) {
            return next(err);
        }
    }

    user(req, res) {
        return res.json(req.user);
    }

    async register(req, res, next) {
        try {
            const { username, password, role } = req.body || {};

            if (!username || !password) {
                return next(new BadRequestError('username and password are required'));
            }

            const hashPassword = bcrypt.hashSync(password, 10);
            const newUser = await User.create({ username, password: hashPassword, role: role || 'ADMIN' });
            newUser.setDataValue("password", undefined);
            return res.json({
                error: false,
                ...newUser.dataValues,
            });

        } catch (error) {
            if (error?.original?.code === 'ER_DUP_ENTRY') {
                return next(new BadRequestError("Username already exists"));
            }
            return next(error);
        }
    }

    logout(req, res, next) {
        req.session.destroy((error) => {
            if (!error) {
                return res.redirect(req.headers.referer || '/');
            } else {
                return next(error);
            }
        });
    }

}

export default new AuthController();