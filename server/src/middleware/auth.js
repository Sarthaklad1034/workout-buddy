// middleware/auth.js
import jwt from 'jsonwebtoken';

export const auth = async(req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Token verification failed' });
        }

        // Add user info to request
        req.user = {
            userId: decoded.userId
        };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid authentication token' });
    }
};