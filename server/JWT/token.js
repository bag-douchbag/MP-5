
import jwt from "jsonwebtoken"

export const generateToken = (payload) => {

    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "7d"
    })
}

export const verifyJWT = (token) => {

    try {

        const data = jwt.verify(token, process.env.SECRET_KEY)

        return data

    } catch (error) {

        return false
    }
}

export const decodeJWT = (token) => {

    return jwt.decode(token)
}
