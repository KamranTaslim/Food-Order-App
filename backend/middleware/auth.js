import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const token_decode = jwt.verify(token, "random#secret");
    req.body.userId = token_decode.id;
    next();
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error" });
  }
}
