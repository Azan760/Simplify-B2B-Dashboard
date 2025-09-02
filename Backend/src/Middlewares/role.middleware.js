import {ApiError} from '../Utils/ApiError.js';

// Usage: roleMiddleware(['Admin', 'Sales Manager'])
export function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    const user = req.user; // req.user should be set by auth middleware
    if (!user || !allowedRoles.includes(user.userType)) {
      return next(new ApiError(403, 'Access denied: insufficient permissions'));
    }
    next();
  };
} 