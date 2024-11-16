import jwt from 'jsonwebtoken';

const authenticateJWT = (req: any, res: any, next: any) => {

    // the secret key to sign and verify tokens
    const jwt_secret = process.env.JWT_SECRET;

    // extracting the input token from the request header and return error if missing
    // the token is as -> Authorization: Bearer <token>
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
        // return 401: Unauthorized  
    return res.status(401).json({ success: false, message: 'Authentication token missing in the request.' });
    }

    // verifying the key if valid or not using the jwt
    jwt.verify(token, jwt_secret!,(err: any, decoded: any) =>{
        if (err) {
            return res.status(401).json({ message: 'Unauthorized to Access' })
        }
        // decode the payload of the JWT after verifying the token's signature
        req.user = { userID: decoded?.userID }
        next();
    });
    
};

// exporting the middleware function
export default authenticateJWT;
