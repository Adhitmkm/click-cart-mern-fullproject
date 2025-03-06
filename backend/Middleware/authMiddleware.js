import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
    console.log("I am middleware");

    try {
        const authHeader = req.headers.authorization;
        console.log("Auth Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            console.log("Authorization failed");
            return res.status(401).json({ error: "No token found, authorization failed" });
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token:", token);

        if (!token) {
            return res.status(401).json({ error: "Token missing in request" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        if (!decoded || !decoded.id || !decoded.role) {
            return res.status(401).json({ error: "Invalid token payload" });
        }

        if (decoded.role !== "user") {
            return res.status(403).json({ error: "Access denied. Users only." });
        }

        //Attach userId and role to request object
        req.userId = decoded.id;
        req.role = decoded.role;

        next();
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(401).json({ error: "Token is invalid or expired" });
    }
};

export default authMiddleware;






// frontend vayi verunna datas ividey check cheythitt aan databasilk pokullu
// front end end verunna data handle cheyyan main aayitt use cheyuvan

// import jwt,{ decode } from "jsonwebtoken"
// import dotenv from "dotenv";

// dotenv.config();


// const authMiddleware = (req,res,next)=>{
//     console.log("i am midleware")
//     try {
//         const authHeader = req.headers.authorization;
//         console.log(authHeader,"header auth")

//         if(!authHeader){
//             console.log("authorization failed");
//             return res.status(401).json({ error: "no token fount , authorization failed" });
//         }

//         const token = authHeader.split(" ")[1];

//         if(!token){
//             console.log("authorization failed");
//             return res.status(401).json({ error: "no token fount , authorization failed" });            
//         }

//         // Verify the token
//         const decode = jwt.decode(token);
//         console.log("Decoded Token:", decode);

//         if (!decode || !decode.id || !decode.role) {
//             return res.status(401).json({ error: "Invalid token payload" });
//         }

//         // Check if the role is "admin"
//         if (decode.role !== "user") {
//             return res.status(403).json({ error: "Access denied. Users only." });
//         }

//         // Attach userId to request object
//         req.userId = decode.id; 
//         req.role = decode.role;


//     // console.log("hiiiiiiiii")
//     // const decode = jwt.decode(token);
//     // console.log(decode,"11111111111111111")
//     // req.userId = decode.id;
//     next()


//     }catch(err){
//         console.log("Token is invalid")
//         res.status(401).json({err:"Token is invalid"})
//     }

// }

// export default authMiddleware;