import { ROLE_HIERARCHY } from "../config/roles.js";
import { ForbiddenError, UnauthorizedError } from "../utils/error.js";

export default function acl(roleName) {
  return (req, res, next) => {
              console.log(`${req.method} ${req.originalUrl} user=${JSON.stringify(req.user)}`)

    
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const { role } = req.user;

    if (role === roleName || ROLE_HIERARCHY[role].includes(roleName)) {
      return next();
    }

    throw new ForbiddenError();
  };
}
