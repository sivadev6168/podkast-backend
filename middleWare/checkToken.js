import jwt from "jsonwebtoken";

const CheckToken = (role) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      //console.log(token);
      if (!token) {
        return res.status(403).json({ message: "you Are Not Authorized!!!" });
      }

      const OgToken = token.split(" ")[1];
      const Isvalid = jwt.verify(OgToken, process.env.SECRET_KEY);
      //console.log(Isvalid);
      if (!role.includes(Isvalid.role)) {
        return res.status(403).json({ message: "you Are Not Authorized!!!" });
      }
      next();
    } catch (error) {
      return res
        .status(403)
        .json({ message: "You are not authorized!", error: error.message });
    }
  };
};

export default CheckToken;
