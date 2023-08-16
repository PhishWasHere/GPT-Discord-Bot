import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authToken(req: Request, res: Response, next: NextFunction){
    let token = req.body.token || req.query.token || req.headers.authorization;
    
    if(!token) return res.status(401);

    if (req.headers.authorization) { 
        token = token.split(' ').pop().trim();
    }
    
    try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;        
        req.user = data;
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
}