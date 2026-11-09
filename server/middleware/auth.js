import { verifyJWT } from "../JWT/token.js"

export const verifyUser = (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Sign-In required!"
            })
        }

        const token = authorization.split(" ")[1]
        const decodedUser = verifyJWT(token)

        const userId = decodedUser?.id || decodedUser?.userId || decodedUser?._id

        if (!decodedUser || !userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token!"
            })
        }

        req.userID = userId
        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed!"
        })
    }
}