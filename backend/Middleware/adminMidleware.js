import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminMiddleware = (req, res, next) => {
    console.log("I am middleware");

    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader, "header auth");

        if (!authHeader) {
            console.log("Authorization failed");
            return res.status(401).json({ error: "No token found, authorization failed" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            console.log("Authorization failed");
            return res.status(401).json({ error: "No token found, authorization failed" });
        }

        const decoded = jwt.verify(token, process.env.AD_JWT_SECRET); 
        console.log("Decoded Token:", decoded);

        if (!decoded || !decoded.id || !decoded.role) {
            return res.status(401).json({ error: "Invalid token payload" });
        }

        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Users only." });
        }

        // Attach userId and role to request object ee value aduth pagil kittum ivadnn aan pass akunnath ini admin id vech admintey details kittum 
        // ee admintey token vech admin pagekittum so admin vendath avada cheyya
        // admin id yileykk id vechittund ith vech ellam edukkam
        req.adminId = decoded.id; 
        req.role = decoded.role;

        next();
    } catch (err) {
        console.log("Token is invalid:", err);
        res.status(401).json({ error: "Token is invalid" });
    }
};

export default adminMiddleware;





// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const adminMiddleware = (req, res, next) => {
//     console.log("I am middleware");

//     try {
//         const authHeader = req.headers.authorization;
//         console.log(authHeader, "header auth");

//         if (!authHeader) {
//             console.log("Authorization failed");
//             return res.status(401).json({ error: "No token found, authorization failed" });
//         }

//         const token = authHeader.split(" ")[1];

//         if (!token) {
//             console.log("Authorization failed");
//             return res.status(401).json({ error: "No token found, authorization failed" });
//         }

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use verify instead of decode
//         console.log("Decoded Token:", decoded);

//         if (!decoded || !decoded.id || !decoded.role) {
//             return res.status(401).json({ error: "Invalid token payload" });
//         }

//         // Check if the role is "admin"
//         if (decoded.role !== "admin") {
//             return res.status(403).json({ error: "Access denied. Admins only." });
//         }

//         // Attach userId to request object
//         req.userId = decoded.id; 
//         req.role = decoded.role;

//         next();
//     } catch (err) {
//         console.log("Token is invalid:", err);
//         return res.status(401).json({ error: "Token is invalid" });
//     }
// };

// export default adminMiddleware;



// Used jwt.verify(token, process.env.JWT_SECRET) instead of jwt.decode(token)

// decode() just reads the token but doesn’t verify its validity.
// verify() ensures the token is signed with your secret key and is valid.
// Checked if decoded.role is "admin"

// If role is not "admin", it sends a 403 Forbidden response.
// Attached req.role = decoded.role;

// In case you need to use the role in further middleware or controllers.
// Now, only users with the "admin" role will be allowed to proceed. 