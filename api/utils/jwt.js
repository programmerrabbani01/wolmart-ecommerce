import jwt from "jsonwebtoken";

// json web token

export const jwtToken = (data, time = "1d") => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: time,
  });
  return token;
};
