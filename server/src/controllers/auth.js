import errorHandler from "../middlewares/error-handler";
import User from "../models/user";
import { BadRequestError } from "../utils/error";
import bcrypt from "bcrypt";

class AuthController {

    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            new BadRequestError("Username and password are required");
        }

        const user = await User.findOne({ where: { username } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new BadRequestError("Invalid username or password");
        }

        
         res.json(newUser);

    }

    async register(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            new BadRequestError("Username and password are required");
        }

        try {
            // const existingUser = await User.findOne({ where: { username } });
            // if (existingUser) {
            //     throw new BadRequestError("Username already exists");
            // }
            const hashPassowrd = bcrypt.hashSync(password, 10);
            const newUser = await User.create({ username, hashPassowrd });
            res.json(newUser);

        } catch (error) {
            if (error?.original?.code === 'ER_DUP_ENTRY') {
                throw new BadRequestError("Username already exists");
            }

            throw errorHandler;
        }
    }

}

export default new AuthController();