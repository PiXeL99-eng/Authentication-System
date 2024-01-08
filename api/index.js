if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const app = express();
app.use(express.json());

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const port = 8800 || process.env.PORT;

app.post("/signup", (req, res) => {

    const {username, password, name} = req.body

    bcrypt.hash(password, 10).then((hashed) => {

        Users.create({
            name: name,
            username: username,
            password: hashed
        }).then(() => {
            res.status(200).json("User registered!")
        }).catch((error) => {
            res.status(500).json({error: error})
        })
    })
})

app.post("/login", async (req, res) => {

    const {username, password} = req.body

    const user = await Users.findOne({ where: {username: username}})

    if (! user) return res.status(404).json({error: "User Does Not Exist"})

    const isValid = await bcrypt.compare(password, user.password)

    if (! isValid) return res.status(404).json({error: "Wrong password"})

    // To generate secret key
    // type "node" in a new terminal
    // type "require('crypto').randomBytes(64).toString('hex')"" in the terminal

    const accessToken = jwt.sign({username: user.username, name: user.name}, process.env.SECRET_KEY)  // (payload, secret_key)

    res.status(200).json({accessToken: accessToken})
})

app.post("/profile", authenticateToken, (req, res) => {

    res.status(200).json({username: req.user.username, name: req.user.name})
})


// this is a middleware function for /profile 
function authenticateToken (req, res, next) {

    const authHeader = req.headers["authorization"]     // Bearer 'accessToken'
    const accessToken = authHeader && authHeader.split(' ')[1]

    if (! accessToken) return res.status(401).json({error: "Missing JWT"})

    // (accessToken, secret_key, callback)
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {

        if (err) return res.status(403).json({error: "Invalid JWT"})

        req.user = user
        next()
    })

}

app.listen(port, () => {
    console.log(`API is running at ${port}!`);
});