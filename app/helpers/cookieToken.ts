import { getJwtToken } from "./getJwtToken"

export const sendCookieToken = (user: UserType, res: any) => {
    const token = getJwtToken(user.id)
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        httpOnly: true,
    }
    
    res.status(200).cookie('token', token, options).json({
        success: true,
        token: token,
        user
    })
}  