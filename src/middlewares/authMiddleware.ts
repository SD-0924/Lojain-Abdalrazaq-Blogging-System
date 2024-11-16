import jwt from 'jsonwebtoken';

const authenticateJWT = (req: any, res: any, next: any) => {

    // the secret key to sign and verify tokens
    const jwt_secret = String(process.env.JWT_SECRET);

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
        // decode the token and assign the user's information (such as userID name, email) to req.user
        req.user = {
            userID: decoded?.userID,
            userName: decoded?.userName,
            email: decoded?.email
        };

        // check id the input id in the param is the same as the decoded one from the token
        if (req.params.id && req.params.id !== String(req.user.userID)) {
            return res.status(403).json({ message: 'You are not authorized to access this resource.' });
        }

        next();
    });
    
};

// exporting the middleware function
export default authenticateJWT;
