import jwt from "jsonwebtoken";


export const generatetoken=(userID,res)=>{
    const payload = { userID, role };
    const token=jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        expiresIn:'3d',
    });

res.cookie("jwt",token,{
    maxAge:15*24*60*60*1000, //ms(milliseconds)
    httponly:true, //XSS attack prevention
    samesite:"strict",  //CORS forgery attack
    secure: process.env.NODE_ENV !== "development",
})
    return token
}

export const verifyToken = (req,res) => {
    const token = req.cookies.jwt; 
    if (!token) {
        return res.status(401).json({ message: "No token provided. Unauthorized." });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decoded
        
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};



