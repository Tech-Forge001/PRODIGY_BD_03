const jwt = require("jsonwebtoken");

const getTokenFromHeader = (req) => {
  const h = req.headers.authorization || "";
  const [type, token] = h.split(" ");
  return type === "Bearer" ? token : null;
};

exports.requireAuth = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ error: "No token provided" });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

exports.permitRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden: insufficient role" });
  }
  next();
};

exports.isOwnerOrAdmin = (req, res, next) => {
  if (req.user.role === "admin" || req.user.id === req.params.id) return next();
  return res.status(403).json({ error: "Forbidden: not owner/admin" });
};

// Small helper to sign tokens
exports.signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "1h" });
