import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/error.js";

export default function auth(req, res, next) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) {
    if (req.session && req.session.user) {
      req.user = req.session.user;
      return next();
    }
    return next(new UnauthorizedError('Missing Authorization header'));
  }

  const parts = header.split(' ');
  const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : header;

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return next(new UnauthorizedError('Invalid or expired token'));
    }
    req.user = payload;
    return next();
  });
}
