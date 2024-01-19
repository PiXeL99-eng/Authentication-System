if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const app = express();
app.use(express.json());

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("./models")

const cors = require('cors');
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = 8800 || process.env.PORT;

app.post("/signup", (req, res) => {
    
    const {email, password, name} = req.body
    
    bcrypt.hash(password, 10).then((hashed) => {
        
        db.Users.create({
            name: name,
            email: email,
            password: hashed
        }).then(() => {
            res.status(200).json({})
        }).catch((error) => {
            res.status(500).json({error: error})
        })
    })
})

app.post("/login", async (req, res) => {
    
    const {email, password} = req.body
    console.log(req.body)
    
    const user = await db.Users.findOne({ where: {email: email}})
    
    if (! user) return res.status(404).json({error: "User Does Not Exist"})
    
    const isValid = await bcrypt.compare(password, user.password)

    if (! isValid) return res.status(404).json({error: "Wrong password"})

    // To generate secret key
    // type "node" in a new terminal
    // type "require('crypto').randomBytes(64).toString('hex')"" in the terminal
    
    const accessToken = jwt.sign({email: user.email}, process.env.SECRET_KEY)  // (payload, secret_key)
    
    res.status(200).json({accessToken: accessToken})
})

app.get("/profile", authenticateToken, async (req, res) => {

    const user = await db.Users.findOne({ where: {email: req.email}})
    
    if (! user) return res.status(404).json({error: "User Does Not Exist"})
    
    res.status(200).json({email: user.email, name: user.name})
})

// this is the middleware function for /profile 
function authenticateToken (req, res, next) {
    
    const authHeader = req.headers["authorization"]     // Bearer 'accessToken'
    const accessToken = authHeader && authHeader.split(' ')[1]
    
    if (! accessToken) return res.status(401).json({error: "Missing JWT"})
    
    // (accessToken, secret_key, callback)
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        
        if (err) return res.status(403).json({error: "Invalid JWT"})
        
        req.username = user.username
        next()
    })
    
}

app.listen(port, () => {
    console.log(`API is running at ${port}!`);
});