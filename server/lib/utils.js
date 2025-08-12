import jwt from 'jsonwebtoken';

//function to generate a JWT token
export const generateToken = (user) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET);
    return token;
}