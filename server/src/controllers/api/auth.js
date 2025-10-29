
// import User from "../../models/user.mjs";
import { BadRequestError } from "../../utils/error";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("Username and Password are required!");
    }

    const user = await User.scope("withPassword").findOne({
      where: { username },
    });

    if (!user) {
      throw new BadRequestError("Credential Error");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError("Credential Error");
    }

    user.setDataValue("password", undefined);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    log({ message: "user:login", metadata: { user } });

    res.json({
      ...user.dataValues,
      accessToken,
      refreshToken,
    });
  }

  user(req, res) {
    return res.json(req.user);
  }

  async getAccessToken(req, res, next) {
    const { refreshToken } = req.body;

    jwt.verify(refreshToken, process.env.JWT_SECRET, async (error, payload) => {
      if (error) {
        next(new BadRequestError(error));
      } else {
        const user = await User.findByPk(payload.id);

        const accessToken = generateAccessToken(user);
        res.json({
          accessToken,
        });
      }
    });
  }
}

export default new AuthController();