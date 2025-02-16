const jwt = require("jsonwebtoken");

const adminAuthMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

    // Ensure user is  admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = adminAuthMiddleware;
