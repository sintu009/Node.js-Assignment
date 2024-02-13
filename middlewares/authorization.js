import jwt from "jsonwebtoken"

const authorization = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1]
    if (!token) return res.status(401).json({ status: false, response: 'Access denied 1.' });

    jwt.verify(token, process.env.JWTKEY, (err, user) => {
        if (err) return res.status(403).json({ status: false, response: 'Access denied.' });
        req.body.userId = user.userId
        req.body.phoneNumber = user.phone_number
        next()
    });
}


export default authorization