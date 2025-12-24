import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "No authorized token, access denied" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            // 🔥 SINGLE FIX
            req.body = { ...req.body, userId: tokenDecode.id };
        } else {
            return res.json({ success: false, message: "Not authorized. Login Again" });
        }

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;
