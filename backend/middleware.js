import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_KEY;

const extractToken = (req) => {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		return bearerHeader.split(" ")[1];
	} else {
		return null;
	}
};

const verifyToken = (req, res, next) => {
	const token = extractToken(req);
	if (!token) {
		return res.status(401).json({ message: "Authorization token required" });
	}

	jwt.verify(token, jwtSecret, (err, decoded) => {
		if (err) {
			console.error(err);
			return res.status(403).json({ message: "Invalid token" });
		}
		req.user = decoded.user;
		next();
	});
};

const isSeller = (req, res, next) => {
	const token = extractToken(req);
	if (!token) {
		return res.status(401).json({ message: "Authorization token required" });
	}
	jwt.verify(token, jwtSecret, (err, authData) => {
		if (err) {
			console.error(err);
			res.status(401).json({ message: "Authorization failed" });
		} else {
			const isUserSeller = authData.isSeller;
			if (isUserSeller) {
				next();
			} else {
				res
					.status(403)
					.json({ message: "Access Denied: Seller permissions required" });
			}
		}
	});
};

export { verifyToken, isSeller };
