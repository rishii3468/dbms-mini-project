
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

const refreshAccessToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      return res.status(401).json({ message: "No refresh token in cookies" });
    }

    const refreshToken = cookies.refreshToken;

   
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid or expired refresh token" });

      try {
       
        const user = await UserModel.findByRefreshToken(refreshToken);
        if (!user) {
          return res.status(403).json({ message: "Refresh token not recognized" });
        }

  
        const newAccessToken = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        res.status(200).json({ accessToken: newAccessToken });
      } catch (dbErr) {
        console.error("DB Error verifying refresh token:", dbErr);
        res.status(500).json({ message: "Database error verifying refresh token" });
      }
    });
  } catch (err) {
    console.error("Error in refreshAccessToken:", err);
    res.status(500).json({ message: "Server error refreshing access token" });
  }
};

export default refreshAccessToken;
