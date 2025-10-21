import { Request, Response, NextFunction } from "express";

export const TokenValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('[AuthMiddleware] Checking token...');
    const authHeader = req.header("Authorization");

    // Verifica si el token existe
    if (!authHeader) {
        console.log('[AuthMiddleware] Not header Authorization.');
        return res.status(401).json({ message: 'Not header Authorization' });
    }

    const [type, apiToken] = authHeader.split(' ');
    if (type !== 'Basic' || !apiToken) {
        console.log('[AuthMiddleware] Invalid token format: ' + authHeader);
        return res.status(400).json({ message: 'Invalid token format' });
    }

    if (apiToken !== process.env.API_TOKEN) {
        console.log('[AuthMiddleware] Invalid Token api : ' + apiToken + " | " + process.env.API_TOKEN);
        return res.status(403).json({ message: "Invalid Token" });
    }

    console.log('[AuthMiddleware] validation successfully.');

    // Si es correcto, pasa al siguiente middleware o controlador
    next();
};
