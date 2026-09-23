import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Socket } from "socket.io";


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers?.['authorization'];

        if (!token) {
            return res.status(401).json({ message: "Access token is missing" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

        if (!decodedToken) {
            return res.status(403).json({ message: "Invalid access token" });
        }

        next();
    } catch (error) {
        console.error("Error during token authentication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const authenticateSocketToken = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    const token = socket.handshake.auth?.token;

    // Guest
    if (!token) {
      socket.data.authenticated = false;
      socket.data.userId = `guest:${socket.id}`;

      return next();
    }

    // Authenticated user
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string;
      username: string;
      userEmail: string;
    };

    socket.data.authenticated = true;
    socket.data.userId = decodedToken.userId;
    socket.data.username = decodedToken.username;
    socket.data.userEmail = decodedToken.userEmail;

    console.log(`Socket passed and authenticated: ${socket.data.username} (${socket.data.userId})`);

    return next();

  } catch (error) {
    console.error("Socket authentication failed:", error);

    return next(new Error("Invalid or expired access token"));
  }
};

